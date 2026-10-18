// Puntos de integracion para backend.
// Politica de mocks:
// - Desarrollo: mock habilitado por defecto.
// - No desarrollo: mock deshabilitado por defecto.
function parseBooleanEnv(value, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }

  const normalized = String(value).trim().toLowerCase();
  if (normalized === "true") {
    return true;
  }
  if (normalized === "false") {
    return false;
  }

  return defaultValue;
}

const defaultUseMock = !!import.meta.env.DEV;
const useMock = parseBooleanEnv(import.meta.env.VITE_USE_MOCK, defaultUseMock);

export const API_CONFIG = {
  baseUrl: (import.meta.env.VITE_API_BASE_URL || "").trim(),
  useMock
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
