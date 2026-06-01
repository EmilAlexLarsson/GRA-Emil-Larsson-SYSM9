import { useCart } from "../../contexts/CartContext";

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <article className="cart-item">
      <img
        className="cart-item__image"
        src={item.image}
        alt={`${item.name} ${item.model}`}
      />

      <div className="cart-item__info">
        <h2>{item.name}</h2>
        <p>{item.model}</p>
        <strong>{item.price} kr</strong>

        <div className="cart-item__quantity">
          <button
            type="button"
            className="cart-item__quantity-btn cart-item__quantity-btn--minus"
            onClick={() => decreaseQuantity(item._id)}
            aria-label="Minska antal"
          >
            <img src="/icons/minus-solid-full.svg" alt="Minska antal" />
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            className="cart-item__quantity-btn cart-item__quantity-btn--plus"
            onClick={() => increaseQuantity(item._id)}
            aria-label="Öka antal"
          >
            <img src="/icons/plus-solid-full.svg" alt="Öka antal" />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="cart-item__remove"
        onClick={() => removeFromCart(item._id)}
      >
        <img src="/icons/trash-solid-full.svg" alt="Ta bort" />
        Ta bort
      </button>
    </article>
  );
}

export default CartItem;
