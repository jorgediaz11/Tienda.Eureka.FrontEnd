import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { catalogBooks } from "../data/products";
import { purchaseGuideTable } from "../data/purchaseGuide";
import { fetchHowToBuyGuideRows } from "../services/guideService";

export default function ComoComprarPagina() {
  const [guideRows, setGuideRows] = useState(purchaseGuideTable);
  const [selectedKey, setSelectedKey] = useState(purchaseGuideTable[0].key);
  const [statusMessage, setStatusMessage] = useState("Cargando tabla de configuracion...");

  useEffect(() => {
    let mounted = true;

    fetchHowToBuyGuideRows()
      .then((rows) => {
        if (!mounted || !Array.isArray(rows) || rows.length === 0) {
          return;
        }

        setGuideRows(rows);
        setSelectedKey(rows[0].key);
        setStatusMessage("Tabla cargada correctamente.");
      })
      .catch((error) => {
        console.error(error);
        setStatusMessage("Se uso tabla local por falta de endpoint disponible.");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const selectedGroup = useMemo(
    () => guideRows.find((group) => group.key === selectedKey) || guideRows[0],
    [guideRows, selectedKey]
  );

  const suggestedProducts = useMemo(() => {
    const ids = new Set(selectedGroup.productIds);
    return catalogBooks.filter((product) => ids.has(product.id));
  }, [selectedGroup]);

  return (
    <section>
      <h1 className="section-title mb-6">Como comprar</h1>
      <div className="section-contrast p-6 rounded-2xl" style={{ boxShadow: "var(--shadow-base)", color: "var(--text-primary)" }}>
        <p>Esta vista es dinamica y se alimenta desde una tabla de reglas por tipo de necesidad.</p>
        <p className="mt-2" style={{ fontSize: "0.95rem", color: "var(--muted-foreground)" }}>{statusMessage}</p>

        <div className="mt-4">
          <label htmlFor="guideSelector" style={{ display: "block", marginBottom: "0.5rem" }}>Ruta de compra</label>
          <select
            id="guideSelector"
            value={selectedKey}
            onChange={(event) => setSelectedKey(event.target.value)}
            className="w-full px-4 py-3 rounded-xl"
            style={{ border: "1px solid var(--border)", maxWidth: "420px" }}
          >
            {guideRows.map((group) => (
              <option key={group.key} value={group.key}>{group.title}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 p-4 rounded-xl" style={{ border: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: "var(--font-weight-bold)", marginBottom: "0.5rem" }}>
            {selectedGroup.title}
          </h2>
          <p>{selectedGroup.description}</p>
          <ol className="mt-3" style={{ paddingLeft: "1.3rem" }}>
            <li>1. Revisa los productos recomendados para esta ruta.</li>
            <li>2. Ajusta cantidades y agregalos al carrito.</li>
            <li>3. Completa datos de entrega en checkout.</li>
            <li>4. Recibe confirmacion y seguimiento de pedido.</li>
          </ol>
        </div>

        <h3 className="section-title mt-8 mb-4" style={{ fontSize: "1.35rem" }}>Productos recomendados</h3>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {suggestedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
