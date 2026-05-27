import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";

function CartPage() {
  const { cartItems } = useCart();

  return (
    <section className="cart-page">
      <div className="cart-page__container">
        <h1>Varukorgen</h1>

        <Link to="/products" className="cart-page__back-link">
          <img src="arrow-down-solid-full.svg" alt="Arrow down" /> Fortsätt
          handla
        </Link>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Din varukorg är tom.</p>
            <Link to="/products" className="cart-empty__button">
              Gå till produkter
            </Link>
          </div>
        ) : (
          <div className="cart-page__layout">
            <div className="cart-page__items-box">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <OrderSummary />
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
