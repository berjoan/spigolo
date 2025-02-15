import React from "react";

function CakeFlavorSelector({ cakeType, onSelect, selectedFlavor }) {
  return (
    <div className="selector">
      <h2>Sabor del Bizcocho</h2>
      <div className="options options-images">
        {cakeType === "chantilly" && (
          <button
            className={`option-button ${
              selectedFlavor === "mixto" ? "selected" : ""
            }`}
            onClick={() => onSelect("mixto")}
          >
            <img
              src="/images/flavors/mixto.jpg"
              alt="Mixto"
              className="option-image"
            />
            Mixto
          </button>
        )}
        <button
          className={`option-button ${
            selectedFlavor === "vainilla" ? "selected" : ""
          }`}
          onClick={() => onSelect("vainilla")}
        >
          <img
            src="/images/flavors/vainilla.jpg"
            alt="Vainilla"
            className="option-image"
          />
          Vainilla
        </button>
        <button
          className={`option-button ${
            selectedFlavor === "chocolate" ? "selected" : ""
          }`}
          onClick={() => onSelect("chocolate")}
        >
          <img
            src="/images/flavors/chocolate.jpg"
            alt="Chocolate"
            className="option-image"
          />
          Chocolate
        </button>
      </div>
    </div>
  );
}

export default CakeFlavorSelector;