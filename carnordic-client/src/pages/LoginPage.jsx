import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import "../styles/pages/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  //hämtar login-funktionen från AuthContext
  const { login } = useAuth();
  //formuläret för inloggning
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    //stoppar sidan från att laddas om när formuläret skickas
    e.preventDefault();
    setError("");
    //validering - både användarnamn och lösenord måste vara ifyllda
    if (!form.username.trim() || !form.password.trim()) {
      setError("Fyll i användarnamn och lösenord.");
      return;
    }

    try {
      //skickar inloggningsförsöket via api.js
      const data = await api.login({
        username: form.username,
        password: form.password,
      });
      //token
      login(data.accessToken);

      navigate("/");
    } catch (error) {
      setError("Fel användarnamn eller lösenord.");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <img
          src="/images/LogoCropped.png"
          alt="Carnordic Technology"
          className="auth-logo"
        />

        <h1>Logga in</h1>

        <LoginForm
          form={form}
          error={error}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <p className="auth-divider">Eller</p>

        <button
          type="button"
          className="auth-button auth-button--secondary"
          onClick={() => navigate("/register")}
        >
          Skapa konto
        </button>
      </div>
    </section>
  );
}

export default LoginPage;
