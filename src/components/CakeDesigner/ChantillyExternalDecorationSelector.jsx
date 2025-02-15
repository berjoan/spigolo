import React from "react";

function ChantillyExternalDecorationSelector({ onSelect, selectedDecoration }) {
  const decorationOptions = [
    "Crema Chantilly",
    "Baño de Chocolate",
    "Baño de Dulce de Fresa",
    "Brillo Espejo Marmoleado",
    "Brillo Espejo de Colores",
  ];

  return (
    <div className="selector">
      <h3>Decorado Externo (Chantilly)</h3>
      <div className="options options-images"> {/* Mantén la clase options-images si quieres las imágenes */}
        {decorationOptions.map((option) => (
          <button
            key={option}
            className={`option-button ${selectedDecoration === option ? "selected" : ""}`}
            onClick={() => onSelect(option)}
          >
            {/* Si quieres imágenes, descomenta y ajusta la ruta: */}
            {/*
            <img
              src={`/images/decoraciones/${option.toLowerCase().replace(/ /g, "-")}.jpg`}
              alt={option}
              className="option-image"
            />
            */}
            {option}  {/* Muestra solo el nombre de la opción */}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChantillyExternalDecorationSelector;