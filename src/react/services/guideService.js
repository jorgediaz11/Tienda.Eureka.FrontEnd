import { API_CONFIG, ENDPOINTS } from "../api/endpoints";
import { request } from "../api/httpClient";
import { purchaseGuideTable } from "../data/purchaseGuide";

export async function fetchHowToBuyGuideRows() {
  if (API_CONFIG.useMock) {
    return purchaseGuideTable;
  }

  return request({
    baseUrl: API_CONFIG.baseUrl,
    path: ENDPOINTS.guides.list,
    method: "GET"
  });
}
