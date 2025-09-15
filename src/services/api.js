const API_URL = "http://localhost:4000/api/v1";

export async function fetchStores() {
  const res = await fetch(`${API_URL}/dashboard/stores`);
  if (!res.ok) throw new Error("Failed to fetch stores");
  return res.json();
}

export async function fetchCustomers() {
  const res = await fetch(`${API_URL}/dashboard/customers`);
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/dashboard/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
