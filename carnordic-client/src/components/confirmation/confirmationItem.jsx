function ConfirmationItem({ item }) {
  return (
    <article className="confirmation-item">
      <div className="confirmation-item__left">
        <img
          src={item.image}
          alt={`${item.name} ${item.model}`}
          className="confirmation-item__image"
        />

        <div>
          <h2>{item.name}</h2>
          <p>{item.model}</p>
        </div>
      </div>

      <strong className="confirmation-item__price">
        {item.quantity} x {item.price} kr
      </strong>
    </article>
  );
}

export default ConfirmationItem;
