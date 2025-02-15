import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Assets locales
const heroVideo = "/images/videos/bakery-video.mp4";

const socialLinks = {
  whatsapp: "https://wa.me/50764203541",
  instagram1: "https://www.instagram.com/spigolo.pa/?hl=es",
  instagram2: "https://www.instagram.com/spigolopty/?hl=es-la",
};

const assets = {
  pastelera: "/images/pastelera.jpg",
  misionImg: "/images/mision.jpg",
  desayunos: "/images/desayunos.jpg",
  sandwiches: "/images/sandwiches.jpg",
  empanadas: "/images/empanadas.jpg",
};

function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [showProductGrid, setShowProductGrid] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
      setShowProductGrid(true);
    }, 5600); // 6 segundos después de que el video termine

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {/* Header compacto */}
      <header className={isSticky ? "sticky" : ""}>
        <div className="container">
          <div className="header-content">
            <h1 className="header-title">Panadería Spigolo</h1>

            <nav className="contact-info">
              <div className="contact-items">
                <div className="contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <span>+507 6420 3541</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>PanaderiaSpigolopty@gmail.com</span>
                </div>
              </div>

              <div className="header-actions">
                <div className="social-links">
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-link"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a
                    href={socialLinks.instagram1}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href={socialLinks.instagram2}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>

                <div className="header-buttons">
                  <Link to="/menu" className="btn primary">
                    Catálogo
                  </Link>
                  <Link to="/design" className="btn secondary">
                    Diseñar Pastel
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Sección Hero - Video */}
      <section className="hero-video">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`hero-video-content ${showVideo ? "visible" : "hidden"}`}
          poster=""
          onEnded={() => setTimeout(() => setShowVideo(false), 5000)}
        >
          <source src={heroVideo} type="video/mp4" />
          Tu navegador no soporta videos HTML5
        </video>
        <div className={`video-overlay ${showVideo ? "visible" : "hidden"}`}></div>

{/* Sección de Productos Destacados */}
<div className={`productos-destacados ${showProductGrid ? "visible" : "hidden"}`}>
  <div className="container">
    <h2>Prueba nuestros deliciosos Emparedados y Batidos.</h2>
    <div className="productos-grid">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <div key={item} className="producto-card">
          <img
            src={`/images/emparedado${item}.jpg`}
            alt={`Emparedado ${item}`}
            className="producto-image"
          />
        </div>
      ))}
    </div>
  </div>
</div>
      </section>

      {/* Sección Nuestra Esencia */}
      <section className="nuestra-esencia">
        <div className="container grid-2">
          <div className="content">
            <h2>Nuestra Esencia</h2>
            <div className="mision-vision">
              <div className="card">
                <h3>Misión</h3>
                <p>
                  Elaborar productos de panadería y pastelería de alta calidad,
                  utilizando ingredientes frescos y técnicas tradicionales,
                  creando experiencias memorables para nuestros clientes.
                </p>
              </div>
              <div className="card">
                <h3>Visión</h3>
                <p>
                  Ser reconocidos como la panadería líder en innovación y
                  calidad, manteniendo siempre el toque artesanal que nos
                  caracteriza.
                </p>
              </div>
            </div>
          </div>
          <div className="image-container">
            <img
              src={assets.misionImg}
              alt="Nuestra Esencia"
              loading="lazy"
              style={{ borderRadius: "15px", width: "100%" }}
            />
          </div>
        </div>
      </section>
      
      {/* Productos Destacados */}
      <section className="destacados">
        <div className="container">
          <h2>Nuestros Productos Destacados</h2>
          <div className="productos-grid">
            <div className="producto-card">
              <img 
                src={assets.desayunos} 
                alt="Desayunos" 
                loading="lazy"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <h3>Desayunos Completos</h3>
              <p>Comienza tu día con energía con nuestras opciones saludables y deliciosas</p>
            </div>
            <div className="producto-card">
              <img 
                src={assets.sandwiches} 
                alt="Sandwiches" 
                loading="lazy"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <h3>Sandwiches Gourmet</h3>
              <p>Mezclas únicas de sabores con ingredientes premium</p>
            </div>
            <div className="producto-card">
              <img 
                src={assets.empanadas} 
                alt="Empanadas" 
                loading="lazy"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <h3>Empanadas Artesanales</h3>
              <p>Hechas al horno o fritas, con rellenos tradicionales y creativos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a acción */}
      <section className="cta-pastelero">
        <div className="container grid-2">
          <div className="content">
            <h2>Crea tu Pastel Soñado</h2>
            <p>
              Selecciona ingredientes, decoraciones y sabores únicos con nuestro
              diseñador de pasteles
            </p>
            <Link to="/design" className="btn secondary">
              Comenzar Diseño
            </Link>
          </div>
        </div>
      </section>

      {/* Footer optimizado */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Horario de atención</h3>
              <p>Lunes a Domingo</p>
              <p>7:00 AM - 8:00 PM</p>
            </div>
            <div className="footer-col">
              <h4>Contacto directo</h4>
              <p>
                <i className="fas fa-phone-alt"></i> +507 6420 3541
              </p>
              <p>
                <i className="fas fa-envelope"></i> PanaderiaSpigolopty@gmail.com
              </p>
              <div className="social-links">
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href={socialLinks.instagram1}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href={socialLinks.instagram2}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Navegación</h4>
              <ul>
                <li>
                  <Link to="/menu">Catálogo</Link>
                </li>
                <li>
                  <Link to="/design">Diseña tu pastel</Link>
                </li>
                <li>
                  <Link to="/trabaja-con-nosotros">Trabaja con nosotros</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Oportunidades</h4>
              <ul>
                <li>
                  <Link to="/trabaja-con-nosotros">
                    Forma parte de nuestro equipo
                  </Link>
                </li>
                <li>
                  <Link to="/preguntas-frecuentes">Preguntas frecuentes</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;