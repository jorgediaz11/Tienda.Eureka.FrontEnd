import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function formatCurrency(amount) {
  return `S/ ${amount.toFixed(2)}`;
}

export default function VerCarritoPagina() {
  const { items, itemCount, subtotal, removeItem } = useCart();

  const isCartEmpty = items.length === 0;

  return (
    <section>
      <h1 className="section-title mb-6">Ver carrito</h1>

      <h2 style={{ fontSize: "1.25rem", fontWeight: "var(--font-weight-bold)", marginBottom: "0.75rem" }}>
        Datos del cliente
      </h2>
      <div className="checkout-confirm-grid">
        <p><strong>Cliente:</strong> </p>
        <p><strong>Correo:</strong> </p>
        <p><strong>Telefono:</strong> </p>
        <p><strong>Documento:</strong> </p>
      </div>

      <div className="section-contrast p-6 rounded-2xl" style={{ boxShadow: "var(--shadow-base)", color: "var(--text-primary)" }}>
        {items.length === 0 ? (
          <p>Tu carrito esta vacio. Agrega productos desde el catalogo o inicio.</p>
        ) : null}

        <div className="mt-4 p-4 rounded-xl" style={{ border: "1px solid var(--border)", overflowX: "auto" }}>
          <p>Productos agregados: <strong>{itemCount}</strong></p>
          <table className="w-full mt-3" style={{ minWidth: "640px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>Codigo</th>
                <th style={{ textAlign: "left", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>Descripcion</th>
                <th style={{ textAlign: "center", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>Cantidad</th>
                <th style={{ textAlign: "right", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>Precio</th>
                <th style={{ textAlign: "right", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>Subtotal</th>
                <th style={{ textAlign: "center", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>Accion</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>{index + 1}</td>
                  <td style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>{item.title}</td>
                  <td style={{ padding: "10px 0", borderBottom: "1px solid var(--border)", textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ padding: "10px 0", borderBottom: "1px solid var(--border)", textAlign: "right" }}>{formatCurrency(item.price)}</td>
                  <td style={{ padding: "10px 0", borderBottom: "1px solid var(--border)", textAlign: "right" }}>{formatCurrency(item.price * item.quantity)}</td>
                  <td style={{ padding: "10px 0", borderBottom: "1px solid var(--border)", textAlign: "center" }}>
                    <button type="button" className="cart-remove-btn" onClick={() => removeItem(item.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" style={{ padding: "10px 0", borderTop: "1px solid var(--border)" }}></td>
                <td style={{ padding: "10px 0", borderTop: "1px solid var(--border)", textAlign: "right" }}>
                  Subtotal: <strong>{formatCurrency(subtotal)}</strong>
                </td>
                <td style={{ padding: "10px 0", borderTop: "1px solid var(--border)" }}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/catalogo" className="add-btn px-6 py-3 rounded-xl">Continuar con la compra</Link>
          <Link to="/checkout" id="cart-pay-btn" className="notify-btn px-6 py-3 rounded-xl" aria-disabled={isCartEmpty} style={isCartEmpty ? { opacity: 0.5, pointerEvents: "none" } : undefined}>
            Pagar ahora
          </Link>
        </div>
        {isCartEmpty ? <p className="mt-4" style={{ color: "var(--muted-foreground)" }}>Agrega productos para habilitar el checkout.</p> : null}
      </div>
    </section>
  );
}
