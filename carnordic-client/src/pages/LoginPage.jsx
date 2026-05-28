LoginPage.jsx;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.username.trim() || !form.password.trim()) {
      setError("Fyll i användarnamn och lösenord.");
      return;
    }

    try {
      await api.login({
        username: form.username,
        password: form.password,
      });

      navigate("/");
    } catch (error) {
      setError("Fel användarnamn eller lösenord.");
    }
  }

  function goToRegister() {
    navigate("/register");
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <img
            src="/images/LogoCropped.png"
            alt="Carnordic Technology"
            className="auth-logo"
          />

          <h1>Logga in</h1>

          <div className="form-group">
            <label htmlFor="username">Användarnamn</label>
            <input
              id="username"
              type="text"
              placeholder="Ditt användarnamn"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              id="password"
              type="password"
              placeholder="Ditt lösenord"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">
            Logga in
          </button>
        </form>

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
