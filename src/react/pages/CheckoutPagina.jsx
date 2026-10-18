import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createCheckout } from "../services/checkoutService";
import { readCheckoutCustomer, saveCheckoutCustomer } from "../services/checkoutCustomerService";
import { resolveCoupon } from "../services/checkoutCouponService";

function formatCurrency(amount) {
  return `S/ ${Number(amount || 0).toFixed(2)}`;
}

function buildInitialCustomer(user) {
  return {
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    documentNumber: "",
    address: "",
    reference: ""
  };
}

const STEPS = [
  { id: 1, label: "Datos" },
  { id: 2, label: "Confirmacion" },
  { id: 3, label: "Exito" }
];

export default function CheckoutPagina() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, subtotal, clearCart } = useCart();
  const { user, token, isAuthenticated } = useAuth();
  const processedPaymentRef = useRef(false);

  const checkoutDraftFromState = location.state?.checkoutDraft;
  const paymentResult = location.state?.paymentResult;
  const persistedCustomer = useMemo(() => readCheckoutCustomer(), []);

  const [currentStep, setCurrentStep] = useState(1);
  const [customer, setCustomer] = useState(() => {
    if (checkoutDraftFromState?.customer) {
      return {
        fullName: checkoutDraftFromState.customer.name || "",
        email: checkoutDraftFromState.customer.email || "",
        phone: checkoutDraftFromState.customer.phone || "",
        documentNumber: checkoutDraftFromState.customer.documentNumber || "",
        address: checkoutDraftFromState.customer.address || "",
        reference: checkoutDraftFromState.customer.reference || ""
      };
    }

    if (persistedCustomer) {
      return persistedCustomer;
    }

    return buildInitialCustomer(user);
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [couponCode, setCouponCode] = useState(() => checkoutDraftFromState?.coupon?.code || "");
  const [appliedCoupon, setAppliedCoupon] = useState(() => checkoutDraftFromState?.coupon || null);

  const effectiveItems = checkoutDraftFromState?.items || items;
  const baseSubtotal = Number(checkoutDraftFromState?.baseAmount ?? subtotal);
  const discountAmount = Number(
    checkoutDraftFromState?.discountAmount ?? (appliedCoupon?.isValid ? appliedCoupon.discountAmount : 0)
  );
  const effectiveSubtotal = Number(
    checkoutDraftFromState?.finalAmount ?? Math.max(0, Number((baseSubtotal - discountAmount).toFixed(2)))
  );

  const totalItems = useMemo(
    () => effectiveItems.reduce((acc, item) => acc + item.quantity, 0),
    [effectiveItems]
  );

  const isCartEmpty = effectiveItems.length === 0;

  useEffect(() => {
    saveCheckoutCustomer(customer);
  }, [customer]);

  useEffect(() => {
    if (!paymentResult || !paymentResult.approved || processedPaymentRef.current) {
      return;
    }

    processedPaymentRef.current = true;
    setIsSubmitting(true);
    setStatusMessage("Confirmando pedido con pago aprobado...");

    const payload = {
      amount: effectiveSubtotal,
      baseAmount: baseSubtotal,
      discountAmount,
      items: effectiveItems,
      customer: {
        name: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        documentNumber: customer.documentNumber,
        address: customer.address,
        reference: customer.reference,
        source: isAuthenticated ? "authenticated" : "guest"
      },
      coupon: appliedCoupon?.isValid
        ? {
          code: appliedCoupon.code,
          type: appliedCoupon.type,
          value: appliedCoupon.value,
          discountAmount: appliedCoupon.discountAmount
        }
        : null,
      payment: {
        gateway: paymentResult.gateway,
        authorizationCode: paymentResult.authorizationCode,
        approved: true
      }
    };

    createCheckout(payload, token)
      .then((response) => {
        clearCart();
        setOrderId(response.orderId || "ORD-PENDIENTE");
        setStatusMessage("Pago registrado correctamente.");
        setCurrentStep(3);
      })
      .catch((error) => {
        console.error(error);
        setStatusMessage("No se pudo completar el pedido despues del pago.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [
    appliedCoupon,
    baseSubtotal,
    clearCart,
    customer.address,
    customer.documentNumber,
    discountAmount,
    customer.email,
    customer.fullName,
    customer.phone,
    customer.reference,
    effectiveItems,
    effectiveSubtotal,
    isAuthenticated,
    paymentResult,
    token
  ]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  };

  const validateCustomer = () => {
    if (!customer.fullName.trim()) {
      return "Ingresa el nombre completo del cliente.";
    }
    if (!customer.email.trim()) {
      return "Ingresa el correo del cliente.";
    }
    if (!customer.phone.trim()) {
      return "Ingresa el telefono del cliente.";
    }
    if (!customer.address.trim()) {
      return "Ingresa la direccion de entrega.";
    }

    return "";
  };

  const handleNextStep = () => {
    const validationMessage = validateCustomer();
    if (validationMessage) {
      setStatusMessage(validationMessage);
      return;
    }

    setStatusMessage("");
    setCurrentStep(2);
  };

  const handlePreviousStep = () => {
    setStatusMessage("");
    setCurrentStep(1);
  };

  const goToIzipay = () => {
    if (isCartEmpty) {
      setStatusMessage("No hay productos en el carrito para procesar el pago.");
      return;
    }

    const resolvedCoupon = resolveCoupon(couponCode, baseSubtotal);
    if (resolvedCoupon && !resolvedCoupon.isValid) {
      setStatusMessage(resolvedCoupon.message);
      return;
    }

    const nextAppliedCoupon = resolvedCoupon?.isValid ? resolvedCoupon : null;
    const nextDiscount = nextAppliedCoupon?.discountAmount || 0;
    const nextFinalAmount = Math.max(0, Number((baseSubtotal - nextDiscount).toFixed(2)));

    setAppliedCoupon(nextAppliedCoupon);
    setStatusMessage(nextAppliedCoupon ? nextAppliedCoupon.message : "");

    navigate("/pago-izipay", {
      state: {
        checkoutDraft: {
          amount: nextFinalAmount,
          baseAmount: baseSubtotal,
          discountAmount: nextDiscount,
          finalAmount: nextFinalAmount,
          items: effectiveItems,
          coupon: nextAppliedCoupon,
          customer: {
            name: customer.fullName,
            email: customer.email,
            phone: customer.phone,
            documentNumber: customer.documentNumber,
            address: customer.address,
            reference: customer.reference
          }
        }
      }
    });
  };

  return (
    <section className="checkout-shell">
      <h1 className="section-title mb-6">Checkout</h1>

      <ol className="checkout-steps" aria-label="Progreso de checkout">
        {STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isDone = step.id < currentStep;
          return (
            <li key={step.id} className="checkout-step-item">
              <span className={`checkout-step-badge ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}`}>{step.id}</span>
              <span className={`checkout-step-label ${isActive ? "is-active" : ""}`}>{step.label}</span>
            </li>
          );
        })}
      </ol>

      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <article className="section-contrast p-6 rounded-2xl checkout-card" style={{ boxShadow: "var(--shadow-base)", color: "var(--text-primary)" }}>
          {currentStep === 1 ? (
            <>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "var(--font-weight-bold)", marginBottom: "0.75rem" }}>
                Datos del cliente
              </h2>

              <p className="mb-4" style={{ fontSize: "0.95rem", color: "var(--muted-foreground)" }}>
                {isAuthenticated
                  ? "Sesion detectada. Se precargaron tus datos referenciales, puedes editarlos antes de pagar."
                  : "No hay sesion activa. Completa tus datos para continuar con el pago."}
              </p>

              <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                <div>
                  <label htmlFor="fullName" style={{ display: "block", marginBottom: "0.5rem" }}>Nombre completo</label>
                  <input id="fullName" name="fullName" type="text" value={customer.fullName} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
                </div>

                <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                  <div>
                    <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>Correo</label>
                    <input id="email" name="email" type="email" value={customer.email} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
                  </div>
                  <div>
                    <label htmlFor="phone" style={{ display: "block", marginBottom: "0.5rem" }}>Telefono</label>
                    <input id="phone" name="phone" type="text" value={customer.phone} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
                  </div>
                </div>

                <div>
                  <label htmlFor="documentNumber" style={{ display: "block", marginBottom: "0.5rem" }}>DNI / Documento</label>
                  <input id="documentNumber" name="documentNumber" type="text" value={customer.documentNumber} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
                </div>

                <div>
                  <label htmlFor="address" style={{ display: "block", marginBottom: "0.5rem" }}>Direccion de entrega</label>
                  <input id="address" name="address" type="text" value={customer.address} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
                </div>

                <div>
                  <label htmlFor="reference" style={{ display: "block", marginBottom: "0.5rem" }}>Referencia (opcional)</label>
                  <textarea id="reference" name="reference" rows="3" value={customer.reference} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button type="button" disabled={isCartEmpty} className="add-btn px-6 py-3 rounded-xl" onClick={handleNextStep}>
                    Ir a confirmacion
                  </button>
                  <Link to="/ver-carrito" className="notify-btn px-6 py-3 rounded-xl">Volver al carrito</Link>
                </div>
              </form>
            </>
          ) : null}

          {currentStep === 2 ? (
            <div className="space-y-4">
              <h2 style={{ fontSize: "1.25rem", fontWeight: "var(--font-weight-bold)", marginBottom: "0.75rem" }}>
                Confirmar datos y continuar a Izipay
              </h2>
              <div className="checkout-confirm-grid">
                <p><strong>Cliente:</strong> {customer.fullName}</p>
                <p><strong>Correo:</strong> {customer.email}</p>
                <p><strong>Teléfono:</strong> {customer.phone}</p>
                <p><strong>Documento:</strong> {customer.documentNumber || "No registrado"}</p>
                <p><strong>Dirección:</strong> {customer.address}</p>
                <p><strong>Referencia:</strong> {customer.reference || "Sin referencia"}</p>
              </div>
              <div className="checkout-confirm-grid">
                <p><strong>Ingrese Cupón:</strong> </p>
                <input
                  id="coupon"
                  name="coupon"
                  type="text"
                  value={couponCode}
                  onChange={(event) => setCouponCode(event.target.value)}
                  placeholder="EUREKA10 o LECTOR5"
                  className="w-full px-4 py-3 rounded-xl"
                  style={{ border: "1px solid var(--border)" }}
                />
              </div>
              {appliedCoupon?.isValid ? (
                <p style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>
                  {appliedCoupon.message}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <button type="button" className="notify-btn px-6 py-3 rounded-xl" onClick={handlePreviousStep}>
                  Editar datos
                </button>
                <button type="button" disabled={isSubmitting || isCartEmpty} className="add-btn px-6 py-3 rounded-xl" onClick={goToIzipay}>
                  Ir a pagar con Izipay
                </button>
              </div>
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="checkout-success">
              <h2 style={{ fontSize: "1.35rem", fontWeight: "var(--font-weight-bold)" }}>Pago exitoso</h2>
              <p>Tu pedido fue registrado correctamente.</p>
              <p><strong>Codigo de orden:</strong> {orderId}</p>
              <div className="flex flex-wrap gap-3" style={{ marginTop: "1rem" }}>
                <Link to="/catalogo" className="add-btn px-6 py-3 rounded-xl">Seguir comprando</Link>
                <button type="button" className="notify-btn px-6 py-3 rounded-xl" onClick={() => navigate("/")}>Ir al inicio</button>
              </div>
            </div>
          ) : null}

          {statusMessage ? <p className="mt-4" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>{statusMessage}</p> : null}
        </article>

        <article className="section-contrast p-6 rounded-2xl checkout-card" style={{ boxShadow: "var(--shadow-base)", color: "var(--text-primary)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "var(--font-weight-bold)", marginBottom: "0.75rem" }}>
            Resumen de compra
          </h2>

          {isCartEmpty ? (
            <p>Tu carrito esta vacio.</p>
          ) : (
            <>
              <p style={{ marginBottom: "0.75rem" }}>Items: <strong>{totalItems}</strong></p>
              <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid var(--border)", borderRadius: "12px", padding: "12px" }}>
                {effectiveItems.map((item) => (
                  <div key={item.id} style={{ borderBottom: "1px solid var(--border)", padding: "8px 0" }}>
                    <p style={{ fontWeight: "var(--font-weight-medium)" }}>{item.title}</p>
                    <p style={{ fontSize: "0.92rem" }}>Cantidad: {item.quantity}</p>
                    <p style={{ fontSize: "0.92rem" }}>Subtotal: {formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: "1rem" }}>
                Subtotal: <strong>{formatCurrency(baseSubtotal)}</strong>
              </p>
              <p>
                Descuento: <strong>-{formatCurrency(discountAmount)}</strong>
              </p>
              <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
                Total a pagar: <strong>{formatCurrency(effectiveSubtotal)}</strong>
              </p>
            </>
          )}
        </article>
      </div>
    </section>
  );
}
