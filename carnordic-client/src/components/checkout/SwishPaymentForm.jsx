import "../../styles/components/SwishPaymentForm.css";

function SwishPaymentForm({ swishDetails, setSwishDetails }) {
  return (
    <div className="payment-fields">
      <div className="form-group">
        <label htmlFor="phone">Mobilnummer</label>
        <input
          id="phone"
          type="tel"
          placeholder="+46"
          value={swishDetails.phone}
          onChange={(e) =>
            setSwishDetails({
              ...swishDetails,
              phone: e.target.value,
            })
          }
        />
      </div>

      <p className="swish-info">
        Vänligen genomför betalningen i din Swish-app.
      </p>
    </div>
  );
}

export default SwishPaymentForm;
