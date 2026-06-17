import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import InicioPagina from "./pages/InicioPagina";
import CatalogoPagina from "./pages/CatalogoPagina";
import VerCarritoPagina from "./pages/VerCarritoPagina";
import ContactanosPagina from "./pages/ContactanosPagina";
import MiCuentaPagina from "./pages/MiCuentaPagina";
import ComoComprarPagina from "./pages/ComoComprarPagina";
import ServicioAlClientePagina from "./pages/ServicioAlClientePagina";
import CheckoutPagina from "./pages/CheckoutPagina";
import PagoIzipaySimuladoPagina from "./pages/PagoIzipaySimuladoPagina";

function LegacyRedirect({ to }) {
  return <Navigate to={to} replace />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<InicioPagina />} />
        <Route path="/catalogo" element={<CatalogoPagina />} />
        <Route path="/como-comprar" element={<ComoComprarPagina />} />
        <Route path="/contactanos" element={<ContactanosPagina />} />
        <Route path="/servicio-al-cliente" element={<ServicioAlClientePagina />} />
        <Route path="/mi-cuenta" element={<MiCuentaPagina />} />
        <Route path="/ver-carrito" element={<VerCarritoPagina />} />
        <Route path="/checkout" element={<CheckoutPagina />} />
        <Route path="/pago-izipay" element={<PagoIzipaySimuladoPagina />} />

        <Route path="/index.html" element={<LegacyRedirect to="/" />} />
        <Route path="/catalogo.html" element={<LegacyRedirect to="/catalogo" />} />
        <Route path="/como-comprar.html" element={<LegacyRedirect to="/como-comprar" />} />
        <Route path="/contactanos.html" element={<LegacyRedirect to="/contactanos" />} />
        <Route path="/servicio-al-cliente.html" element={<LegacyRedirect to="/servicio-al-cliente" />} />
        <Route path="/mi-cuenta.html" element={<LegacyRedirect to="/mi-cuenta" />} />
        <Route path="/ver-carrito.html" element={<LegacyRedirect to="/ver-carrito" />} />
        <Route path="/checkout.html" element={<LegacyRedirect to="/checkout" />} />
        <Route path="/pago-izipay.html" element={<LegacyRedirect to="/pago-izipay" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
