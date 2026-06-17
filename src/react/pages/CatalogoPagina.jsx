import ProductCard from "../components/ProductCard";
import { catalogBooks } from "../data/products";

export default function CatalogoPagina() {
  return (
    <section>
      <h1 className="section-title mb-6">Catalogo</h1>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {catalogBooks.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
