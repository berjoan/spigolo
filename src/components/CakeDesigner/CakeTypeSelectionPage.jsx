import React from "react";
import { Link } from "react-router-dom";
import "./CakeTypeSelectionPage.css";

function CakeTypeSelectionPage({ onSelectCakeType }) {
    return (
        <div className="cake-type-selection-page">
            <h1>Elige el tipo de pastel</h1>
            <div className="cake-type-options">
                <div className="cake-type-option" onClick={() => onSelectCakeType("icing")}>
                    <img src="/images/icing/pastel_icing.jpg" alt="Pastel con Icing" />
                    <h2>Pastel con Icing</h2>
                </div>
                <div className="cake-type-option" onClick={() => onSelectCakeType("chantilly")}>
                    <img src="/images/chantilly/pastel_chantilly.jpg" alt="Pastel con Chantilly" />
                    <h2>Pastel con Chantilly</h2>
                </div>
            </div>
            
            {/* Botón de volver al inicio */}
            <div className="back-to-home">
                <Link to="/" className="btn secondary">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}

export default CakeTypeSelectionPage;