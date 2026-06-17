import { useState } from "react";
import { useCart } from "../context/CartContext";

function formatCurrency(amount) {
  return `S/ ${amount.toFixed(2)}`;
}

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <article className="section-contrast p-4 rounded-2xl" style={{ boxShadow: "var(--shadow-base)" }}>
      <img
        loading="lazy"
        decoding="async"
        width="600"
        height="800"
        src={product.image}
        alt={product.title}
        className="w-full object-contain mb-3 product-image-fixed"
      />
      <h3 className="product-title">{product.title}</h3>
      <p className="price-value">{formatCurrency(product.price)}</p>

      <div className="flex items-center gap-2 mt-3">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg qty-control">
          <button type="button" className="qty-btn" onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}>-</button>
          <span className="qty-value">{quantity}</span>
          <button type="button" className="qty-btn" onClick={() => setQuantity((qty) => qty + 1)}>+</button>
        </div>
        <button
          type="button"
          className="flex-1 py-2.5 px-4 rounded-lg add-btn"
          onClick={() => addItem(product, quantity)}
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
