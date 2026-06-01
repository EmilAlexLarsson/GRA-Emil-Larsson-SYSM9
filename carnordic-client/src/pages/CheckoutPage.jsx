import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import api from "../api";

import CustomerForm from "../components/checkout/CustomerForm";
import CardPaymentForm from "../components/checkout/CardPaymentForm";
import SwishPaymentForm from "../components/checkout/SwishPaymentForm";
import OrderSummary from "../components/cart/OrderSummary";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const [swishDetails, setSwishDetails] = useState({
    phone: "",
  });

  const [error, setError] = useState("");

  const shipping = 0;
  const total = totalPrice + shipping;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Din varukorg är tom.");
      return;
    }

    if (customer.name.trim() === "") {
      setError("Fyll i namn.");
      return;
    }

    if (customer.email.trim() === "" || !customer.email.includes("@")) {
      setError("Fyll i en giltig e-postadress.");
      return;
    }

    if (paymentMethod === "card") {
      if (cardDetails.cardNumber.trim().length < 8) {
        setError("Fyll i ett giltigt kortnummer.");
        return;
      }

      if (cardDetails.expiryDate.trim() === "") {
        setError("Fyll i utgångsdatum.");
        return;
      }

      if (cardDetails.cvc.trim().length < 3) {
        setError("Fyll i CVC.");
        return;
      }
    }

    if (paymentMethod === "swish") {
      if (swishDetails.phone.trim().length < 10) {
        setError("Fyll i ett giltigt mobilnummer.");
        return;
      }
    }

    const order = {
      customer,
      paymentMethod,
      paymentDetails: paymentMethod === "card" ? cardDetails : swishDetails,
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        model: item.model,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal: totalPrice,
      shipping,
      totalPrice: total,
      createdAt: new Date().toISOString(),
    };

    try {
      const savedOrder = await api.createOrder(order);

      localStorage.setItem("latestOrder", JSON.stringify(savedOrder));

      clearCart();

      navigate("/confirmation");
    } catch (error) {
      setError("Något gick fel när ordern skapades.");
    }
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <h1>Betalning</h1>

        <Link to="/cart" className="checkout-back-link">
          <img
            src="/icons/arrow-down-solid-full.svg"
            alt=""
            className="back-link-icon"
          />
          Tillbaka till varukorgen
        </Link>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-main">
            <CustomerForm customer={customer} setCustomer={setCustomer} />

            <div className="checkout-box">
              <h2>Betalningsmetod</h2>

              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Kort
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="swish"
                    checked={paymentMethod === "swish"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Swish
                </label>
              </div>

              {paymentMethod === "card" && (
                <CardPaymentForm
                  cardDetails={cardDetails}
                  setCardDetails={setCardDetails}
                />
              )}

              {paymentMethod === "swish" && (
                <SwishPaymentForm
                  swishDetails={swishDetails}
                  setSwishDetails={setSwishDetails}
                />
              )}

              {error && <p className="checkout-error">{error}</p>}

              <div className="checkout-actions">
                <button type="submit" className="checkout-submit">
                  Slutför köp
                </button>

                <Link to="/cart" className="checkout-secondary">
                  Tillbaka till varukorgen
                </Link>
              </div>
            </div>
          </div>

          <aside className="checkout-summary">
            <OrderSummary
              subtotal={totalPrice}
              shipping={shipping}
              total={total}
            />
          </aside>
        </form>
      </div>
    </section>
  );
}

export default CheckoutPage;
