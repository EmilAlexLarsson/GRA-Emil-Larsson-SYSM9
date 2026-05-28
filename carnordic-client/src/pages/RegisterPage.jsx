import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.username.trim()) {
      setError("Fyll i användarnamn.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Fyll i en giltig e-postadress.");
      return;
    }

    if (!form.password.trim()) {
      setError("Fyll i lösenord.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    try {
      await api.register({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (error) {
      setError("Något gick fel vid registrering.");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card auth-card--register">
        <form onSubmit={handleSubmit}>
          <img
            src="/images/LogoCropped.png"
            alt="Carnordic Technology"
            className="auth-logo"
          />

          <h1>Registrera</h1>

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
            <label htmlFor="email">E-post</label>
            <input
              id="email"
              type="email"
              placeholder="namn@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              id="password"
              type="password"
              placeholder="Skapa ett lösenord"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Bekräfta lösenord</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Upprepa ditt lösenord"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">
            Registrera dig
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;
