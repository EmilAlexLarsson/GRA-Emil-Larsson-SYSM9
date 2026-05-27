import { useCart } from "../../contexts/CartContext";

function OrderSummary() {
  const { totalPrice } = useCart();

  const shipping = 0;
  const total = totalPrice + shipping;

  return (
    <aside className="order-summary__box">
      <h2>Ordersammanfattning</h2>

      <div className="order-summary__row">
        <span>Deltotal</span>
        <span>{totalPrice} kr</span>
      </div>

      <div className="order-summary__row">
        <span>Frakt</span>
        <span>{shipping} kr</span>
      </div>

      <div className="order-summary__row order-summary__row--total">
        <strong>Totalsumma</strong>
        <strong>{total} kr</strong>
      </div>
    </aside>
  );
}

export default OrderSummary;
