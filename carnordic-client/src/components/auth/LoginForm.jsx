function LoginForm({ form, error, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="username">Användarnamn</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Ditt användarnamn"
          value={form.username}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Lösenord</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Ditt lösenord"
          value={form.password}
          onChange={onChange}
        />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button type="submit" className="auth-button">
        Logga in
      </button>
    </form>
  );
}

export default LoginForm;
