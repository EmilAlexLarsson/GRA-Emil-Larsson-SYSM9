const API_BASE = "http://localhost:3000/api";

// LOCALSTORAGE för att hämta och sätta token

function getToken() {
  // Hämtar token som finns sparad
  return localStorage.getItem("token");
}

export function saveToken(token) {
  // Sparar token i localStorage
  localStorage.setItem("token", token);

  // Säger till appen att auth har ändrats
  window.dispatchEvent(new Event("authChange"));
}

export function logout() {
  // Tar bort token från localStorage
  localStorage.removeItem("token");

  // Säger till appen att auth har ändrats
  window.dispatchEvent(new Event("authChange"));
}

export function isAuthenticated() {
  // Om token finns -> true
  // Om token inte finns -> false
  return !!getToken();
}

// LOGIN
export async function login({ username, password }) {
  const url = `${API_BASE}/users/login`;

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ username, password }),
  });

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    data = text;
  }

  if (!response.ok) {
    throw new Error(data?.message || "Fel vid inloggning");
  }

  return data;
}

// REGISTER
export async function register({ username, email, password }) {
  const url = `${API_BASE}/users/register`;

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ username, email, password }),
  });

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    data = text;
  }

  if (!response.ok) {
    throw new Error(data?.message || "Fel vid registrering");
  }

  return data;
}

// GENERELL request-funktion
// Alla API-anrop som kan behöva token går via denna funktion
async function request(path, options = {}) {
  const headers = options.headers || {};
  //hämtar token
  const token = getToken();
  //om token finns, lägg till den i Authorization-headern
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

// CURRENT USER
export async function getCurrentUser() {
  return request("/users/current", {
    method: "GET",
  });
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
  login,
  register,
  getCurrentUser,
  getProducts,
  getProductById,
  createOrder,
  getFavorites,
  addFavorite,
  removeFavorite,
  saveToken,
  logout,
  isAuthenticated,
};
