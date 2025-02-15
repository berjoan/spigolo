import React from "react";

function OrderSummary({
  cakeType,
  cakeSize,
  cakeFlavor,
  icingDesign,
  chantillyDesign,
  extraFloors,
  pickupLocation,
  totalPrice,
  orderDate,
  orderTime,
  chantillyFilling,
  externalDecoration, // Añadimos externalDecoration como prop
}) {
  // Definir los precios para cada tipo de pastel
  const icingPrices = {
    1: 40.25,
    2: 74.75,
    3: 103.5,
    4: 138.0,
  };

  const chantillyPrices = {
    1: 12.0,
    2: 24.0,
    3: 40.0,
    4: 50.0,
  };

  const getExtraFloorsPrice = () => {
    if (extraFloors > 0) {
      const prices = cakeType === "icing" ? icingPrices : chantillyPrices;
      return prices[extraFloors].toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="order-summary">
      <h2>Resumen del Pedido</h2>
      {cakeType && (
        <p>
          Tipo de Pastel: {cakeType === "icing" ? "Icing" : "Chantilly"}
        </p>
      )}
      {cakeSize && <p>Tamaño: {cakeSize.name}</p>}
      {cakeFlavor && <p>Sabor del Bizcocho: {cakeFlavor}</p>}
      {icingDesign && <p>Diseño (Icing): {icingDesign.name}</p>}
      {chantillyDesign && <p>Diseño (Chantilly): {chantillyDesign.name}</p>}
      {extraFloors > 0 && (
        <p>
          Pisos Extra: {extraFloors} (B/. {getExtraFloorsPrice()})
        </p>
      )}
      {chantillyFilling && (
        <p>Sabor de Relleno (Chantilly): {chantillyFilling}</p>
      )}
      {externalDecoration && ( // Añadimos la línea para mostrar el decorado externo
        <p>Decorado Externo: {externalDecoration}</p>
      )}
      {pickupLocation && <p>Sucursal de Retiro: {pickupLocation}</p>}
      {orderDate && <p>Fecha de Retiro: {orderDate}</p>}
      {orderTime && <p>Hora de Retiro: {orderTime}</p>}
    </div>
  );
}

export default OrderSummary;