import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

function Header() {
  const { cartCount } = useCart();

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
        <Link to="/cart">Varukorg {cartCount > 0 && `(${cartCount})`}</Link>
      </nav>
    </header>
  );
}

export default Header;
