import "../../styles/components/RegisterForm.css";

function RegisterForm({ form, error, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="register-username">Användarnamn</label>
        <input
          id="register-username"
          name="username"
          type="text"
          placeholder="Ditt användarnamn"
          value={form.username}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-email">E-post</label>
        <input
          id="register-email"
          name="email"
          type="email"
          placeholder="namn@example.com"
          value={form.email}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-password">Lösenord</label>
        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="Skapa ett lösenord"
          value={form.password}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-confirm-password">Bekräfta lösenord</label>
        <input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="Upprepa ditt lösenord"
          value={form.confirmPassword}
          onChange={onChange}
        />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button type="submit" className="auth-button">
        Registrera dig
      </button>
    </form>
  );
}

export default RegisterForm;
