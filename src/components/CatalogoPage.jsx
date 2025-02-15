import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CatalogoPage.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PedidoPDF from "./PedidoPDF";

const CatalogoPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "2025") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Clave incorrecta. Por favor solicite la clave al administrador.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Acceso al Catálogo</h2>
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value="Panaderia Spigolo"
              disabled
              className="disabled-input"
            />
          </div>
          <div className="form-group">
            <label>Clave:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Ingresar
          </button>
          <p className="admin-contact">
            ¿Necesitas acceso? Contacta al administrador para obtener la clave.
          </p>
        </form>
      </div>
    );
  }

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.nombre === producto.nombre);
    if (productoExistente) {
      setCarrito(
        carrito.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Función para aumentar la cantidad de un producto en el carrito
  const aumentarCantidad = (nombre) => {
    setCarrito(
      carrito.map((item) =>
        item.nombre === nombre ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // Función para disminuir la cantidad de un producto en el carrito
  const disminuirCantidad = (nombre) => {
    setCarrito(
      carrito.map((item) =>
        item.nombre === nombre && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
  };

  // Función para calcular el total
  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + parseFloat(item.precio.replace("B/. ", "")) * item.cantidad,
      0
    );
  };

  const categorias = [
    {
      nombre: "PANADERIA",
      productos: [
        {
          nombre: "PAN BAGUETTE",
          precio: "B/. 53.90",
          descripcion: "Empaque: 100 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7838293756181151_1",
          disponibles: 10001
        },
        {
          nombre: "PAN FRANCÉS",
          precio: "B/. 33.00",
          descripcion: "Empaque: 200 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7462244207159236_1",
          disponibles: 9999
        },
        {
          nombre: "PAN CAMPESINO LARGO",
          precio: "B/. 6.75",
          descripcion: "Empaque: 8 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7283266918407020_1",
          disponibles: 5000
        },
        {
          nombre: "PAN CAMPESINO REDONDO",
          precio: "B/. 6.75",
          descripcion: "Empaque: 8 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6904559566338188_1",
          disponibles: 7500
        },
        {
          nombre: "PAN QUESO RELLENO",
          precio: "B/. 15.40",
          descripcion: "Empaque: 8 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7352458438146838_1",
          disponibles: 3000
        },
        {
          nombre: "PAN ALIÑADO DE QUESO",
          precio: "B/. 7.70",
          descripcion: "Empaque: 6 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25768118776108670_1",
          disponibles: 4500
        },
        {
          nombre: "PAN QUESILLO TRENZADO",
          precio: "B/. 13.20",
          descripcion: "Empaque: 15 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6771167016320599_1",
          disponibles: 6000
        },
        {
          nombre: "PAN MASA BOMBA",
          precio: "B/. 9.70",
          descripcion: "Empaque: 48 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24874613908850362_1",
          disponibles: 2500
        },
        {
          nombre: "PAN PIÑITA",
          precio: "B/. 14.50",
          descripcion: "Empaque: 96 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7134783313284402_1",
          disponibles: 8000
        },
        {
          nombre: "ENROLLADO JAMÓN/QUESO",
          precio: "B/. 21.70",
          descripcion: "Empaque: 10 unidades - Producto Congelado - Listo para proceso de descongelado y calentado",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25716149531317122_1",
          disponibles: 3500
        },
        {
          nombre: "PAN CORBATA",
          precio: "B/. 5.80",
          descripcion: "Empaque: 12 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/8146735985354007_1",
          disponibles: 7000
        },
        {
          nombre: "PAN ALIÑADO JAMÓN/QUESO",
          precio: "B/. 8.25",
          descripcion: "Empaque: 8 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6887351308059228_1",
          disponibles: 5500
        },
        {
          nombre: "PAN EMPAREDADOS DELI",
          precio: "B/. 4.20",
          descripcion: "Empaque: 15 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7288947921140293_1",
          disponibles: 9000
        },
        {
          nombre: "COMBO PAN DE HUEVO",
          precio: "B/. 39.35",
          descripcion: "Empaque contiene: PAN DE HUEVO MOÑA GRANDE, MICHITA, TRENZA, BOLITA y PANITO - Producto Congelado: masa cruda",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7350261338350456_1",
          disponibles: 1500
        },
        {
          nombre: "PAN CANELA Y PASAS",
          precio: "B/. 6.70",
          descripcion: "Empaque: 12 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7509811429040748_1",
          disponibles: 4000
        },
        {
          nombre: "CACHITO DE JAMÓN",
          precio: "B/. 24.95",
          descripcion: "Empaque: 16 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6606832632750084_1",
          disponibles: 6500
        },
        {
          nombre: "PAN MICHITA",
          precio: "B/. 2.50",
          descripcion: "Empaque: 32 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24874002568912672_1",
          disponibles: 10000
        },
        {
          nombre: "PAN DE MANTEQUILLA",
          precio: "B/. 4.15",
          descripcion: "Empaque: 20 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25113881088227309_1",
          disponibles: 8500
        }
      ]
    },
    // CATEGORÍA HOJALDRE
    {
      nombre: "HOJALDRE",
      productos: [
        {
          nombre: "EMPANADA ASADA DE QUESO",
          precio: "B/. 21.50",
          descripcion: "Empaque: 32 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7445392918856720_1",
          disponibles: 8500
        },
        {
          nombre: "EMP. ASADA DE POLLO",
          precio: "B/. 21.50",
          descripcion: "Empaque: 32 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7099707496794181_1",
          disponibles: 7200
        },
        {
          nombre: "EMP. ASADA CARNE MOLIDA",
          precio: "B/. 21.50",
          descripcion: "Empaque: 32 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25254177530847266_1",
          disponibles: 6800
        },
        {
          nombre: "OREJAS",
          precio: "B/. 15.20",
          descripcion: "Empaque: 24 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7305046672915884_1",
          disponibles: 9200
        },
        {
          nombre: "OREJITAS",
          precio: "B/. 14.70",
          descripcion: "Empaque: 80 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7561752333887024_1",
          disponibles: 10500
        },
        {
          nombre: "HERRADURA DE GUAYABA",
          precio: "B/. 14.55",
          descripcion: "Empaque: 24 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7287195561350202_1",
          disponibles: 6400
        },
        {
          nombre: "CAÑON DE GUAYABA",
          precio: "B/. 20.45",
          descripcion: "Empaque: 40 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7153576264698312_1",
          disponibles: 7800
        },
        {
          nombre: "ECLE DE GUAYABA",
          precio: "B/. 9.00",
          descripcion: "Empaque: 12 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7349977211734957_1",
          disponibles: 11500
        },
        {
          nombre: "COSTILLA DE GUAYABA",
          precio: "B/. 15.00",
          descripcion: "Empaque: 20 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7340714202660561_1",
          disponibles: 8300
        },
        {
          nombre: "PASTELITO DE PIÑA",
          precio: "B/. 3.80",
          descripcion: "Empaque: 6 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/8112572778758282_1",
          disponibles: 12700
        },
        {
          nombre: "PASTELITO DE MANZANA",
          precio: "B/. 3.80",
          descripcion: "Empaque: 6 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/8000317526649898_1",
          disponibles: 13400
        },
        {
          nombre: "CROISSANT SIMPLE",
          precio: "B/. 5.80",
          descripcion: "Empaque: 12 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7271898919556002_1",
          disponibles: 9800
        },
        {
          nombre: "CROISSANT JAMÓN Y QUESO",
          precio: "B/. 11.00",
          descripcion: "Empaque: 12 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7382672621753913_1",
          disponibles: 7200
        },
        {
          nombre: "CARACOLA DULCE DE LECHE",
          precio: "B/. 7.60",
          descripcion: "Empaque: 12 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7676771239013863_1",
          disponibles: 10500
        },
        {
          nombre: "CARACOLA CHOCO CHIPS",
          precio: "B/. 6.75", // Precio estimado ya que no estaba especificado
          descripcion: "Empaque: 3 unidades - Producto Congelado: masa cruda - Listo para proceso de descongelado, crecimiento y horneo",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7452411331484847_1",
          disponibles: 8900
        }
        // Repetir estructura para todos los productos de hojaldre...
      ]
    },

    // CATEGORÍA DULCES SECOS
    {
      nombre: "DULCES SECOS",
      productos: [
        {
          nombre: "PAN DE LECHE",
          precio: "B/. 6.00",
          descripcion: "Empaque: 12 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7203687266391222_1",
          disponibles: 8500
        },
        {
          nombre: "BROWNIE DE GALLETA",
          precio: "B/. 6.40",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7144525698956911_1",
          disponibles: 7200
        },
        {
          nombre: "BROWNIE CHOCOLATE",
          precio: "B/. 5.90",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25651224611143412_1",
          disponibles: 6800
        },
        {
          nombre: "MANTECADO",
          precio: "B/. 4.65",
          descripcion: "Empaque: 12 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25101265399520244_1",
          disponibles: 9200
        },
        {
          nombre: "CACHETE DE CHOLA",
          precio: "B/. 4.65",
          descripcion: "Empaque: 12 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7799470190084571_1",
          disponibles: 10500
        },
        {
          nombre: "MERENGUE",
          precio: "B/. 4.65",
          descripcion: "Empaque: 12 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25118363787810733_1",
          disponibles: 6400
        },
        {
          nombre: "MINI MERENGUE",
          precio: "B/. 17.35",
          descripcion: "Empaque: 50 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25209737595278262_1",
          disponibles: 7800
        },
        {
          nombre: "TORTA DE ZANAHORIA",
          precio: "B/. 12.10",
          descripcion: "Empaque: 12 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7555024894548289_1",
          disponibles: 11500
        },
        {
          nombre: "TORTA DE GUINEO",
          precio: "B/. 12.10",
          descripcion: "Empaque: 12 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6594048614028235_1",
          disponibles: 8300
        },
        {
          nombre: "TORTA DE VAINILLA",
          precio: "B/. 12.10",
          descripcion: "Empaque: 12 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7202700039795997_1",
          disponibles: 12700
        },
        {
          nombre: "TORTA MARMOLEADA",
          precio: "B/. 12.10",
          descripcion: "Empaque: 12 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7261534777246420_1",
          disponibles: 13400
        },
        {
          nombre: "TORTA FOX",
          precio: "B/. 12.40",
          descripcion: "Empaque: 12 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25014044024905635_1",
          disponibles: 9800
        },
        {
          nombre: "GALLETON GRANDE",
          precio: "B/. 6.95",
          descripcion: "Empaque: 9 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6948818581896084_1",
          disponibles: 7200
        },
        {
          nombre: "GALLETON PEQUEÑO",
          precio: "B/. 5.50", // Precio estimado
          descripcion: "Empaque: 45 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24906298669014322_1",
          disponibles: 10500
        },
        {
          nombre: "COQUITOS",
          precio: "B/. 9.90",
          descripcion: "Empaque: 30 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7637808842906004_1",
          disponibles: 8900
        },
        {
          nombre: "PIE DE GUAYABA",
          precio: "B/. 6.00",
          descripcion: "Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7285868388200655_1",
          disponibles: 7500
        },
        {
          nombre: "BIZCOCHO DE GUINEO",
          precio: "B/. 6.70",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Partir en 11 piezas",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7456063027788428_1",
          disponibles: 6800
        },
        {
          nombre: "BIZCOCHO MARMOLEADO",
          precio: "B/. 6.70",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Partir en 11 piezas",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24907948132187323_1",
          disponibles: 7200
        },
        {
          nombre: "BIZCOCHO DE ZANAHORIA",
          precio: "B/. 6.70",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Partir en 11 piezas",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7302541969822803_1",
          disponibles: 6500
        },
        {
          nombre: "GALLETA CHOCO CHIPS",
          precio: "B/. 6.90",
          descripcion: "Empaque: 12 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6909515639152880_1",
          disponibles: 8200
        },
        {
          nombre: "DULCE DE FRUTA 600 GR",
          precio: "B/. 2.75",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6078395275618793_1",
          disponibles: 11500
        },
        {
          nombre: "FOSFORITO DE CHOCOLATE",
          precio: "B/. 17.30",
          descripcion: "Empaque: 47 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7413728792016727_1",
          disponibles: 6800
        },
        {
          nombre: "DULCE FRUTA 300 GR",
          precio: "B/. 1.65",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25835613166038114_1",
          disponibles: 11500
        }
        // ... otros productos dulces secos
      ]
    },

    // CATEGORÍA GALLETAS 
    {
      nombre: "GALLETAS",
      productos: [
        {
          nombre: "PASTA SECA NEVADA",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/8177138668968053_1",
          disponibles: 7900
        },
        {
          nombre: "PASTA SECA DE CHOCOLATE",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24770822822564780_1",
          disponibles: 8400
        },
        {
          nombre: "PASTA SECA DE OREO",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6914395212021589_1",
          disponibles: 9100
        },
        {
          nombre: "PASTA S. LLUVIA CHOCOLATE",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7637404906299129_1",
          disponibles: 7600
        },
        {
          nombre: "PASTA S. LLUVIA DE COLORES",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7389794421078361_1",
          disponibles: 8200
        },
        {
          nombre: "PASTA SECA PUNTO ROJO",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7304265336357634_1",
          disponibles: 7800
        },
        {
          nombre: "PASTA SECA CHOCO CHIPS",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24617419401235708_1",
          disponibles: 8500
        },
        {
          nombre: "PASTA SECA DE CANELA",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24892079627103039_1",
          disponibles: 9300
        },
        {
          nombre: "PASTA SECA DE COCO",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7678881588822671_1",
          disponibles: 7800
        },
        {
          nombre: "PASTA SECA M&M",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7494686627248007_1",
          disponibles: 8500
        },
        {
          nombre: "PASTA SECA DE ALMENDRAS",
          precio: "B/. 7.60",
          descripcion: "Empaque: 70 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6941066579338028_1",
          disponibles: 7200
        },
        // ... otros galletas de pasta seca 
      ]
    },    
    // CATEGORÍA PANES HORNEADOS
    {
      nombre: "PANES HORNEADOS",
      productos: [
        {
          nombre: "PAN MOLDE BLANCO",
          precio: "B/. 1.30",
          descripcion: "Empaque: 1 unidad - Producto empacado rebanado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7257489047663001_1",
          disponibles: 12000
        },
        {
          nombre: "PAN MOLDE DE PASAS",
          precio: "B/. 1.35",
          descripcion: "Empaque: 1 unidad - Producto empacado rebanado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25617357764518149_1",
          disponibles: 9500
        },
        {
          nombre: "PAN MOLDE MANTEQUILLA",
          precio: "B/. 1.30",
          descripcion: "Empaque: 1 unidad - Producto empacado rebanado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25107880968826425_1",
          disponibles: 11000
        },
        {
          nombre: "PAN HOT DOG",
          precio: "B/. 1.40",
          descripcion: "Empaque: 6 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7542523675793531_1",
          disponibles: 8500
        },
        {
          nombre: "PAN HAMBURGUESA",
          precio: "B/. 1.40",
          descripcion: "Empaque: 6 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6659207890845906_1",
          disponibles: 7800
        },
        {
          nombre: "ROSQUITA SUAVE",
          precio: "B/. 0.80",
          descripcion: "Empaque: 7 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7662130833838971_1",
          disponibles: 14200
        },
        {
          nombre: "ROSQUITA DURA",
          precio: "B/. 0.80",
          descripcion: "Empaque: 7 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7098239993600763_1",
          disponibles: 13600
        },
        {
          nombre: "PAN DE LA ARENA",
          precio: "B/. 0.80",
          descripcion: "Empaque: 7 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7150431538405060_1",
          disponibles: 11500
        },
        {
          nombre: "KARAMANDUKA",
          precio: "B/. 0.90",
          descripcion: "Empaque: 7 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/5980161652108385_1",
          disponibles: 9800
        },
        {
          nombre: "PAN ANDINO",
          precio: "B/. 1.30",
          descripcion: "Empaque: 1 unidad - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7189412337778400_1",
          disponibles: 10500
        },
        {
          nombre: "PAN ACEMITA",
          precio: "B/. 1.30",
          descripcion: "Empaque: 6 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7934776023218652_1",
          disponibles: 12700
        },
        {
          nombre: "PAN SUIZO GRANDE",
          precio: "B/. 1.55",
          descripcion: "Empaque: 1 unidad - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7211882428926982_1",
          disponibles: 9200
        },
        {
          nombre: "PAN SUIZO PEQUEÑO",
          precio: "B/. 0.65",
          descripcion: "Empaque: 2 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7249423708504455_1",
          disponibles: 14500
        },
        {
          nombre: "PAN MOÑA DE ALMENDRAS",
          precio: "B/. 1.55",
          descripcion: "Empaque: 1 unidad - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7559122580778208_1",
          disponibles: 8800
        },
        {
          nombre: "ROSQUETE",
          precio: "B/. 0.80",
          descripcion: "Empaque: 7 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7211926878894989_1",
          disponibles: 13200
        },
        {
          nombre: "PAN BUFFET",
          precio: "B/. 1.30",
          descripcion: "Empaque: 16 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7392154980842482_1",
          disponibles: 11500
        },
        {
          nombre: "QUEQUE DE JEMJIBRE",
          precio: "B/. 0.80",
          descripcion: "Empaque: 7 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7216820471688755_1",
          disponibles: 10500
        },
        {
          nombre: "PAN DE COCO",
          precio: "B/. 1.20",
          descripcion: "Empaque: 6 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7331233416990298_1",
          disponibles: 9800
        },
        {
          nombre: "QUEQUE COCO",
          precio: "B/. 0.80",
          descripcion: "Empaque: 7 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7266452353415787_1",
          disponibles: 11200
        },
        {
          nombre: "PALITROQUE",
          precio: "B/. 0.80",
          descripcion: "Empaque: 7 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7067723336609997_1",
          disponibles: 13500
        },
        {
          nombre: "PAN BOLA PASAS",
          precio: "B/. 1.25",
          descripcion: "Empaque: 6 unidades - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7169971849782270_1",
          disponibles: 10200
        },
        {
          nombre: "R. MEDIANA ALMENDRAS",
          precio: "B/. 6.05",
          descripcion: "Empaque: 1 unidad - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7057456437686918_1",
          disponibles: 7500
        },
        {
          nombre: "R. GRANDE SIN ALMENDRA",
          precio: "B/. 9.90",
          descripcion: "Empaque: 1 unidad - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7235781836536495_1",
          disponibles: 6800
        },
        {
          nombre: "ROSCA SIN ALMENDRA",
          precio: "B/. 3.85",
          descripcion: "Empaque: 1 unidad - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7431382193550604_1",
          disponibles: 8200
        },
        {
          nombre: "ROSCA CON ALMENDRA",
          precio: "B/. 4.95",
          descripcion: "Empaque: 1 unidad - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7269043933161091_1",
          disponibles: 7800
        },
        {
          nombre: "R. MEDIANA SIN ALMENDRA",
          precio: "B/. 4.95",
          descripcion: "Empaque: 1 unidad - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24719035361078318_1",
          disponibles: 7200
        },
        {
          nombre: "R. GRANDE CON ALMENDRA",
          precio: "B/. 11.00",
          descripcion: "Empaque: 1 unidad - Producto empacado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7355613527831073_1",
          disponibles: 6500
        }
        // ... otros panes horneados
      ]
    },

    // CATEGORÍA EMPANADAS FRITAS
    {
      nombre: "EMPANADAS FRITAS",
      productos: [
        {
          nombre: "EMP. FRITA DE POLLO",
          precio: "B/. 4.40",
          descripcion: "Empaque: 4 unidades - Producto Congelado: masa cruda - Listo para freír",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6896033700507108_1",
          disponibles: 8500
        },
        {
          nombre: "EMP. FRITA JAMÓN/QUESO",
          precio: "B/. 4.40",
          descripcion: "Empaque: 4 unidades - Producto Congelado: masa cruda - Listo para freír",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6086725251452578_1",
          disponibles: 9200
        },
        {
          nombre: "EMP. FRITA DE CARNE MOLIDA",
          precio: "B/. 4.40",
          descripcion: "Empaque: 4 unidades - Producto Congelado: masa cruda - Listo para freír",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24904142249201128_1",
          disponibles: 7800
        },
        {
          nombre: "EMP. FRITA DE QUESO",
          precio: "B/. 4.40", // Precio asumido por consistencia
          descripcion: "Empaque: 4 unidades - Producto Congelado: masa cruda - Listo para freír",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7592658567418935_1",
          disponibles: 10500
        },
        {
          nombre: "EMP. FRITA DE MECHADA",
          precio: "B/. 4.40",
          descripcion: "Empaque: 4 unidades - Producto Congelado: masa cruda - Listo para freír",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7232510340197383_1",
          disponibles: 6800
        }
        // ... otras empanadas
      ]
    },

    // CATEGORÍA DULCES FRIOS
    {
      nombre: "DULCES FRIOS",
      productos: [
        {
          nombre: "DULCE FRIO FRESA/CHOC.",
          precio: "B/. 10.70",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7191310904292730_1",
          disponibles: 8500
        },
        {
          nombre: "DULCE FRIO PIE DE LIMON",
          precio: "B/. 14.30",
          descripcion: "Empaque: 8 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24972715762371710_1",
          disponibles: 7200
        },
        {
          nombre: "DULCE FRIO OPERA",
          precio: "B/. 10.70",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7762933710407828_1",
          disponibles: 6800
        },
        {
          nombre: "DULCE FRIO DULCE DE LECHE",
          precio: "B/. 10.70",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7228842643877407_1",
          disponibles: 9200
        },
        {
          nombre: "DULCE FRIO CANNOLO",
          precio: "B/. 10.70",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7953076928054817_1",
          disponibles: 10500
        },
        {
          nombre: "DULCE DE OREO",
          precio: "B/. 10.70",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/8016664515028008_1",
          disponibles: 6400
        },
        {
          nombre: "DULCE FRIO FLAN ESCONDIDO",
          precio: "B/. 10.70",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24851901507758078_1",
          disponibles: 8300
        },
        {
          nombre: "DULCE FRIO MILHOJAS",
          precio: "B/. 10.70",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24955995904045711_1",
          disponibles: 12700
        },
        {
          nombre: "DULCE FRIO DE FRESA",
          precio: "B/. 10.70",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7190206194348095_1",
          disponibles: 13400
        },
        {
          nombre: "DULCE FRIO DE CHOCOLATE",
          precio: "B/. 10.70",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7526618224043423_1",
          disponibles: 9800
        },
        {
          nombre: "DULCE F. MARQ. ALMENDRAS",
          precio: "B/. 10.70",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/8162901573725103_1",
          disponibles: 7200
        },
        {
          nombre: "DULCE FRIO SELVA NEGRA",
          precio: "B/. 10.70",
          descripcion: "Empaque: 6 unidades - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25731729353092884_1",
          disponibles: 10500
        },
   
        // ... otros dulces fríos
      ]
    },

    // CATEGORÍA DULCES DE VASOS
    {
      nombre: "DULCES DE VASOS",
      productos: [
        {
          nombre: "DULCE F. MOUSE MARACUYA",
          precio: "B/. 1.80",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7232526403468347_1",
          disponibles: 8900
        },
        {
          nombre: "DULCE MOUSE MELOCOTÓN",
          precio: "B/. 1.80",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7324021604343921_1",
          disponibles: 11500
        },
        {
          nombre: "DULCE FRIO TRES LECHE",
          precio: "B/. 1.80",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7112280975533954_1",
          disponibles: 6800
        },
        {
          nombre: "DULCE FRIO FLAN DE LA CASA",
          precio: "B/. 1.80",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7324010214309328_1",
          disponibles: 7500
        },
        {
          nombre: "DULCE F. MOUSE DE LIMON",
          precio: "B/. 1.80",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7233978290028420_1",
          disponibles: 8200
        },
        {
          nombre: "DULCE FRIO MOUSE DE FRESA",
          precio: "B/. 1.80",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25220991074165986_1",
          disponibles: 7800
        },
        {
          nombre: "DULCE FRIO CHEESECAKE",
          precio: "B/. 1.80",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7422094781174118_1",
          disponibles: 11500
        },
        {
          nombre: "DULCE FRIO MOUSE CHOCO.",
          precio: "B/. 1.80",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7349848305075622_1",
          disponibles: 9100
        }
        // ... otros dulces vasos
      ]
    },


    // CATEGORÍA PASTELES
    {
      nombre: "PASTELES",
      productos: [
        {
          nombre: "PASTEL G. TRES LECHE",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7174632745961406_1",
          disponibles: 8500
        },
        {
          nombre: "PASTEL G. MELOCOTÓN",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6950792855031559_1",
          disponibles: 7200
        },
        {
          nombre: "PASTEL G. DE LIMÓN",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7355925454446581_1",
          disponibles: 6800
        },
        {
          nombre: "PASTEL G. DE ALMENDRAS",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24653924334250998_1",
          disponibles: 9200
        },
        {
          nombre: "PASTEL G. DE OREO",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7641371789241348_1",
          disponibles: 10500
        },
        {
          nombre: "PASTEL G. MARMOLEADO",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7239693612817671_1",
          disponibles: 6400
        },
        {
          nombre: "PASTEL G. SELVA NEGRA",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25172046615720018_1",
          disponibles: 7800
        },
        {
          nombre: "PASTEL G. DULCE DE LECHE",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7122126724571216_1",
          disponibles: 11500
        },
        {
          nombre: "PASTEL G. FRESA/CHOCOLATE",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7198441990203803_1",
          disponibles: 8300
        },
        {
          nombre: "PASTEL G. DE FRESA",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7860302380655305_1",
          disponibles: 12700
        },
        {
          nombre: "PASTEL G. DE CHOCOLATE",
          precio: "B/. 14.05",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7405871589476363_1",
          disponibles: 13400
        },
    
        // Pasteles Pequeños
        {
          nombre: "PASTEL PEQ. MARMOLEADO",
          precio: "B/. 11.20",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7084165018285222_1",
          disponibles: 9800
        },
        {
          nombre: "PASTEL PEQ. DE OREO",
          precio: "B/. 11.20",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7384241708264456_1",
          disponibles: 7200
        },
        {
          nombre: "PASTEL PEQ. LIMÓN",
          precio: "B/. 11.20",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6959097507534213_1",
          disponibles: 10500
        },
        {
          nombre: "PASTEL PEQ. TRES LECHE",
          precio: "B/. 11.20",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7160288390723489_1",
          disponibles: 8900
        },
        {
          nombre: "PASTEL PEQ. DE FRESA",
          precio: "B/. 11.20",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7165946983442098_1",
          disponibles: 11500
        },
        {
          nombre: "PASTEL PEQ. SELVA NEGRA",
          precio: "B/. 11.70",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7169723893075533_1",
          disponibles: 6800
        },
        {
          nombre: "PASTEL PEQ. DE CHOCOLATE",
          precio: "B/. 11.20",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7192199507494315_1",
          disponibles: 7500
        },
        {
          nombre: "PASTEL PEQ. DULCE DE LECHE",
          precio: "B/. 11.20",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7108741829173179_1",
          disponibles: 8200
        },
        {
          nombre: "PASTEL PEQ. DE ALMENDRAS",
          precio: "B/. 11.20",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7211156435587183_1",
          disponibles: 9100
        },
        {
          nombre: "PASTEL PEQ. FRESA/CHOC.",
          precio: "B/. 11.20",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7341733232536919_1",
          disponibles: 10500
        },
        {
          nombre: "PASTEL PEQ. DE MELOCOTÓN",
          precio: "B/. 11.70",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7893037784045775_1",
          disponibles: 8800
        },
        {
          nombre: "PASTEL PEQ. COLORES",
          precio: "B/. 11.20",
          descripcion: "Empaque: 1 unidad - Producto refrigerado - Listo para exhibición",
          imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7415031851887036_1",
          disponibles: 7200
        }
        // ... otros pasteles adicionales...
      ]
    },

    // CATEGORÍA MATERIA PRIMA
      {
        nombre: "MATERIA PRIMA",
        productos: [
          {
            nombre: "QUESO GOUDA 1 KG",
            precio: "B/. 9.90",
            descripcion: "Producto para preparación - Complemento de panadería",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6924501127672752_1",
            disponibles: 2500
          },
          {
            nombre: "CERDO 500 GR",
            precio: "B/. 8.50",
            descripcion: "Empaque: 5 unidades de 100 Gr - Para preparación",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/24830432039937326_1",
            disponibles: 1800
          },
          {
            nombre: "MANGA DE GUAYABA 1 KG",
            precio: "B/. 2.75",
            descripcion: "Insumo para repostería - Producto de preparación",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6760366060736635_1",
            disponibles: 3500
          },
          {
            nombre: "POLLO 500 GR",
            precio: "B/. 6.00",
            descripcion: "Empaque: 5 unidades de 100 Gr - Para preparación",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/25411411621837355_1",
            disponibles: 2200
          },
          {
            nombre: "QUESO BLANCO 1 KG",
            precio: "B/. 9.00",
            descripcion: "Producto para preparación - Complemento de panadería",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7742227195795873_1",
            disponibles: 2800
          },
          {
            nombre: "MANGA DE FRESA 1 KG",
            precio: "B/. 6.60",
            descripcion: "Insumo para repostería - Producto de preparación",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7677362975628162_1",
            disponibles: 4200
          },
          {
            nombre: "MANGA DESECHABLE",
            precio: "B/. 0.20",
            descripcion: "Utensilio de preparación - Uso en decoración",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7738658662917820_1",
            disponibles: 10000
          },
          {
            nombre: "HUEVO CARTÓN 1.8 KG",
            precio: "B/. 5.00",
            descripcion: "Producto básico para preparación - Panadería",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7038153002948698_1",
            disponibles: 1500
          },
          {
            nombre: "CHOCOLATE BLANCO 1 KG",
            precio: "B/. 10.75",
            descripcion: "Insumo para repostería - Producto de preparación",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7520437174686069_1",
            disponibles: 3200
          },
          {
            nombre: "HARINA 1 KG",
            precio: "B/. 1.50",
            descripcion: "Producto básico para preparación - Panadería",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7592293667519608_1",
            disponibles: 5000
          },
          {
            nombre: "MANGA DULCE DE LECHE 1 KG",
            precio: "B/. 6.00",
            descripcion: "Insumo para repostería - Producto de preparación",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/6918974961541775_1",
            disponibles: 3800
          },
          {
            nombre: "CHOCOLATE OSCURO 1 KG",
            precio: "B/. 10.75",
            descripcion: "Insumo para repostería - Producto de preparación",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7279216362127563_1",
            disponibles: 2900
          },
          {
            nombre: "JAMÓN REBANADO 1 KG",
            precio: "B/. 8.00",
            descripcion: "Producto para preparación - Complemento de panadería",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7540152802669770_1",
            disponibles: 2100
          },
          {
            nombre: "MANGA CONSISTENTE PASTELERA 1 KG",
            precio: "B/. 3.00",
            descripcion: "Utensilio de preparación - Uso profesional",
            imagen: "https://2chat-user-data.s3.amazonaws.com/w/p/50764203541/7637620532916900_1",
            disponibles: 4500
          }
          // ... otros materia primas adicionales...
        ]
      }
    ];
  
    return (
      <div className="catalogo-container">
        {/* Sección de categorías (izquierda) */}
        <div className="menu-categorias">
          <h2>Categorías</h2>
          <ul>
            {categorias.map((categoria, index) => (
              <li
                key={index}
                className={categoria.nombre === categoriaSeleccionada?.nombre ? "active" : ""}
                onClick={() => setCategoriaSeleccionada(categoria)}
              >
                {categoria.nombre}
              </li>
            ))}
          </ul>
        </div>
    
        {/* Sección de productos (centro) */}
        <div className="contenido-principal">
          {categoriaSeleccionada ? (
            <>
              <h1>{categoriaSeleccionada.nombre}</h1>
              <div className="productos-grid">
                {categoriaSeleccionada.productos.map((producto, index) => (
                  <div
                    key={index}
                    className="producto-card"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    <div className="imagen-container">
                      <img src={producto.imagen} alt={producto.nombre} />
                    </div>
                    <div className="producto-info">
                      <h3>{producto.nombre}</h3>
                      <p className="precio">{producto.precio}</p>
                      <p className="descripcion">{producto.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bienvenida">
            <h1>Bienvenido al Catálogo</h1>
            <p>Selecciona una categoría para ver sus productos</p>
          </div>
        )}
      </div>

      {/* Sección del carrito (derecha) */}
      <div className="carrito">
        <h2>Solicitud de Pedido</h2>
        <div className="icono-carrito">🛒</div>
        <div className="resumen-carrito">
          {carrito.map((item, index) => (
            <div key={index} className="item-carrito">
              <span>{item.nombre}</span>
              <span>B/. {item.precio.replace("B/. ", "")}</span>
              <div className="contador-cantidad">
                <button onClick={() => disminuirCantidad(item.nombre)}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => aumentarCantidad(item.nombre)}>+</button>
              </div>
              <button
                className="eliminar-producto"
                onClick={() => eliminarProducto(item.nombre)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        <div className="total-carrito">
          <strong>Total: B/. {calcularTotal().toFixed(2)}</strong>
        </div>
        <PDFDownloadLink
          document={<PedidoPDF carrito={carrito} total={calcularTotal()} />}
          fileName="pedido.pdf"
        >
          {({ loading }) => (loading ? "Generando PDF..." : "Generar Pedido")}
        </PDFDownloadLink>
        
        {/* Botón Volver al inicio añadido aquí */}
        <div className="back-to-home">
          <Link to="/" className="btn secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CatalogoPage;