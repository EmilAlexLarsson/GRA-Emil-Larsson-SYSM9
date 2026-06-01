import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/auth/LoginForm";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
    e.preventDefault();
    setError("");

    if (!form.username.trim() || !form.password.trim()) {
      setError("Fyll i användarnamn och lösenord.");
      return;
    }

    try {
      const data = await api.login({
        username: form.username,
        password: form.password,
      });

      login(data.accessToken);

      navigate("/");
    } catch (error) {
      setError("Fel användarnamn eller lösenord.");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
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
