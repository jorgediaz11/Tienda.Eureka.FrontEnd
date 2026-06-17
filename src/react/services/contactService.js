import { API_CONFIG, ENDPOINTS } from "../api/endpoints";
import { request } from "../api/httpClient";

export async function sendContactEmail(payload, token) {
  if (API_CONFIG.useMock) {
    return {
      accepted: true,
      messageId: `mock-${Date.now()}`,
      payload
    };
  }

  return request({
    baseUrl: API_CONFIG.baseUrl,
    path: ENDPOINTS.contact.sendEmail,
    method: "POST",
    token,
    body: payload
  });
}
