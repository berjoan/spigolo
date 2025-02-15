// trabajopage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TrabajoPage.css';

const TrabajoPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    posicion: '',
    motivacion: '',
    cv: null
  });

  const posicionesDisponibles = [
    'Panadero/a',
    'Pastelero/a',
    'Atención al cliente',
    'Repartidor/a',
    'Hornero/a',
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cv') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!formData.cv || formData.cv.type !== 'application/pdf') {
      alert('Por favor sube tu CV en formato PDF');
      return;
    }
    
    // Aquí iría la lógica para enviar el formulario
    console.log('Datos enviados:', formData);
    alert('¡Gracias por aplicar! Revisaremos tu solicitud.');
  };

  return (
    <section className="trabajo-container">
      <div className="container">
        <h2>Únete a nuestro equipo</h2>
        
        <form onSubmit={handleSubmit} className="formulario-trabajo">
          <div className="form-grid">
            {/* Datos Personales */}
            <div className="form-group">
              <label>Nombre completo *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Correo electrónico *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Teléfono de contacto *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Selector de Posición */}
            <div className="form-group">
              <label>Posición a aplicar *</label>
              <select
                name="posicion"
                value={formData.posicion}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una posición</option>
                {posicionesDisponibles.map((posicion, index) => (
                  <option key={index} value={posicion}>{posicion}</option>
                ))}
              </select>
            </div>
            
            {/* Subir CV */}
            <div className="form-group">
              <label>Subir CV (PDF) *</label>
              <div className="file-upload">
                <input
                  type="file"
                  name="cv"
                  onChange={handleChange}
                  accept="application/pdf"
                  required
                />
                <span className="file-name">
                  {formData.cv ? formData.cv.name : 'Seleccionar archivo'}
                </span>
              </div>
            </div>
            
            {/* Motivación */}
            <div className="form-group full-width">
              <label>Carta de motivación *</label>
              <textarea
                name="motivacion"
                value={formData.motivacion}
                onChange={handleChange}
                required
                placeholder="Explícanos por qué quieres unirte a nuestro equipo..."
                rows="5"
              />
            </div>
            
            {/* Previsualización CV */}
            <div className="form-group full-width">
              <label>Vista previa del CV:</label>
              <div className="cv-preview">
                {formData.cv ? (
                  <embed
                    src={URL.createObjectURL(formData.cv)}
                    type="application/pdf"
                    width="100%"
                    height="400px"
                  />
                ) : (
                  <p>No se ha seleccionado ningún archivo</p>
                )}
              </div>
            </div>
          </div>
          
          <button type="submit" className="btn primary">
            Enviar solicitud
          </button>
        </form>
        
        <div className="info-adicional">
          <p>¿Necesitas ayuda? Contáctanos a <a href="mailto:PanaderiaSpigolopty@gmail.com">PanaderiaSpigolopty@gmail.com</a></p>
          <Link to="/" className="btn secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrabajoPage;