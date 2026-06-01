import { createContext, useContext, useState } from "react";
import api, { isAuthenticated, saveToken } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [user, setUser] = useState(null);

  function login(token, userData) {
    saveToken(token);
    setAuthed(true);
    setUser(userData);
  }

  function logoutUser() {
    api.logout();
    setAuthed(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        authed,
        user,
        login,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
