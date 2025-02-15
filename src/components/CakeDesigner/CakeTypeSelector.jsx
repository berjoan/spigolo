import React from "react";

function CakeTypeSelector({ onSelect, cakeType }) {
  return (
    <div className="selector">
      <h2>Tipo de Pastel</h2>
      <div className="options options-images">
        <button
          className={`option-button ${cakeType === "icing" ? "selected" : ""}`}
          onClick={() => onSelect("icing")}
        >
          <img
            src="/images/icing/pastel_icing.jpg"
            alt="Pastel Icing"
            className="option-image"
          />
          Pastel Icing
        </button>
        <button
          className={`option-button ${
            cakeType === "chantilly" ? "selected" : ""
          }`}
          onClick={() => onSelect("chantilly")}
        >
          <img
            src="/images/chantilly/pastel_chantilly.jpg"
            alt="Pastel Chantilly"
            className="option-image"
          />
          Pastel Chantilly
        </button>
      </div>
    </div>
  );
}

export default CakeTypeSelector;