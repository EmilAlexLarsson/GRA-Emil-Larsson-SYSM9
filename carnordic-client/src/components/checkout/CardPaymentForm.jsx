import "../../styles/components/CardPaymentForm.css";

function CardPaymentForm({ cardDetails, setCardDetails }) {
  return (
    <div className="payment-fields">
      <div className="form-group">
        <label htmlFor="cardNumber">Kortnummer</label>
        <input
          id="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardDetails.cardNumber}
          onChange={(e) =>
            setCardDetails({
              ...cardDetails,
              cardNumber: e.target.value,
            })
          }
        />
      </div>

      <div className="checkout-input-row">
        <div className="form-group">
          <label htmlFor="expiryDate">Utgångsdatum</label>
          <input
            id="expiryDate"
            type="text"
            placeholder="MM/ÅÅ"
            value={cardDetails.expiryDate}
            onChange={(e) =>
              setCardDetails({
                ...cardDetails,
                expiryDate: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            id="cvc"
            type="text"
            placeholder="123"
            value={cardDetails.cvc}
            onChange={(e) =>
              setCardDetails({
                ...cardDetails,
                cvc: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CardPaymentForm;
