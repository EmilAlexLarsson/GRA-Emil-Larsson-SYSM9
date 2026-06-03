import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import api from "../api";
import "../styles/pages/CheckoutPage.css";

import CustomerForm from "../components/checkout/CustomerForm";
import CardPaymentForm from "../components/checkout/CardPaymentForm";
import SwishPaymentForm from "../components/checkout/SwishPaymentForm";
import OrderSummary from "../components/cart/OrderSummary";

function CheckoutPage() {
  const navigate = useNavigate();
  //hämtar varukorgen
  const { cartItems, totalPrice, clearCart } = useCart();

  //kundinfo
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
  });
  //betalningsmetod
  const [paymentMethod, setPaymentMethod] = useState("card");

  //kortbetalning
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  //swish
  const [swishDetails, setSwishDetails] = useState({
    phone: "",
  });

  const [error, setError] = useState("");

  const shipping = 0;
  const total = totalPrice + shipping;

  //När användaren klickar på "Slutför köp"
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    //måste finnas produkter
    if (cartItems.length === 0) {
      setError("Din varukorg är tom.");
      return;
    }
    //namn måste vara ifyllt
    if (customer.name.trim() === "") {
      setError("Fyll i namn.");
      return;
    }
    // e-post måste vara giltig, t.ex. namn@example.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(customer.email.trim())) {
      setError("Fyll i en giltig e-postadress, till exempel namn@example.com.");
      return;
    }
    //validering för kortbetalning
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

    //validering för swish
    if (paymentMethod === "swish") {
      if (swishDetails.phone.trim().length < 10) {
        setError("Fyll i ett giltigt mobilnummer.");
        return;
      }
    }
    //skapa orderobjekt
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
      //skickar ordern via api.js
      const savedOrder = await api.createOrder(order);

      clearCart();

      navigate(`/confirmation/${savedOrder._id}`);
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
