import React from 'react';

function CakeCard({ pastel }) {
  return (
    <div className="cake-card">
      <img src={pastel.imagen} alt={pastel.nombre} />
      <h3>{pastel.nombre}</h3>
      <p>{pastel.precio}</p>
    </div>
  );
}

export default CakeCard;