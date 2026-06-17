import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function FormularioLogin() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", fullName: "", phone: "" });
  const [statusMessage, setStatusMessage] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("Iniciando sesion...");
    try {
      await login(form);
      setStatusMessage("Sesion iniciada correctamente.");
    } catch (error) {
      setStatusMessage("No se pudo iniciar sesion.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" style={{ maxWidth: "420px" }}>
      <div>
        <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>Correo</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
      </div>
      <div>
        <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem" }}>Contrasena</label>
        <input id="password" name="password" type="password" required value={form.password} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
      </div>
      <div>
        <label htmlFor="fullName" style={{ display: "block", marginBottom: "0.5rem" }}>Nombre completo (opcional)</label>
        <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
      </div>
      <div>
        <label htmlFor="phone" style={{ display: "block", marginBottom: "0.5rem" }}>Telefono (opcional)</label>
        <input id="phone" name="phone" type="text" value={form.phone} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
      </div>
      <button type="submit" className="add-btn px-6 py-3 rounded-xl">Ingresar</button>
      {statusMessage ? <p style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>{statusMessage}</p> : null}
    </form>
  );
}

function PanelPerfil() {
  const { user, updateProfile, logout } = useAuth();
  const [form, setForm] = useState({ fullName: user.fullName || "", phone: user.phone || "" });
  const [message, setMessage] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSave = async (event) => {
    event.preventDefault();
    try {
      await updateProfile(form);
      setMessage("Perfil actualizado correctamente.");
    } catch (error) {
      setMessage("No se pudo actualizar el perfil.");
      console.error(error);
    }
  };

  const onLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
      setMessage("No se pudo cerrar sesion.");
    }
  };

  return (
    <div className="space-y-5" style={{ maxWidth: "720px" }}>
      <div className="section-contrast p-4 rounded-xl" style={{ border: "1px solid var(--border)" }}>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Nombre:</strong> {user.fullName}</p>
        <p><strong>Telefono:</strong> {user.phone || "No registrado"}</p>
      </div>

      <form onSubmit={onSave} className="space-y-4">
        <div>
          <label htmlFor="profileName" style={{ display: "block", marginBottom: "0.5rem" }}>Nombre completo</label>
          <input id="profileName" name="fullName" type="text" value={form.fullName} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
        </div>
        <div>
          <label htmlFor="profilePhone" style={{ display: "block", marginBottom: "0.5rem" }}>Telefono</label>
          <input id="profilePhone" name="phone" type="text" value={form.phone} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="add-btn px-6 py-3 rounded-xl">Guardar perfil</button>
          <button type="button" onClick={onLogout} className="notify-btn px-6 py-3 rounded-xl">Cerrar sesion</button>
        </div>
      </form>

      {message ? <p style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>{message}</p> : null}

      <section className="section-contrast p-4 rounded-xl" style={{ border: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: "var(--font-weight-bold)", marginBottom: "0.75rem" }}>Acciones de perfil</h2>
        <ul style={{ listStyle: "disc", paddingLeft: "1.3rem" }}>
          <li>Ver historial de pedidos (mock).</li>
          <li>Actualizar datos de facturacion (mock).</li>
          <li>Gestionar preferencias de notificacion (mock).</li>
        </ul>
      </section>
    </div>
  );
}

export default function MiCuentaPagina() {
  const { isAuthenticated } = useAuth();

  return (
    <section>
      <h1 className="section-title mb-6">Mi cuenta</h1>
      <div className="section-contrast p-6 rounded-2xl" style={{ boxShadow: "var(--shadow-base)", color: "var(--text-primary)" }}>
        {isAuthenticated ? <PanelPerfil /> : <FormularioLogin />}
      </div>
    </section>
  );
}
