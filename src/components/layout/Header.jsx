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
        <Link to="/products">
          <img src="/icons/car-solid-full.svg" alt="Produkter" /> Produkter
        </Link>
        <Link to="/favorites">
          <img src="/icons/star-solid-full.svg" alt="Favoriter" /> Favoriter
        </Link>
        <Link to="/login">
          <img src="/icons/user-solid-full.svg" alt="Logga in" /> Logga in
        </Link>
        <Link to="/cart">
          <img src="/icons/cart-shopping-solid-full.svg" alt="Varukorg" />
          Varukorg {cartCount > 0 && `(${cartCount})`}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
