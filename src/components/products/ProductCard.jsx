import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        <strong className="product-card__price">{product.price} kr</strong>

        <div className="product-card__btns">
          <button className="btn btn-primary">Lägg i varukorg</button>
          <button className="btn btn-icon" aria-label="Lägg till favorit">
            <img src="/icons/star-regular-full.svg" alt="Lägg till favorit" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
