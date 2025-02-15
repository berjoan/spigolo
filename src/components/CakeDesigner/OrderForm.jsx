import React from 'react';

function OrderForm({ onNameChange, onPhoneChange, customerName, customerPhone }) {
  return (
    <div className="order-form">
      <h2>Información del Cliente</h2>
      <div className="form-group">
        <label htmlFor="customer-name">Nombre:</label>
        <input
          type="text"
          id="customer-name"
          value={customerName}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="customer-phone">Teléfono:</label>
        <input
          type="tel"
          id="customer-phone"
          value={customerPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
        />
      </div>
      {/* Puedes agregar más campos aquí si es necesario */}
    </div>
  );
}

export default OrderForm;