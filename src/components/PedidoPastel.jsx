import React from "react";

function PedidoPastel({ pedido, onConfirmarPedido }) {
  const { tipo, size, flavor, decor, precioBase, decoracionPrecio } = pedido;

  // Calcular el costo total del pedido
  const costoTotal = precioBase + (decoracionPrecio || 0);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Resumen del Pedido</h2>

      {tipo && (
        <>
          <p className="text-gray-700">
            <strong>Tipo de pastel:</strong> {tipo}
          </p>
          <p className="text-gray-700">
            <strong>Tamaño:</strong> {size}
          </p>
          <p className="text-gray-700">
            <strong>Sabor:</strong> {flavor}
          </p>
          <p className="text-gray-700">
            <strong>Decoración:</strong> {decor ? `${decor} (+ B/. ${decoracionPrecio})` : "Sin decoración"}
          </p>
          <p className="text-lg font-semibold text-green-600 mt-4">
            Costo Total: B/. {costoTotal.toFixed(2)}
          </p>

          {/* Botón para confirmar el pedido */}
          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl w-full"
            onClick={() => onConfirmarPedido(costoTotal)}
          >
            Confirmar Pedido y Proceder al Pago
          </button>
        </>
      )}

      {!tipo && <p className="text-gray-500">Aún no has diseñado tu pastel.</p>}
    </div>
  );
}

export default PedidoPastel;
