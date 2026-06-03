import { createContext, useContext, useState } from "react";
import api, { isAuthenticated, saveToken } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(isAuthenticated());
  //körs när användaren loggar in, sparar token och sätter authed till true
  function login(token) {
    saveToken(token);
    setAuthed(true);
  }
  //körs när användaren loggar ut, tar bort token och sätter authed till false
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
//custom hook
export function useAuth() {
  return useContext(AuthContext);
}
