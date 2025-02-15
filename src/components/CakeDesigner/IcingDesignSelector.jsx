import React from "react";

function IcingDesignSelector({ cakeSize, onSelect, selectedDesign }) {
  const designOptions = {
    "8 1/2 12": [
      {
        name: "Dibujo en Crema Icing",
        price: 5.0,
        image: "/images/designs/icing/8x12/dibujo_crema.jpg",
      },
      {
        name: "Dibujo Impreso en Papel de Arroz",
        price: 10.0,
        image: "/images/designs/icing/8x12/dibujo_papel.jpg",
      },
    ],
    "12 12": [
      {
        name: "Dibujo en Crema Icing",
        price: 5.0,
        image: "/images/designs/icing/12x12/dibujo_crema.jpg",
      },
      {
        name: "Dibujo Impreso en Papel de Arroz",
        price: 10.0,
        image: "/images/designs/icing/12x12/dibujo_papel.jpg",
      },
    ],
    "12 17": [
      {
        name: "Dibujo en Crema Icing",
        price: 5.0,
        image: "/images/designs/icing/12x17/dibujo_crema.jpg",
      },
      {
        name: "Dibujo Impreso en Papel de Arroz",
        price: 10.0,
        image: "/images/designs/icing/12x17/dibujo_papel.jpg",
      },
    ],
    "16 17": [
      {
        name: "Dibujo en Crema Icing",
        price: 6.0,
        image: "/images/designs/icing/16x17/dibujo_crema.jpg",
      },
      {
        name: "Dibujo Impreso en Papel de Arroz",
        price: 15.0,
        image: "/images/designs/icing/16x17/dibujo_papel.jpg",
      },
    ],
    "24 17": [
      {
        name: "Dibujo en Crema Icing",
        price: 6.0,
        image: "/images/designs/icing/24x17/dibujo_crema.jpg",
      },
      {
        name: "Dibujo Impreso en Papel de Arroz",
        price: 15.0,
        image: "/images/designs/icing/24x17/dibujo_papel.jpg",
      },
    ],
  };

  // Obtener las opciones basadas en el tamaño del pastel. Si no hay tamaño, o no hay opciones para ese tamaño, usar un array vacío.
  const options = (cakeSize && designOptions[cakeSize.measures]) ? designOptions[cakeSize.measures] : [];

  return (
    <div className="selector">
      <h2>Tipo de Diseño </h2>
      <div className="options options-images">
        {/* Mostrar opciones SIEMPRE, incluso si no hay opciones disponibles */}
        {options.length > 0 ? (
          options.map((option) => (
            <button
              key={option.name}
              className={`option-button ${
                selectedDesign && selectedDesign.name === option.name ? "selected" : ""
              }`}
              onClick={() => onSelect(option)}
            >
              <img src={option.image} alt={option.name} className="option-image" />
              {option.name} (B/. {option.price.toFixed(2)})
            </button>
          ))
        ) : (
          <p>Selecciona un tamaño de pastel para ver las opciones de diseño.</p>
        )}
      </div>
    </div>
  );
}

export default IcingDesignSelector;