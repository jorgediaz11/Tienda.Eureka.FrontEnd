import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { simulateIzipayPayment } from "../services/checkoutService";

function maskCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatCurrency(amount) {
  return `S/ ${Number(amount || 0).toFixed(2)}`;
}

function validateCard(form) {
  const cardDigits = form.cardNumber.replace(/\D/g, "");
  if (cardDigits.length < 13 || cardDigits.length > 16) {
    return "Ingresa un numero de tarjeta valido.";
  }
  if (!form.cardHolder.trim()) {
    return "Ingresa el titular de la tarjeta.";
  }
  if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
    return "Ingresa una fecha de expiracion valida (MM/AA).";
  }
  if (!/^\d{3,4}$/.test(form.cvv)) {
    return "Ingresa un CVV valido.";
  }

  return "";
}

export default function PagoIzipaySimuladoPagina() {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutDraft = location.state?.checkoutDraft;

  const [form, setForm] = useState({
    cardNumber: "",
    cardHolder: checkoutDraft?.customer?.name || "",
    expiry: "",
    cvv: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const draftTotal = useMemo(() => Number(checkoutDraft?.amount || 0), [checkoutDraft]);

  if (!checkoutDraft) {
    return <Navigate to="/checkout" replace />;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "cardNumber") {
      setForm((current) => ({ ...current, [name]: maskCardNumber(value) }));
      return;
    }

    if (name === "cvv") {
      setForm((current) => ({ ...current, [name]: value.replace(/\D/g, "").slice(0, 4) }));
      return;
    }

    if (name === "expiry") {
      const clean = value.replace(/\D/g, "").slice(0, 4);
      const withSlash = clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
      setForm((current) => ({ ...current, [name]: withSlash }));
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validateCard(form);
    if (validationMessage) {
      setStatusMessage(validationMessage);
      return;
    }

    setIsProcessing(true);
    setStatusMessage("Conectando con Izipay...");

    try {
      const result = await simulateIzipayPayment({
        amount: checkoutDraft.amount,
        cardNumber: form.cardNumber,
        cardHolder: form.cardHolder,
        expiry: form.expiry,
        cvv: form.cvv
      });

      if (!result.approved) {
        setStatusMessage("Pago rechazado por la pasarela simulada. Intenta con otra tarjeta.");
        return;
      }

      navigate("/checkout", {
        replace: true,
        state: {
          checkoutDraft,
          paymentResult: result
        }
      });
    } catch (error) {
      console.error(error);
      setStatusMessage("No se pudo completar la simulacion de pago.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section>
      <h1 className="section-title mb-6">Pasarela Izipay (Simulada)</h1>

      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <article className="section-contrast p-6 rounded-2xl checkout-card" style={{ boxShadow: "var(--shadow-base)", color: "var(--text-primary)" }}>
          <p className="mb-4" style={{ fontSize: "0.95rem", color: "var(--muted-foreground)" }}>
            Esta pantalla simula la pasarela externa de Izipay para pruebas del flujo de pago.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="cardNumber" style={{ display: "block", marginBottom: "0.5rem" }}>Numero de tarjeta</label>
              <input id="cardNumber" name="cardNumber" type="text" inputMode="numeric" placeholder="4111 1111 1111 1111" value={form.cardNumber} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
            </div>

            <div>
              <label htmlFor="cardHolder" style={{ display: "block", marginBottom: "0.5rem" }}>Titular</label>
              <input id="cardHolder" name="cardHolder" type="text" value={form.cardHolder} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
            </div>

            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
              <div>
                <label htmlFor="expiry" style={{ display: "block", marginBottom: "0.5rem" }}>Expiracion</label>
                <input id="expiry" name="expiry" type="text" inputMode="numeric" placeholder="MM/AA" value={form.expiry} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
              </div>
              <div>
                <label htmlFor="cvv" style={{ display: "block", marginBottom: "0.5rem" }}>CVV</label>
                <input id="cvv" name="cvv" type="password" inputMode="numeric" placeholder="123" value={form.cvv} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={isProcessing} className="add-btn px-6 py-3 rounded-xl">
                {isProcessing ? "Procesando..." : "Pagar ahora"}
              </button>
              <Link to="/checkout" state={{ checkoutDraft }} className="notify-btn px-6 py-3 rounded-xl">Cancelar</Link>
            </div>
          </form>

          {statusMessage ? <p className="mt-4" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>{statusMessage}</p> : null}
        </article>

        <article className="section-contrast p-6 rounded-2xl checkout-card" style={{ boxShadow: "var(--shadow-base)", color: "var(--text-primary)" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "var(--font-weight-bold)", marginBottom: "0.75rem" }}>Resumen enviado a pasarela</h2>
          <p>Cliente: <strong>{checkoutDraft.customer.name}</strong></p>
          <p>Correo: <strong>{checkoutDraft.customer.email}</strong></p>
          <p>Items: <strong>{checkoutDraft.items.length}</strong></p>
          <p style={{ marginTop: "0.75rem", fontSize: "1.05rem" }}>Total: <strong>{formatCurrency(draftTotal)}</strong></p>

          <div className="checkout-success" style={{ marginTop: "1rem" }}>
            <p style={{ margin: 0 }}><strong>Tip de simulacion</strong></p>
            <p style={{ margin: 0, fontSize: "0.92rem" }}>
              Usa una tarjeta cualquiera de 16 digitos para aprobar. Si termina en 0000, se simula rechazo.
            </p>
          </div>

          <button type="button" className="notify-btn px-6 py-3 rounded-xl" style={{ marginTop: "1rem" }} onClick={() => navigate("/checkout", { state: { checkoutDraft } })}>
            Volver al checkout
          </button>
        </article>
      </div>
    </section>
  );
}
