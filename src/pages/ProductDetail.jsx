import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function ProductDetail() {
  const { productId } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useFetch(`http://localhost:3001/products/${productId}`);
  if (loading) {
    return <p>Laddar produkt...</p>;
  }
  if (error) {
    return <p>Något gick fel när produkten hämtades.</p>;
  }
  if (!product) {
    return <p>Produkten hittades inte.</p>;
  }
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
              <button className="detail-btn detail-btn-primary">
                Lägg i varukorg
              </button>

              <button className="detail-btn detail-btn-secondary">
                Spara som favorit{" "}
                <img
                  src="/icons/star-regular-full.svg"
                  className="product-detail-favorite-icon"
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
