import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import api from "../api";
import ProductCard from "../components/products/ProductCard";

function ProductsPage() {
  // const {
  //   data: products,
  //   loading,
  //   error,
  // } = useFetch("http://localhost:3001/products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alla");

  useEffect(() => {
    async function loadProducts() {
      try {
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

  const categories = [
    "Alla",
    ...new Set(products ? products.map((product) => product.category) : []),
  ];

  if (loading) {
    return <p>Laddar produkter...</p>;
  }

  if (error) {
    return <p>Något gick fel när produkterna hämtades.</p>;
  }

  const filteredProducts = products.filter((product) => {
    const searchLower = search.toLowerCase().trim();

    const matchesCategory =
      selectedCategory === "Alla" || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.model.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower);

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
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
