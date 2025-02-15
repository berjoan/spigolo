import React from "react";

function ExtraFloorsSelector({ onSelect, cakeType, selectedFloors }) {
  const handleFloorSelect = (numFloors) => {
    onSelect(numFloors);
  };

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

  // Obtener los precios correctos basados en el tipo de pastel
  const prices = cakeType === "icing" ? icingPrices : chantillyPrices;

  return (
    <div className="selector">
      <h2>Pisos Extra</h2>
      <div className="options options-images">
        <button
          className={`option-button ${selectedFloors === 0 ? "selected" : ""}`}
          onClick={() => handleFloorSelect(0)}
        >
          <img
            src="/images/extra-floors/0-floors.jpg"
            alt="0 Pisos"
            className="option-image"
          />
          0 Pisos
        </button>
        {[1, 2, 3, 4].map((floor) => (
          <button
            key={floor}
            className={`option-button ${
              selectedFloors === floor ? "selected" : ""
            }`}
            onClick={() => handleFloorSelect(floor)}
          >
            <img
              src={`/images/extra-floors/${floor}-floor.jpg`}
              alt={`${floor} Piso${floor > 1 ? "s" : ""}`}
              className="option-image"
            />
            {floor} Piso{floor > 1 ? "s" : ""}{" "}
            (B/. {prices[floor]?.toFixed(2) || "N/A"})
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExtraFloorsSelector;