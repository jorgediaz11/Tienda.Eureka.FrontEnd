import { API_CONFIG, ENDPOINTS } from "../api/endpoints";
import { request } from "../api/httpClient";

const defaultSupportItems = [
  {
    id: "order-status",
    title: "Estado de pedido",
    description: "Consulta el estado y fecha estimada de entrega.",
    channel: "Pedidos"
  },
  {
    id: "returns",
    title: "Cambios y devoluciones",
    description: "Revisa política y crea una solicitud de cambio.",
    channel: "Postventa"
  },
  {
    id: "billing",
    title: "Facturación y comprobantes",
    description: "Actualiza datos de factura y descarga comprobantes.",
    channel: "Finanzas"
  },
  {
    id: "platform-support",
    title: "Soporte para acceso a plataformas",
    description: "Recupera claves y activa licencias educativas.",
    channel: "Soporte técnico"
  }
];

export async function fetchSupportTopics() {
  if (API_CONFIG.useMock) {
    return defaultSupportItems;
  }

  return request({
    baseUrl: API_CONFIG.baseUrl,
    path: ENDPOINTS.support.topics,
    method: "GET"
  });
}

export async function createSupportTicket(payload, token) {
  if (API_CONFIG.useMock) {
    return {
      ticketId: `TCK-${Date.now()}`,
      status: "created",
      payload
    };
  }

  return request({
    baseUrl: API_CONFIG.baseUrl,
    path: ENDPOINTS.support.createTicket,
    method: "POST",
    token,
    body: payload
  });
}
