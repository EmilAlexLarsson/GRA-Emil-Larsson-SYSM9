const API_BASE = "http://localhost:3001";

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

export async function addFavorite(favorite) {
  return request("/favorites", {
    method: "POST",
    body: JSON.stringify(favorite),
  });
}

export async function removeFavorite(id) {
  return request(`/favorites/${id}`, {
    method: "DELETE",
  });
}

//inte riktig login än
export async function login({ username, password }) {
  const users = await request(
    `/users?username=${username}&password=${password}`,
    {
      method: "GET",
    },
  );

  if (!users || users.length === 0) {
    throw new Error("Fel användarnamn eller lösenord");
  }

  const fakeToken = "fake-jwt-token";
  saveToken(fakeToken);

  return {
    user: users[0],
    token: fakeToken,
  };
}

export async function register(user) {
  return request("/users", {
    method: "POST",
    body: JSON.stringify(user),
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
