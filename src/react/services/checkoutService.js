import { API_CONFIG, ENDPOINTS } from "../api/endpoints";
import { request } from "../api/httpClient";

export async function createCheckout(payload, token) {
  if (API_CONFIG.useMock) {
    return {
      orderId: `ORD-${Date.now()}`,
      paymentStatus: "approved",
      amount: payload.amount,
      items: payload.items
    };
  }

  return request({
    baseUrl: API_CONFIG.baseUrl,
    path: ENDPOINTS.checkout.create,
    method: "POST",
    token,
    body: payload
  });
}

export async function simulateIzipayPayment(payload) {
  if (API_CONFIG.useMock) {
    const cardDigits = String(payload.cardNumber || "").replace(/\D/g, "");
    const rejected = cardDigits.endsWith("0000");

    await new Promise((resolve) => setTimeout(resolve, 900));

    return {
      approved: !rejected,
      authorizationCode: rejected ? "" : `AUTH-${Date.now()}`,
      gateway: "izipay-simulado",
      amount: payload.amount
    };
  }

  return request({
    baseUrl: API_CONFIG.baseUrl,
    path: ENDPOINTS.checkout.simulateIzipay,
    method: "POST",
    body: payload
  });
}
