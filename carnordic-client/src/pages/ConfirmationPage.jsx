import { Link } from "react-router-dom";
import OrderSummary from "../components/cart/OrderSummary";
import ConfirmationItem from "../components/confirmation/confirmationItem";
import "../styles/pages/ConfirmationPage.css";

function ConfirmationPage() {
  const savedOrder = localStorage.getItem("latestOrder");
  const order = savedOrder ? JSON.parse(savedOrder) : null;

  if (!order) {
    return (
      <section className="confirmation-page">
        <div className="confirmation-card">
          <h1>Ingen order hittades</h1>

          <Link to="/products" className="confirmation-button">
            Gå till produkter
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="confirmation-page">
      <div className="confirmation-card">
        <img
          src="/images/LogoCropped.png"
          alt="Carnordic Technology"
          className="confirmation-logo"
        />

        <h1>Tack för ditt köp!</h1>

        <div className="confirmation-items">
          {order.items.map((item) => (
            <ConfirmationItem key={item.productId || item.id} item={item} />
          ))}
        </div>

        <div className="confirmation-summary">
          <OrderSummary
            subtotal={order.subtotal}
            shipping={order.shipping}
            total={order.totalPrice}
          />
        </div>

        <Link to="/products" className="confirmation-button">
          Fortsätt handla
        </Link>
      </div>
    </section>
  );
}

export default ConfirmationPage;
