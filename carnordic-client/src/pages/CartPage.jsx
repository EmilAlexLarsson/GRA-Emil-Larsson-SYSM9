import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import "../styles/pages/CartPage.css";

function CartPage() {
  const { cartItems } = useCart();

  return (
    <section className="cart-page">
      <div className="cart-page__container">
        <h1>Varukorgen</h1>

        <Link to="/products" className="cart-page__back-link">
          <img
            src="/icons/arrow-down-solid-full.svg"
            alt=""
            className="back-link-icon"
          />
          Fortsätt handla
        </Link>
        {/* Om varukorgen är tom, visa meddelande */}
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Din varukorg är tom.</p>

            <Link to="/products" className="cart-empty__button">
              Gå till produkter
            </Link>
          </div>
        ) : (
          //Om varukorgen har produkter, visa dem
          <div className="cart-page__layout">
            <div className="cart-page__items-box">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            <aside className="order-summary">
              <OrderSummary />

              <div className="order-summary__buttons">
                <Link to="/checkout" className="order-summary__checkout">
                  Gå till kassan
                </Link>

                <Link to="/products" className="order-summary__continue">
                  Fortsätt handla
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
