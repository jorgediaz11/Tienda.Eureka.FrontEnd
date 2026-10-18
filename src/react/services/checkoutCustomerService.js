const CHECKOUT_CUSTOMER_STORAGE_KEY = "eureka_checkout_customer";

function normalizeCustomer(payload = {}) {
  return {
    fullName: String(payload.fullName || "").trim(),
    email: String(payload.email || "").trim(),
    phone: String(payload.phone || "").trim(),
    documentNumber: String(payload.documentNumber || "").trim(),
    address: String(payload.address || "").trim(),
    reference: String(payload.reference || "").trim()
  };
}

export function readCheckoutCustomer() {
  try {
    const raw = localStorage.getItem(CHECKOUT_CUSTOMER_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    return normalizeCustomer(parsed);
  } catch {
    return null;
  }
}

export function saveCheckoutCustomer(customer) {
  const normalized = normalizeCustomer(customer);
  localStorage.setItem(CHECKOUT_CUSTOMER_STORAGE_KEY, JSON.stringify(normalized));
}
