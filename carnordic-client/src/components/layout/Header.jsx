import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/components/Header.css";

function Header() {
  const { cartCount } = useCart();
  const { authed, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img
            src="/images/CarnordicLogoVitResize.png"
            alt="Carnordic Technology"
            className="logo-image"
          />
        </Link>

        <nav className="nav">
          <Link to="/products">
            <img src="/icons/car-solid-full.svg" alt="" />
            Produkter
          </Link>

          <Link to="/favorites">
            <img src="/icons/star-solid-full.svg" alt="" />
            Favoriter
          </Link>

          {authed ? (
            <button
              type="button"
              className="nav-link-button"
              onClick={logoutUser}
            >
              <img src="/icons/user-solid-full.svg" alt="" />
              Logga ut
            </button>
          ) : (
            <Link to="/login">
              <img src="/icons/user-solid-full.svg" alt="" />
              Logga in
            </Link>
          )}

          <Link to="/cart">
            <img src="/icons/cart-shopping-solid-full.svg" alt="" />
            Varukorg {cartCount > 0 && `(${cartCount})`}
          </Link>
        </nav>

        <div className="mobile-actions">
          <Link to="/cart" className="mobile-cart" onClick={closeMenu}>
            <img src="/icons/cart-shopping-solid-full.svg" alt="Varukorg" />
            {cartCount > 0 && <span>{cartCount}</span>}
          </Link>

          <button
            type="button"
            className="hamburger-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          >
            <img
              src={
                menuOpen
                  ? "/icons/x-solid-full.svg"
                  : "/icons/bars-solid-full.svg"
              }
              alt=""
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-menu">
          <Link to="/products" onClick={closeMenu}>
            <span>
              <img src="/icons/car-solid-full.svg" alt="" />
              Produkter
            </span>
            <span>
              <img src="/icons/arrow-down-solid-full.svg" alt="" />
            </span>
          </Link>

          <Link to="/favorites" onClick={closeMenu}>
            <span>
              <img src="/icons/star-solid-full.svg" alt="" />
              Favoriter
            </span>
            <span>
              <img src="/icons/arrow-down-solid-full.svg" alt="" />
            </span>
          </Link>

          {authed ? (
            <button
              type="button"
              className="mobile-menu-button"
              onClick={logoutUser}
            >
              <span>
                <img src="/icons/user-solid-full.svg" alt="" />
                Logga ut
              </span>
              <span>
                <img src="/icons/arrow-down-solid-full.svg" alt="" />
              </span>
            </button>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              <span>
                <img src="/icons/user-solid-full.svg" alt="" />
                Logga in
              </span>
              <span>
                <img src="/icons/arrow-down-solid-full.svg" alt="" />
              </span>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
