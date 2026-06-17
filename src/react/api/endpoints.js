// Puntos de integracion para backend. Pendiente: reemplazar paths/baseUrl finales.
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || "",
  useMock: (import.meta.env.VITE_USE_MOCK || "true") === "true"
};

export const ENDPOINTS = {
  auth: {
    login: "/api/auth/login",
    me: "/api/auth/me",
    updateProfile: "/api/auth/profile",
    logout: "/api/auth/logout"
  },
  contact: {
    sendEmail: "/api/contact/send"
  },
  support: {
    topics: "/api/support/topics",
    createTicket: "/api/support/tickets"
  },
  checkout: {
    create: "/api/checkout/create",
    simulateIzipay: "/api/checkout/izipay/simulate"
  },
  guides: {
    list: "/api/guides/how-to-buy"
  }
};
