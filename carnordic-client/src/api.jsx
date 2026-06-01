const API_BASE = "http://localhost:3000/api";

// local för token

function getToken() {
  return localStorage.getItem("token");
}

export function saveToken(token) {
  localStorage.setItem("token", token);
  window.dispatchEvent(new Event("authChange"));
}

export function logout() {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("authChange"));
}

export function isAuthenticated() {
  return !!getToken();
}

// genrell
async function request(path, options = {}) {
  const headers = options.headers || {};

  const token = getToken();

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  headers["Content-Type"] = "application/json";

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    data = text;
  }

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

// PRODUCTS

export async function getProducts() {
  return request("/products", {
    method: "GET",
  });
}

export async function getProductById(id) {
  return request(`/products/${id}`, {
    method: "GET",
  });
}

// orders (checkout)

export async function createOrder(order) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
}

// favoriter

export async function getFavorites() {
  return request("/favorites", {
    method: "GET",
  });
}

export async function addFavorite(productId) {
  return request("/favorites", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
}

export async function removeFavorite(id) {
  return request(`/favorites/${id}`, {
    method: "DELETE",
  });
}

export async function login({ username, password }) {
  const data = await request("/users/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  saveToken(data.accessToken);

  return data;
}

export async function register({ username, email, password }) {
  return request("/users/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

export default {
  getProducts,
  getProductById,
  createOrder,
  getFavorites,
  addFavorite,
  removeFavorite,
  login,
  register,
  saveToken,
  logout,
  isAuthenticated,
};
