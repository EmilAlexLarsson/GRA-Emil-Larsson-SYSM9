import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img
          src="/images/CarnordicLogoVitResize.png"
          alt="Carnordic Technology"
          className="logo-image"
        />
      </Link>

      <nav className="nav">
        <Link to="/products">Produkter</Link>
        <Link to="/favorites">Favoriter</Link>
        <Link to="/login">Logga in</Link>
        <Link to="/cart">Varukorg</Link>
      </nav>
    </header>
  );
}

export default Header;
