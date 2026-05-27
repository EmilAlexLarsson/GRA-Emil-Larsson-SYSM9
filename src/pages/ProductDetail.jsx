import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";

function ProductDetail() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await api.getProductById(productId);
        setProduct(data);
      } catch (error) {
        setError("Något gick fel när produkten hämtades.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  if (loading) {
    return <p>Laddar produkt...</p>;
  }
  if (error) {
    return <p>Något gick fel när produkten hämtades.</p>;
  }
  if (!product) {
    return <p>Produkten hittades inte.</p>;
  }

  const favorite = isFavorite(product.id);
  return (
    <section className="product-detail-page">
      <div className="product-detail-container">
        <Link to="/products" className="product-detail-back">
          <img
            src="/icons/arrow-down-solid-full.svg"
            alt="Tillbaka"
            className="product-detail-back-icon"
          />
          Tillbaka till alla produkter
        </Link>

        <div className="product-detail-card">
          <div className="product-detail-image-box">
            <img
              src={product.image}
              alt={`${product.name} ${product.model}`}
              className="product-detail-image"
            />
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>

            <p className="product-detail-model">{product.model}</p>

            <div className="product-detail-description">
              <h2>Beskrivning</h2>
              <p>{product.description}</p>
            </div>

            <div className="product-detail-actions">
              <button
                className="detail-btn detail-btn-primary"
                onClick={() => addToCart(product)}
              >
                Lägg i varukorg
              </button>

              <button
                className="detail-btn detail-btn-secondary"
                onClick={() => toggleFavorite(product)}
              >
                {favorite ? "Ta bort från favoriter" : "Spara som favorit"}
                <img
                  src={
                    favorite
                      ? "/icons/star-solid-full.svg"
                      : "/icons/star-regular-full.svg"
                  }
                  className="product-detail-favorite-icon"
                  alt={favorite ? "Favorit" : "Inte favorit"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
