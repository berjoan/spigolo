import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    backgroundColor: "#f8f9fa", // Fondo claro
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50", // Color oscuro para el título
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    width: "100%",
    border: "1px solid #dee2e6", // Borde ligero
    borderRadius: 8, // Bordes redondeados
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #dee2e6", // Línea divisoria
    padding: 10,
    backgroundColor: "#ffffff", // Fondo blanco para las filas
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e74c3c", // Color rojo para el encabezado
    color: "#ffffff", // Texto blanco
    padding: 10,
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    padding: 5,
  },
  leftAlign: {
    textAlign: "left",
  },
  centerAlign: {
    textAlign: "center",
  },
  rightAlign: {
    textAlign: "right",
  },
  priceAlign: {
    textAlign: "center", // Centrado
    paddingRight: 20, // Espacio para alinear a la derecha dentro del centro
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ffffff", // Fondo blanco
    border: "1px solid #dee2e6", // Borde ligero
    borderRadius: 8, // Bordes redondeados
  },
  totalText: {
    fontSize: 10,
    textAlign: "right",
    fontWeight: "bold",
    color: "#2c3e50", // Color oscuro
  },
});

const PedidoPDF = ({ carrito, total }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Título del PDF */}
      <Text style={styles.header}>Resumen del Pedido</Text>

      {/* Tabla de productos */}
      <View style={styles.table}>
        {/* Encabezado de la tabla */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.leftAlign]}>Producto</Text>
          <Text style={[styles.tableCell, styles.priceAlign]}>Precio</Text>
          <Text style={[styles.tableCell, styles.rightAlign]}>Cantidad</Text>
        </View>

        {/* Filas de la tabla */}
        {carrito.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.leftAlign]}>{item.nombre}</Text>
            <Text style={[styles.tableCell, styles.priceAlign]}>B/. {item.precio.replace("B/. ", "")}</Text>
            <Text style={[styles.tableCell, styles.rightAlign]}>{item.cantidad}</Text>
          </View>
        ))}
      </View>

      {/* Total del pedido */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: B/. {total.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);

export default PedidoPDF;