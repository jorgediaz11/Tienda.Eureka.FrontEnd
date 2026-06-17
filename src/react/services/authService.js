import { API_CONFIG, ENDPOINTS } from "../api/endpoints";
import { request } from "../api/httpClient";

export async function loginUser(payload) {
  if (API_CONFIG.useMock) {
    return {
      token: "mock-token",
      user: {
        email: payload.email,
        fullName: payload.fullName || "Cliente Eureka",
        phone: payload.phone || ""
      }
    };
  }

  return request({
    baseUrl: API_CONFIG.baseUrl,
    path: ENDPOINTS.auth.login,
    method: "POST",
    body: payload
  });
}

export async function fetchCurrentUser(token) {
  if (API_CONFIG.useMock) {
    return null;
  }

  return request({
    baseUrl: API_CONFIG.baseUrl,
    path: ENDPOINTS.auth.me,
    token
  });
}

export async function saveProfile(token, payload) {
  if (API_CONFIG.useMock) {
    return {
      user: {
        ...payload
      }
    };
  }

  return request({
    baseUrl: API_CONFIG.baseUrl,
    path: ENDPOINTS.auth.updateProfile,
    method: "PUT",
    token,
    body: payload
  });
}

export async function logoutUser(token) {
  if (API_CONFIG.useMock) {
    return { ok: true };
  }

  return request({
    baseUrl: API_CONFIG.baseUrl,
    path: ENDPOINTS.auth.logout,
    method: "POST",
    token
  });
}
