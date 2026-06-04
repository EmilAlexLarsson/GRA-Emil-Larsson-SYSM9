import React, { useState, useEffect } from "react";
import api from "../api";
import ProductCard from "../components/products/ProductCard";
import "../styles/pages/ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  //hämtar produkter via api.js
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        setError("Något gick fel när produkterna hämtades.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);
  //skapar en lista med katorgorier från produkterna
  //new set tar bort dubletter så varje kategori bara visas en gång
  const categories = [
    "Alla",
    ...new Set(products ? products.map((product) => product.category) : []),
  ];

  if (loading) {
    return (
      <section className="products-page">
        <div className="products-page__container">
          <p>Laddar produkter...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="products-page">
        <div className="products-page__container">
          <p>{error}</p>
        </div>
      </section>
    );
  }
  //filtrerar produkterna baserat på sökord och vald kategori
  const filteredProducts = products.filter((product) => {
    const searchLower = search.toLowerCase().trim();
    //kontrollerar om produkten matchar kategorin
    const matchesCategory =
      selectedCategory === "Alla" || product.category === selectedCategory;
    //kollar om sökningen matcher något av följande
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.model.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower);
    //produkten måste matcha både kategori och sökning för att visas
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="products-page">
      <div className="products-page__container">
        <h1>Alla våra produkter</h1>

        <input
          className="search-input"
          type="text"
          placeholder="Sök produkt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => {
                if (category === "Alla") {
                  setSelectedCategory("Alla");
                } else if (selectedCategory === category) {
                  setSelectedCategory("Alla");
                } else {
                  setSelectedCategory(category);
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
