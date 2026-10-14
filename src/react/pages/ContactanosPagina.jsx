import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CONTACT_EMAIL } from "../config/appConfig";
import { sendContactEmail } from "../services/contactService";

export default function ContactanosPagina() {
  const { user, token } = useAuth();

  const initialForm = useMemo(
    () => ({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      subject: "Consulta general",
      message: ""
    }),
    [user]
  );

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(false);
    setStatusMessage("Enviando mensaje...");

    const payload = {
      to: CONTACT_EMAIL,
      from: form.email,
      subject: `[Web] ${form.subject}`,
      body: `Nombre: ${form.fullName}\nTelefono: ${form.phone}\n\n${form.message}`
    };

    try {
      await sendContactEmail(payload, token);
      setSubmitted(true);
      setStatusMessage("Mensaje enviado correctamente. Te responderemos pronto.");
    } catch (error) {
      setStatusMessage("No se pudo enviar el mensaje. Reintenta en unos minutos.");
      console.error(error);
    }
  };

  return (
    <section>
      <h1 className="section-title mb-6">Contáctanos</h1>
      <div className="section-contrast p-6 rounded-2xl" style={{ boxShadow: "var(--shadow-base)", color: "var(--text-primary)" }}>
        <p className="mb-4">
          {user
            ? "Detectamos tu sesión activa. Tus datos de contacto fueron precargados."
            : "Completa el formulario para enviarnos tu consulta por correo."}
        </p>

        <form onSubmit={onSubmit} className="space-y-4" style={{ maxWidth: "680px" }}>
          <div>
            <label htmlFor="fullName" style={{ display: "block", marginBottom: "0.5rem" }}>Nombre completo</label>
            <input id="fullName" name="fullName" type="text" required value={form.fullName} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div>
              <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>Correo</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
            </div>
            <div>
              <label htmlFor="phone" style={{ display: "block", marginBottom: "0.5rem" }}>Telefono</label>
              <input id="phone" name="phone" type="text" value={form.phone} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
            </div>
          </div>

          <div>
            <label htmlFor="subject" style={{ display: "block", marginBottom: "0.5rem" }}>Asunto</label>
            <select id="subject" name="subject" value={form.subject} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }}>
              <option>Consulta general</option>
              <option>Seguimiento de pedido</option>
              <option>Soporte de plataforma</option>
              <option>Cambios y devoluciones</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" style={{ display: "block", marginBottom: "0.5rem" }}>Mensaje</label>
            <textarea id="message" name="message" required rows="5" value={form.message} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
          </div>

          <button type="submit" className="add-btn px-6 py-3 rounded-xl">Enviar mensaje</button>
        </form>

        {statusMessage ? <p className="mt-4" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>{statusMessage}</p> : null}
        {submitted ? <p className="mt-2">Operacion registrada en la capa de servicio de contacto.</p> : null}
      </div>
    </section>
  );
}
