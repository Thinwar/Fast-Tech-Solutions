const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:4000";

async function safeFetch(url, options) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || response.statusText || "Request failed.";
    throw new Error(message);
  }

  return data;
}

export async function createOrder(payload, token) {
  return safeFetch(`${apiBaseUrl}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: JSON.stringify(payload),
  });
}

export async function getMyOrders(token) {
  return safeFetch(`${apiBaseUrl}/api/orders/mine`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}
