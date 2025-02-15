import React from "react";

function CakeSizeSelector({ cakeType, flavor, onSelect, selectedSize }) {
  const icingSizes = {
    vanilla: [
      {
        name: '8 1/2" x 12"',
        price: 18.9,
        measures: "8 1/2 12",
        image: "/images/sizes/icing/vainilla/8x12.jpg",
      },
      {
        name: '12" x 12"',
        price: 27.6,
        measures: "12 12",
        image: "/images/sizes/icing/vainilla/12x12.jpg",
      },
      {
        name: '12" x 17"',
        price: 39.9,
        measures: "12 17",
        image: "/images/sizes/icing/vainilla/12x17.jpg",
      },
      {
        name: '16" x 17"',
        price: 49.9,
        measures: "16 17",
        image: "/images/sizes/icing/vainilla/16x17.jpg",
      },
      {
        name: '24" x 17"',
        price: 63.0,
        measures: "24 17",
        image: "/images/sizes/icing/vainilla/24x17.jpg",
      },
    ],
    chocolate: [
      {
        name: '8 1/2" x 12"',
        price: 27.6,
        measures: "8 1/2 12",
        image: "/images/sizes/icing/chocolate/8x12.jpg",
      },
      {
        name: '12" x 12"',
        price: 34.5,
        measures: "12 12",
        image: "/images/sizes/icing/chocolate/12x12.jpg",
      },
      {
        name: '12" x 17"',
        price: 46.0,
        measures: "12 17",
        image: "/images/sizes/icing/chocolate/12x17.jpg",
      },
      {
        name: '16" x 17"',
        price: 57.5,
        measures: "16 17",
        image: "/images/sizes/icing/chocolate/16x17.jpg",
      },
      {
        name: '24" x 17"',
        price: 78.0,
        measures: "24 17",
        image: "/images/sizes/icing/chocolate/24x17.jpg",
      },
    ],
  };

  const chantillySizes = [
    {
      name: "Pastel Grande",
      price: 19.95,
      image: "/images/sizes/chantilly/grande.jpg",
    },
    {
      name: "Pastel Pequeño",
      price: 14.5,
      image: "/images/sizes/chantilly/pequeno.jpg",
    },
    {
      name: "Pastel Mini",
      price: 10.0,
      image: "/images/sizes/chantilly/mini.jpg",
    },
    {
      name: "Pastel Brazo Gitano",
      price: 15.0,
      image: "/images/sizes/chantilly/brazo_gitano.jpg",
    },
    {
      name: "Pastel Media Plancha",
      price: 35.0,
      image: "/images/sizes/chantilly/media_plancha.jpg",
    },
    {
      name: "Pastel Plancha Completa",
      price: 70.0,
      image: "/images/sizes/chantilly/plancha_completa.jpg",
    },
  ];

  const sizes =
    cakeType === "icing"
      ? flavor === "vanilla"
        ? icingSizes.vanilla
        : icingSizes.chocolate
      : chantillySizes;

  return (
    <div className="selector">
      <h2>Tamaño del Pastel</h2>
      <div className="options options-images">
        {sizes.map((size) => (
          <button
            key={size.name}
            className={`option-button ${
              selectedSize?.name === size.name ? "selected" : ""
            }`}
            onClick={() => onSelect(size)}
          >
            <img src={size.image} alt={size.name} className="option-image" />
            {size.name}{" "}
            {cakeType === "icing" && flavor === "vanilla"
              ? `(B/. ${size.price.toFixed(2)})`
              : cakeType === "icing" && flavor === "chocolate"
              ? `(B/. ${size.price.toFixed(2)})`
              : `(B/. ${size.price.toFixed(2)})`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CakeSizeSelector;