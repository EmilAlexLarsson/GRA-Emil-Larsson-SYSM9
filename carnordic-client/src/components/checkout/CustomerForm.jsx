function CustomerForm({ customer, setCustomer }) {
  return (
    <div className="checkout-box">
      <h2>Kunduppgifter</h2>

      <div className="checkout-input-row">
        <div className="form-group">
          <label htmlFor="name">Namn</label>
          <input
            id="name"
            type="text"
            placeholder="För- och efternamn"
            value={customer.name}
            onChange={(e) =>
              setCustomer({
                ...customer,
                name: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-post</label>
          <input
            id="email"
            type="email"
            placeholder="namn@exempel.se"
            value={customer.email}
            onChange={(e) =>
              setCustomer({
                ...customer,
                email: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
