import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createSupportTicket, fetchSupportTopics } from "../services/supportService";

export default function ServicioAlClientePagina() {
  const { user, token } = useAuth();
  const [topics, setTopics] = useState([]);
  const [statusMessage, setStatusMessage] = useState("Cargando opciones de soporte...");
  const [form, setForm] = useState({ topicId: "", detail: "" });

  useEffect(() => {
    let mounted = true;

    fetchSupportTopics()
      .then((rows) => {
        if (!mounted || !Array.isArray(rows) || rows.length === 0) {
          return;
        }

        setTopics(rows);
        setForm((current) => ({ ...current, topicId: rows[0].id }));
        setStatusMessage("Canales de soporte cargados.");
      })
      .catch((error) => {
        console.error(error);
        setStatusMessage("No se pudieron cargar canales de soporte.");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const selectedTopic = topics.find((topic) => topic.id === form.topicId);
      const payload = {
        topicId: form.topicId,
        topicTitle: selectedTopic?.title || "",
        detail: form.detail,
        customer: {
          email: user?.email || "invitado@no-auth.local",
          name: user?.fullName || "Invitado"
        }
      };

      const response = await createSupportTicket(payload, token);
      setStatusMessage(`Ticket creado correctamente: ${response.ticketId}`);
      setForm((current) => ({ ...current, detail: "" }));
    } catch (error) {
      console.error(error);
      setStatusMessage("No se pudo crear el ticket en este momento.");
    }
  };

  return (
    <section>
      <h1 className="section-title mb-6">Servicio al cliente</h1>
      <div className="section-contrast p-6 rounded-2xl" style={{ boxShadow: "var(--shadow-base)", color: "var(--text-primary)" }}>
        <p>
          Esta vista es dinamica y permite registrar tickets de soporte.
          {user ? " Detectamos sesion activa y tomaremos tus datos del perfil." : " Puedes continuar como invitado."}
        </p>
        <p className="mt-2" style={{ fontSize: "0.95rem", color: "var(--muted-foreground)" }}>{statusMessage}</p>

        <div className="mt-5 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {topics.map((topic) => (
            <article key={topic.id} className="p-4 rounded-xl section-contrast" style={{ border: "1px solid var(--border)" }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: "var(--font-weight-bold)" }}>{topic.title}</h2>
              <p className="mt-1">{topic.description}</p>
              <p className="mt-2" style={{ fontSize: "0.9rem", color: "var(--muted-foreground)" }}>Canal: {topic.channel}</p>
            </article>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4 mt-6" style={{ maxWidth: "720px" }}>
          <div>
            <label htmlFor="topicId" style={{ display: "block", marginBottom: "0.5rem" }}>Tipo de solicitud</label>
            <select id="topicId" name="topicId" value={form.topicId} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }}>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>{topic.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="detail" style={{ display: "block", marginBottom: "0.5rem" }}>Detalle del caso</label>
            <textarea id="detail" name="detail" rows="5" required value={form.detail} onChange={onChange} className="w-full px-4 py-3 rounded-xl" style={{ border: "1px solid var(--border)" }} />
          </div>

          <button type="submit" className="add-btn px-6 py-3 rounded-xl">Crear ticket</button>
        </form>
      </div>
    </section>
  );
}
