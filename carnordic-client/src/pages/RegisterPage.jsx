import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import RegisterForm from "../components/auth/RegisterForm";
import "../styles/pages/RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        <img
          src="/images/LogoCropped.png"
          alt="Carnordic Technology"
          className="auth-logo"
        />

        <h1>Registrera</h1>

        <RegisterForm
          form={form}
          error={error}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}

export default RegisterPage;
