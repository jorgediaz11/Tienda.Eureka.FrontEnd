const DEFAULT_TIMEOUT_MS = 12000;

export class HttpError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

function buildUrl(baseUrl, path) {
  const safeBase = (baseUrl || "").replace(/\/$/, "");
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${safeBase}${safePath}`;
}

export async function request({
  baseUrl,
  path,
  method = "GET",
  body,
  headers = {},
  timeoutMs = DEFAULT_TIMEOUT_MS,
  token
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(buildUrl(baseUrl, path), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });

    const raw = await response.text();
    const parsed = raw ? safeJsonParse(raw) : null;

    if (!response.ok) {
      throw new HttpError(`Error HTTP ${response.status}`, response.status, parsed);
    }

    return parsed;
  } finally {
    clearTimeout(timeoutId);
  }
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
