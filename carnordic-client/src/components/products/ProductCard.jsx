import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import "../../styles/components/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(product._id);

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`}>
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
        />
      </Link>

      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__model">{product.model}</p>
        <strong className="product-card__price">{product.price} kr</strong>

        <div className="product-card__btns">
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Lägg i varukorg
          </button>

          <button
            type="button"
            className={
              favorite ? "btn btn-icon btn-icon--active" : "btn btn-icon"
            }
            aria-label={
              favorite ? "Ta bort från favoriter" : "Lägg till favorit"
            }
            onClick={() => toggleFavorite(product)}
          >
            <img
              src={
                favorite
                  ? "/icons/star-solid-full.svg"
                  : "/icons/star-regular-full.svg"
              }
              alt={favorite ? "Favorit" : "Inte favorit"}
            />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
