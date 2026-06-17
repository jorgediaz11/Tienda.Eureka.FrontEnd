import { APP_VERSION } from "../config/appConfig";

export default function Footer() {
  return (
    <footer className="w-full mt-12 footer-shell">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 footer-grid-main">
          <div className="space-y-5">
            <div className="inline-flex items-center px-4 py-2 rounded-2xl footer-badge">
              <img
                src="/src/assets/images/Eureka-logo2.png"
                alt="Eureka"
                style={{ width: "220px", maxWidth: "82vw", height: "auto", display: "block" }}
              />
            </div>
            <div className="space-y-3">
              <h3 className="footer-heading">VISITA NUESTRAS REDES SOCIALES</h3>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.facebook.com/EditorialEurekaPeru" target="_blank" rel="noreferrer" className="footer-link">Facebook</a>
                <a href="https://instagram.com/editorialeurekaperu" target="_blank" rel="noreferrer" className="footer-link">Instagram</a>
                <a href="https://www.linkedin.com/company/editorialeurekaperu/" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
                <a href="https://www.youtube.com/channel/UCK64hBajMPJAbGS-aDkvYDw" target="_blank" rel="noreferrer" className="footer-link">YouTube</a>
              </div>
            </div>
          </div>

          <div className="grid gap-8 footer-grid-links">
            <div className="space-y-4">
              <h3 className="footer-heading">SOBRE NOSOTROS</h3>
              <div className="flex flex-col gap-3">
                <span className="footer-link">Conocenos</span>
                <span className="footer-link">Contactanos</span>
                <span className="footer-link">Como comprar</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="footer-heading">ATENCION AL CLIENTE</h3>
              <div className="flex flex-col gap-3">
                <span className="footer-link">Politicas de Privacidad</span>
                <span className="footer-link">Politicas de Envio</span>
                <span className="footer-link">Libro de Reclamaciones</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 footer-divider">
          <p className="footer-copy">Desarrollado por @Jorge Diaz - 2026 | {APP_VERSION}</p>
        </div>
      </div>
    </footer>
  );
}
