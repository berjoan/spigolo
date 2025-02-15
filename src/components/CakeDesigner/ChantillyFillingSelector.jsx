import React from "react";

function ChantillyFillingSelector({ onSelect, selectedFilling }) {
  const fillings = [
    "Chantilly",
    "Chantilly con Dulce de Leche",
    "Dulce de Leche",
    "Chantilly con Oreo",
    "Chantilly con Jalea de Fresa",
    "Chantilly con Chocolate",
    "Chantilly con Melocotón",
    "Chantilly Chocolate y Cereza",
    "Chantilly con Crema de Limón",
  ];

  return (
    <div className="selector">
      <h2>Sabor de Relleno (Chantilly)</h2>
      <div className="options options-images">
        {fillings.map((filling) => (
          <button
            key={filling}
            className={`option-button ${
              selectedFilling === filling ? "selected" : ""
            }`}
            onClick={() => onSelect(filling)}
          >
            {/* Si tienes imágenes para los rellenos, agrégalas aquí */}
            {/* <img src={`/images/fillings/${filling.toLowerCase().replace(/ /g, "_")}.jpg`} alt={filling} className="option-image" /> */}
            {filling}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChantillyFillingSelector;