import React, { useState } from "react";

function PaymentButton({ totalPrice, onPayment }) {
  const [paymentOption, setPaymentOption] = useState(null); // 'full' o 'partial'

  const handlePayment = () => {
    // Aquí iría la integración con la pasarela de pago real
    // Por ahora, simulamos el pago
    if (paymentOption === "full") {
      onPayment(totalPrice, "full");
      alert(`Pago completo realizado: B/. ${totalPrice}`);
    } else if (paymentOption === "partial") {
      const minimumPartialPayment = totalPrice / 2;
      const partialPayment = parseFloat(
        prompt(
          `Ingrese el monto del abono (mínimo B/. ${minimumPartialPayment.toFixed(
            2
          )}):`
        )
      );

      if (
        partialPayment >= minimumPartialPayment &&
        partialPayment <= totalPrice
      ) {
        onPayment(partialPayment, "partial");
        alert(`Abono realizado: B/. ${partialPayment.toFixed(2)}`);
      } else {
        alert(
          "El monto del abono debe ser superior a la mitad del total y menor o igual al total."
        );
      }
    }
  };

  return (
    <div className="payment-button">
      {paymentOption === null && (
        <>
          <button
            className="option-button"
            onClick={() => setPaymentOption("full")}
          >
            Pago Completo
          </button>
          <button
            className="option-button"
            onClick={() => setPaymentOption("partial")}
          >
            Abonar
          </button>
        </>
      )}

      {paymentOption !== null && (
        <button className="option-button" onClick={handlePayment}>
          {paymentOption === "full" ? "Pagar" : "Confirmar Abono"} B/.{" "}
          {paymentOption === "full"
            ? totalPrice
            : `(Mínimo B/. ${(totalPrice / 2).toFixed(2)})`}
        </button>
      )}
    </div>
  );
}

export default PaymentButton;