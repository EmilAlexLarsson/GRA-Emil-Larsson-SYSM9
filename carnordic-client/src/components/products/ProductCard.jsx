import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import "../../styles/components/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [added, setAdded] = useState(false);

  const favorite = isFavorite(product._id);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

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
            type="button"
            className={added ? "btn btn-primary btn-added" : "btn btn-primary"}
            onClick={handleAddToCart}
          >
            {added ? "Tillagd!" : "Lägg i varukorg"}
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
