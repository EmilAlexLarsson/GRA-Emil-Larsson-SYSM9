import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import ProductCard from "../components/products/ProductCard";

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <section className="favorites-page">
      <div className="favorites-page__container">
        <h1>Favoriter</h1>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <p>Du har inga sparade favoriter ännu.</p>

            <Link to="/products" className="favorites-empty__button">
              Gå till produkter
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FavoritesPage;
