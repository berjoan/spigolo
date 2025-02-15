import React from "react";

function PickupLocationSelector({ onSelect, selectedLocation }) {
  const locations = [
    "VIA ESPAÑA",
    "SANTA LIBRADA",
    "CONDADO DEL REY",
    "CALIDONIA",
    "VILLA LUCRE",
    "DON BOSCO",
    "BRISAS DEL GOLF",
    "VILLA LOBOS",
    "LA 24 DE DICIEMBRE",
  ];

  return (
    <div className="selector">
      <h2>Sucursal de Retiro</h2>
      <div className="options options-images">
        {locations.map((location) => (
          <button
            key={location}
            className={`option-button ${
              selectedLocation === location ? "selected" : ""
            }`}
            onClick={() => onSelect(location)}
          >
            {location}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PickupLocationSelector;