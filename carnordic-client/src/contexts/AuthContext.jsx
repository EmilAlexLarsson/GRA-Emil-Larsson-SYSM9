import { createContext, useContext, useState } from "react";
import api, { isAuthenticated, saveToken } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(isAuthenticated());

  function login(token) {
    saveToken(token);
    setAuthed(true);
  }

  function logoutUser() {
    api.logout();
    setAuthed(false);
  }

  return (
    <AuthContext.Provider value={{ authed, login, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
