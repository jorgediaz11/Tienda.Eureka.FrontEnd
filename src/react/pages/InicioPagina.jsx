import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { featuredBooks } from "../data/products";

export default function InicioPagina() {
  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)",
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          marginBottom: "2rem"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "var(--font-weight-bold)" }}>
                Todo lo que necesitas
                <br />
                para el ano escolar
              </h1>
              <p className="opacity-90" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
                Libros, plataformas digitales y materiales educativos con entrega directa a tu colegio.
              </p>
              <Link to="/catalogo" className="px-8 py-4 rounded-xl inline-flex items-center gap-2 hero-cta">
                Explorar catalogo
              </Link>
            </div>
            <div className="relative">
              <div className="relative z-10 hero-media">
                <img
                  loading="eager"
                  decoding="async"
                  width="1200"
                  height="900"
                  src="/src/assets/images/libro-0014.jpg"
                  alt="Estudiante con materiales de estudio"
                  className="w-full h-auto object-contain hero-media-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-4 section-contrast rounded-2xl" style={{ marginBottom: "1.5rem" }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="mb-8 section-title">Plan lector - Colecciones destacadas</h2>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {featuredBooks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
