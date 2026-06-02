import { useCart } from "../../contexts/CartContext";
import "../../styles/components/OrderSummary.css";

function OrderSummary({ subtotal, shipping = 0, total }) {
  const cart = useCart();

  const summarySubtotal = subtotal ?? cart.totalPrice;
  const summaryShipping = shipping;
  const summaryTotal = total ?? summarySubtotal + summaryShipping;

  return (
    <div className="order-summary__box">
      <h2>Ordersammanfattning</h2>

      <div className="order-summary__row">
        <span>Deltotal</span>
        <span>{summarySubtotal} kr</span>
      </div>

      <div className="order-summary__row">
        <span>Frakt</span>
        <span>{summaryShipping} kr</span>
      </div>

      <div className="order-summary__row order-summary__row--total">
        <strong>Totalsumma</strong>
        <strong>{summaryTotal} kr</strong>
      </div>
    </div>
  );
}

export default OrderSummary;
