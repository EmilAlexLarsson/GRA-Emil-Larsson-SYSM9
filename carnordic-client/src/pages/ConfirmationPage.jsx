import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OrderSummary from "../components/cart/OrderSummary";
import ConfirmationItem from "../components/confirmation/confirmationItem";
import api from "../api";
import "../styles/pages/ConfirmationPage.css";

function ConfirmationPage() {
  // Hämtar orderId från URL:en
  // Exempel: /confirmation/123abc
  const { orderId } = useParams();

  // State för ordern som hämtas från backend
  const [order, setOrder] = useState(null);

  // State för loading och error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hämtar ordern från backend när sidan laddas
  useEffect(() => {
    async function loadOrder() {
      try {
        const data = await api.getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        setError("Kunde inte hämta ordern.");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  if (loading) {
    return <p>Laddar order...</p>;
  }

  if (error || !order) {
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
            <ConfirmationItem key={item.productId || item._id} item={item} />
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
