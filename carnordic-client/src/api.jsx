const API_BASE = "http://localhost:3000/api";

// LOCALSTORAGE för token
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

// GENERELL request-funktion
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

// ORDERS
export async function createOrder(order) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
}

// USERS / AUTH
export async function login({ username, password }) {
  return request("/users/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function register({ username, email, password }) {
  return request("/users/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

export async function getCurrentUser() {
  return request("/users/current", {
    method: "GET",
  });
}

// FAVORITES
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

export async function removeFavorite(productId) {
  return request(`/favorites/${productId}`, {
    method: "DELETE",
  });
}

export default {
  getProducts,
  getProductById,
  createOrder,
  login,
  register,
  getCurrentUser,
  getFavorites,
  addFavorite,
  removeFavorite,
  saveToken,
  logout,
  isAuthenticated,
};
