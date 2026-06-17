import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catalogo" },
  { to: "/como-comprar", label: "Como comprar" },
  { to: "/contactanos", label: "Contactanos" },
  { to: "/servicio-al-cliente", label: "Servicio al cliente" },
  { to: "/mi-cuenta", label: "Mi cuenta" }
];

export default function Header() {
  const { itemCount } = useCart();
  const { user } = useAuth();

  return (
    <header className="w-full px-6 py-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.92)", boxShadow: "var(--shadow-base)" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap">
        <Link to="/" className="inline-flex items-center">
          <img src="/src/assets/images/Eureka-logoH.png" alt="Eureka" style={{ width: "150px", height: "auto", display: "block" }} />
        </Link>

        <nav className="flex flex-wrap items-center gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="nav-button"
              style={({ isActive }) => ({ opacity: isActive ? 1 : 0.8 })}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/ver-carrito" className="nav-button">
            Ver carrito ({itemCount})
          </NavLink>
          {user ? <span className="nav-button">Hola, {user.fullName}</span> : null}
        </nav>
      </div>
    </header>
  );
}
