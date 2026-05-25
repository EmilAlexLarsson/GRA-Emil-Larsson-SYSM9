import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="home-page">
      <h1>Välkommen till Carnordic</h1>

      <Link to="/products">Se alla produkter</Link>
    </section>
  );
}

export default HomePage;
