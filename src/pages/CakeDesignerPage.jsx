import React, { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import CakeSizeSelector from "../components/CakeDesigner/CakeSizeSelector";
import CakeFlavorSelector from "../components/CakeDesigner/CakeFlavorSelector";
import IcingDesignSelector from "../components/CakeDesigner/IcingDesignSelector";
import ChantillyDesignSelector from "../components/CakeDesigner/ChantillyDesignSelector";
import ExtraFloorsSelector from "../components/CakeDesigner/ExtraFloorsSelector";
import PickupLocationSelector from "../components/CakeDesigner/PickupLocationSelector";
import OrderSummary from "../components/CakeDesigner/OrderSummary";
import ImageUploader from "../components/CakeDesigner/ImageUploader";
import ChantillyFillingSelector from "../components/CakeDesigner/ChantillyFillingSelector";
import CakeTypeSelectionPage from "../components/CakeDesigner/CakeTypeSelectionPage";
import ChantillyExternalDecorationSelector from "../components/CakeDesigner/ChantillyExternalDecorationSelector";
import "../components/CakeDesigner/CakeDesigner.css";

function CakeDesignerPage() {
  const [cakeType, setCakeType] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [cakeSize, setCakeSize] = useState(null);
  const [cakeFlavor, setCakeFlavor] = useState(null);
  const [icingDesign, setIcingDesign] = useState(null);
  const [chantillyDesign, setChantillyDesign] = useState(null);
  const [extraFloors, setExtraFloors] = useState(0);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [referenceImage, setReferenceImage] = useState(null);
  const [customerNotes, setCustomerNotes] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentType, setPaymentType] = useState(null);
  const [chantillyFilling, setChantillyFilling] = useState(null);
  const [externalDecoration, setExternalDecoration] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showFinalSummary, setShowFinalSummary] = useState(false);

  const maxDesignStep = cakeType === "icing" ? 4 : 6;
  const totalSteps = maxDesignStep + 5;

  const getMinDate = () => {
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + 3));
    return minDate.toISOString().split("T")[0];
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 10; hour <= 20; hour++) {
      for (let minute of ["00", "30"]) {
        if (hour === 20 && minute === "30") break;
        options.push(`${hour.toString().padStart(2, "0")}:${minute}`);
      }
    }
    return options;
  };

  const calculateTotalPrice = () => {
    let price = 0;
    if (cakeType === "icing") {
      if (cakeSize) price += cakeSize.price;
      if (icingDesign) price += icingDesign.price;
    } else if (cakeType === "chantilly") {
      if (cakeSize) price += cakeSize.price;
      if (chantillyDesign) price += chantillyDesign.price;
    }

    if (extraFloors > 0) {
      if (cakeType === "icing") {
        price += extraFloors === 1 ? 40.25 : extraFloors === 2 ? 74.75 : extraFloors === 3 ? 103.5 : extraFloors === 4 ? 138 : 0;
      } else {
        price += extraFloors === 1 ? 12 : extraFloors === 2 ? 24 : extraFloors === 3 ? 40 : extraFloors === 4 ? 50 : 0;
      }
    }
    return price.toFixed(2);
  };

  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(1);
      setShowOrderDetails(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setCakeType(null);
      resetDesign();
    }
  };

  const resetDesign = () => {
    setCakeSize(null);
    setCakeFlavor(null);
    setIcingDesign(null);
    setChantillyDesign(null);
    setExtraFloors(0);
    setPickupLocation(null);
    setOrderDate("");
    setOrderTime("");
    setReferenceImage(null);
    setCustomerNotes("");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setPaymentCompleted(false);
    setPaymentType(null);
    setChantillyFilling(null);
    setExternalDecoration(null);
    setShowOrderDetails(false);
    setShowFinalSummary(false);
  };

  const isStepValid = () => {
    if (currentStep <= maxDesignStep) {
      switch (currentStep) {
        case 1: return cakeSize !== null;
        case 2: return cakeFlavor !== null;
        case 3: return cakeType === "chantilly" ? externalDecoration !== null : icingDesign !== null;
        case 4: return cakeType === "chantilly" ? chantillyFilling !== null : extraFloors !== null;
        case 5: return cakeType === "chantilly" && extraFloors !== null;
        case 6: return cakeType === "chantilly" && chantillyDesign !== null;
        default: return true;
      }
    } else {
      const pickupStep = currentStep - maxDesignStep;
      switch (pickupStep) {
        case 1: return pickupLocation !== null;
        case 2: return orderDate !== "";
        case 3: return orderTime !== "";
        case 4: return referenceImage !== null;
        default: return true;
      }
    }
  };

  const renderStep = () => {
    if (currentStep <= maxDesignStep) {
      switch (currentStep) {
        case 1:
          return <CakeSizeSelector
            cakeType={cakeType}
            flavor={cakeFlavor}
            onSelect={setCakeSize}
            selectedSize={cakeSize}
          />;
        case 2:
          return <CakeFlavorSelector
            cakeType={cakeType}
            onSelect={setCakeFlavor}
            selectedFlavor={cakeFlavor}
          />;
        case 3:
          return cakeType === "chantilly" ? (
            <ChantillyExternalDecorationSelector
              onSelect={setExternalDecoration}
              selectedDecoration={externalDecoration}
            />
          ) : (
            <IcingDesignSelector
              cakeSize={cakeSize}
              onSelect={setIcingDesign}
              selectedDesign={icingDesign}
            />
          );
        case 4:
          return cakeType === "chantilly" ? (
            <ChantillyFillingSelector
              onSelect={setChantillyFilling}
              selectedFilling={chantillyFilling}
            />
          ) : (
            <ExtraFloorsSelector
              onSelect={setExtraFloors}
              cakeType={cakeType}
              selectedFloors={extraFloors}
            />
          );
        case 5:
          return cakeType === "chantilly" && (
            <ExtraFloorsSelector
              onSelect={setExtraFloors}
              cakeType={cakeType}
              selectedFloors={extraFloors}
            />
          );
        case 6:
          return cakeType === "chantilly" && (
            <ChantillyDesignSelector
              cakeSize={cakeSize}
              onSelect={setChantillyDesign}
              selectedDesign={chantillyDesign}
            />
          );
        default:
          return null;
      }
    } else {
      const pickupStep = currentStep - maxDesignStep;
      switch (pickupStep) {
        case 1:
          return (
            <div className="selector">
              <h2>Ubicación de Retiro</h2>
              <PickupLocationSelector
                onSelect={setPickupLocation}
                selectedLocation={pickupLocation}
              />
            </div>
          );
        case 2:
          return (
            <div className="selector">
              <h2>Fecha de Retiro</h2>
              <input
                type="date"
                min={getMinDate()}
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </div>
          );
        case 3:
          return (
            <div className="selector">
              <h2>Hora de Retiro</h2>
              <select
                value={orderTime}
                onChange={(e) => setOrderTime(e.target.value)}
              >
                <option value="">Seleccione una hora</option>
                {generateTimeOptions().map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          );
        case 4:
          return (
            <div className="selector">
              <h2>Imagen de Referencia</h2>
              <ImageUploader
                onImageSelect={file => {
                  const reader = new FileReader();
                  reader.onload = e => setReferenceImage(e.target.result);
                  reader.readAsDataURL(file);
                }}
              />
            </div>
          );
        case 5:
          return (
            <div className="selector">
              <h2>Observaciones</h2>
              <textarea
                value={customerNotes}
                onChange={e => setCustomerNotes(e.target.value)}
                placeholder="Detalles adicionales..."
              />
            </div>
          );
        default:
          return null;
      }
    }
  };

  const handleFinalize = () => {
    setShowOrderDetails(false);
    setShowFinalSummary(true);
  };

  const handleModifyDesign = () => {
    setShowOrderDetails(false);
    setCurrentStep(1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPosition = margin;
  
    // Logo de la empresa
    try {
      const logoUrl = '/logo.png';
      doc.addImage(logoUrl, 'PNG', 
          pageWidth/2 - 25, // Centrado horizontal
          yPosition,
          50,  // Ancho
          15   // Alto
      );
      yPosition += 25;
    } catch (error) {
      console.error("Error cargando logo:", error);
    }
  
    // Configuración de texto
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Resumen del Pedido - Panadería Spigolo", margin, yPosition);
    yPosition += 12;
  
    // Función mejorada para secciones
    const addSection = (title, items) => {
      const validItems = items.filter(item => {
        const value = item.value;
        return value !== undefined && 
               value !== null && 
               value !== "" && 
               value !== "No aplica" &&
               value !== "No seleccionado";
      });
  
      if(validItems.length === 0) return;
  
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(title + ":", margin, yPosition);
      yPosition += 7;
  
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      validItems.forEach(item => {
        const text = `• ${item.label}: ${item.value}`;
        if(yPosition > 250) return;
        doc.text(text, margin + 5, yPosition);
        yPosition += 7;
      });
      yPosition += 8;
    };
  
    // Sección de detalles del pastel (CORREGIDO)
    addSection("Detalles del pastel", [
      { 
        label: "Tipo", 
        value: cakeType === 'icing' ? 'Fondant' : 'Chantilly' 
      },
      { 
        label: "Tamaño", 
        value: cakeSize?.name || 'No seleccionado' 
      },
      { 
        label: "Sabor del Bizcocho", 
        value: cakeFlavor || 'No seleccionado' // Usamos cakeFlavor directamente
      },
      { 
        label: "Diseño", 
        value: icingDesign?.name || chantillyDesign?.name || 'No seleccionado' 
      },
      { 
        label: "Pisos extra", 
        value: extraFloors > 0 ? `${extraFloors} pisos` : 'Ninguno' 
      },
      { 
        label: "Relleno", 
        value: (chantillyFilling && chantillyFilling.name) ? chantillyFilling.name : 'No aplica' 
      },
      { 
        label: "Decoración Externa", 
        value: externalDecoration || 'No aplica' 
      }
    ]);
  
    // Imagen de referencia (versión mejorada)
    if (referenceImage) {
      try {
        const imgProps = doc.getImageProperties(referenceImage);
        const maxWidth = pageWidth - (margin * 2);
        const maxHeight = 60;
        
        const ratio = Math.min(maxWidth / imgProps.width, maxHeight / imgProps.height);
        const finalWidth = imgProps.width * ratio;
        const finalHeight = imgProps.height * ratio;
  
        doc.addImage(
          referenceImage,
          'JPEG',
          pageWidth/2 - finalWidth/2, // Centrado exacto
          yPosition,
          finalWidth,
          finalHeight,
          undefined,
          'FAST'
        );
        
        yPosition += finalHeight + 10;
      } catch (error) {
        console.error("Error con la imagen:", error);
      }
    }
  
    // Sección de retiro (CORREGIDO)
    addSection("Información de Retiro", [
      { 
        label: "Sucursal", 
        value: pickupLocation || 'No seleccionada' // Usamos pickupLocation directamente
      },
      { 
        label: "Fecha", 
        value: orderDate || 'No especificada' 
      },
      { 
        label: "Hora", 
        value: orderTime || 'No especificada' 
      }
    ]);
  
    // Sección de cliente
    addSection("Datos del Cliente", [
      { 
        label: "Nombre", 
        value: customerName || 'No proporcionado' 
      },
      { 
        label: "Teléfono", 
        value: customerPhone || 'No proporcionado' 
      },
      { 
        label: "Email", 
        value: customerEmail || 'No proporcionado' 
      },
      { 
        label: "Observaciones", 
        value: customerNotes || 'Ninguna' 
      }
    ]);
  
    // Precio total
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Precio Total: B/. ${calculateTotalPrice()}`, margin, yPosition + 10);
  
    // Guardar PDF
    doc.save(`Pedido_${customerName}_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div className="cake-designer-page">
      {!cakeType ? (
        <CakeTypeSelectionPage onSelectCakeType={setCakeType} />
      ) : (
        <>
          <h1 className="main-title">Diseña el pastel perfecto para tus momentos especiales</h1>

          {!showOrderDetails && !showFinalSummary ? (
            <div className="designer-container">
              <div className="selectors-column-chantilly">
                {renderStep()}
              </div>

              <div className="summary-column">
                <OrderSummary
                  cakeType={cakeType}
                  cakeSize={cakeSize}
                  cakeFlavor={cakeFlavor}
                  icingDesign={icingDesign}
                  chantillyDesign={chantillyDesign}
                  extraFloors={extraFloors}
                  pickupLocation={pickupLocation}
                  totalPrice={calculateTotalPrice()}
                  orderDate={orderDate}
                  orderTime={orderTime}
                  chantillyFilling={chantillyFilling}
                  externalDecoration={externalDecoration}
                />
                <div className="total-price">
                  <h2>Precio Total:</h2>
                  <p>B/. {calculateTotalPrice()}</p>
                </div>

                <div className="navigation-buttons">
                  <button className="back-button" onClick={handleBack}>
                    {currentStep === 1 ? "Cambiar Tipo" : "Atrás"}
                  </button>
                  <button 
                    className="continue-button" 
                    onClick={handleContinue}
                    disabled={!isStepValid()}
                  >
                    {currentStep === totalSteps ? "Finalizar Diseño" : "Continuar"}
                  </button>
                </div>
              </div>
            </div>
          ) : showFinalSummary ? (
            <div className="final-summary-container">
              <h2 className="final-summary-title">Resumen Final del Pedido</h2>
              
              {referenceImage && (
                <div className="reference-image-container">
                  <h3>Imagen de Referencia:</h3>
                  <img src={referenceImage} alt="Referencia del pastel" className="final-reference-image" />
                </div>
              )}

              <OrderSummary
                cakeType={cakeType}
                cakeSize={cakeSize}
                cakeFlavor={cakeFlavor}
                icingDesign={icingDesign}
                chantillyDesign={chantillyDesign}
                extraFloors={extraFloors}
                pickupLocation={pickupLocation}
                totalPrice={calculateTotalPrice()}
                orderDate={orderDate}
                orderTime={orderTime}
                chantillyFilling={chantillyFilling}
                externalDecoration={externalDecoration}
                customerNotes={customerNotes}
              />
              
              <div className="customer-data-final">
                <h3>Datos del Cliente</h3>
                <p><strong>Nombre:</strong> {customerName}</p>
                <p><strong>Teléfono:</strong> {customerPhone}</p>
                <p><strong>Correo:</strong> {customerEmail}</p>
                {customerNotes && <p><strong>Observaciones:</strong> {customerNotes}</p>}
              </div>

              <div className="final-action-buttons">
                <button className="email-button" onClick={handleSendEmail}>
                  Descargar PDF
                </button>
                <button className="print-button" onClick={handlePrint}>
                  Imprimir
                </button>
                <button className="back-button" onClick={() => {
                  setShowFinalSummary(false);
                  setShowOrderDetails(true);
                }}>
                  Modificar Pedido
                </button>
              </div>

              <p className="final-instructions">
                Su pedido será confirmado para elaboración. Recibirá una respuesta por correo electrónico o WhatsApp. 
                En caso de ser positivo, se le brindará un enlace a la pasarela de pago.
              </p>
            </div>
          ) : (
            <div className="order-details-container">
              <div className="designer-container">
                <div className="summary-column">
                  <OrderSummary
                    cakeType={cakeType}
                    cakeSize={cakeSize}
                    cakeFlavor={cakeFlavor}
                    icingDesign={icingDesign}
                    chantillyDesign={chantillyDesign}
                    extraFloors={extraFloors}
                    pickupLocation={pickupLocation}
                    totalPrice={calculateTotalPrice()}
                    orderDate={orderDate}
                    orderTime={orderTime}
                    chantillyFilling={chantillyFilling}
                    externalDecoration={externalDecoration}
                  />
                  
                  <div className="customer-info-form">
                    <h2>Información del Cliente</h2>
                    <div className="form-group">
                      <label>Nombre completo:</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Teléfono:</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Correo electrónico:</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={e => setCustomerEmail(e.target.value)}
                      />
                    </div>

                    <div className="action-buttons">
                      <button className="modify-button" onClick={handleModifyDesign}>Modificar Diseño</button>
                      {pickupLocation && orderDate && orderTime && customerName && customerPhone && customerEmail && (
                        <button className="finalize-button" onClick={handleFinalize}>Generar Pedido</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CakeDesignerPage;