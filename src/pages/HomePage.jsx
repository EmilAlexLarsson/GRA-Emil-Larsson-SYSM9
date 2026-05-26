import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/products/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        setError("Kunde inte hämta produkter.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const popularProducts = products ? products.slice(0, 4) : [];

  return (
    <section className="home-page">
      <section className="hero">
        <img
          className="hero__image"
          src="/images/heroIMG.png"
          alt="Volvo i verkstad med begagnade bildelar"
        />

        <div className="hero__content">
          <img
            className="hero__logo"
            src="/images/CarnordicLogoVitResize.png"
            alt="Carnordic Technology"
          />

          <p>
            Prisvärda begagnade bildelar
            <br />
            från lågmilade bilar
          </p>

          <p>
            Funktionstestade reservdelar med 1 års garanti.
            <br />
            Vi erbjuder även reparation av bilelektronik.
          </p>
        </div>
      </section>

      <section className="popular-section">
        <div className="popular-section__header">
          <h2>Populära produkter</h2>

          <Link to="/products" className="popular-section__link">
            Gå till produkter{" "}
            <img
              src="/icons/arrow-down-solid-full.svg"
              alt="Gå till produkter"
            />
          </Link>
        </div>

        {loading && <p>Laddar produkter...</p>}
        {error && <p>Kunde inte hämta produkter.</p>}

        {!loading && !error && (
          <div className="popular-grid">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default HomePage;
