import React from "react";

function ChantillyDesignSelector({ cakeSize, onSelect, selectedDesign }) {
  const designOptions = {
    "Pastel Grande": [
      {
        name: "Decorado Sencillo en Crema Chantilly",
        price: 6.0,
        image: "/images/designs/chantilly/grande/sencillo.jpg",
      },
      {
        name: "Decorado con Frutas, Galletas o Chocolate",
        price: 8.0,
        image:
          "/images/designs/chantilly/grande/frutas_galletas_chocolate.jpg",
      },
    ],
    "Pastel Pequeño": [
      {
        name: "Decorado Sencillo en Crema Chantilly",
        price: 6.0,
        image: "/images/designs/chantilly/pequeno/sencillo.jpg",
      },
      {
        name: "Decorado con Frutas, Galletas o Chocolate",
        price: 8.0,
        image:
          "/images/designs/chantilly/pequeno/frutas_galletas_chocolate.jpg",
      },
    ],
    "Pastel Mini": [
      {
        name: "Decorado Sencillo en Crema Chantilly",
        price: 6.0,
        image: "/images/designs/chantilly/mini/sencillo.jpg",
      },
      {
        name: "Decorado con Frutas, Galletas o Chocolate",
        price: 8.0,
        image: "/images/designs/chantilly/mini/frutas_galletas_chocolate.jpg",
      },
    ],
    "Pastel Brazo Gitano": [
      {
        name: "Decorado Sencillo en Crema Chantilly",
        price: 6.0,
        image: "/images/designs/chantilly/brazo_gitano/sencillo.jpg",
      },
      {
        name: "Decorado con Frutas, Galletas o Chocolate",
        price: 8.0,
        image:
          "/images/designs/chantilly/brazo_gitano/frutas_galletas_chocolate.jpg",
      },
    ],
    "Pastel Media Plancha": [
      {
        name: "Decorado Sencillo en Crema Chantilly",
        price: 10.0,
        image: "/images/designs/chantilly/media_plancha/sencillo.jpg",
      },
      {
        name: "Decorado con Frutas, Galletas o Chocolate",
        price: 12.0,
        image:
          "/images/designs/chantilly/media_plancha/frutas_galletas_chocolate.jpg",
      },
    ],
    "Pastel Plancha Completa": [
      {
        name: "Decorado Sencillo en Crema Chantilly",
        price: 16.0,
        image: "/images/designs/chantilly/plancha_completa/sencillo.jpg",
      },
      {
        name: "Decorado con Frutas, Galletas o Chocolate",
        price: 20.0,
        image:
          "/images/designs/chantilly/plancha_completa/frutas_galletas_chocolate.jpg",
      },
    ],
  };

    // Obtener las opciones basadas en el tamaño del pastel. Si no hay tamaño, o no hay opciones para ese tamaño, usar un array vacío.
    const options = (cakeSize && designOptions[cakeSize.name]) ? designOptions[cakeSize.name] : [];

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

export default ChantillyDesignSelector;