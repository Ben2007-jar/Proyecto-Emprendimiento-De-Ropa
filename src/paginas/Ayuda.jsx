import React, { useState } from 'react';

const ItemFAQ = ({ pregunta, respuesta }) => {
  const [activo, setActivo] = useState(false);

  return (
    <div className={`faq-item ${activo ? 'active' : ''}`}>
      <div className="faq-question" onClick={() => setActivo(!activo)}>
        <h3>{pregunta}</h3>
        <div className="faq-toggle">+</div>
      </div>
      <div className="faq-answer">
        <p>{respuesta}</p>
      </div>
    </div>
  );
};

const Ayuda = () => {
  const preguntas = [
    {
      pregunta: '¿Qué métodos de pago manejan?',
      respuesta: 'Para facilitar tu compra, aceptamos transferencia bancaria (Ej: Mercado pago, Personal pay, MODO, Uala, etc), pago en efectivo al recibir tu pedido y pagos con tarjeta de crédito o débito directamente en nuestra plataforma.'
    },
    {
      pregunta: '¿Cómo me hago cliente fiel?',
      respuesta: 'Haciendo mas de una compra en distintas ocasiones podes acceder a beneficios exclusivos: descuentos especiales del 10% al 15% y promociones personalizadas.'
    },
    {
      pregunta: '¿Qué marcas trabajan?',
      respuesta: 'Trabajamos con las mejores marcas nacionales de indumentaria deportiva: Newod Sport, Badaka, Ladyfit, Serery, Vitnik, HIDRAQUEEN, entre otras. ¡Calidad garantizada!'
    },
    {
      pregunta: '¿Puedo cambiar una prenda?',
      respuesta: 'Sí, tenés 15 días para cambiar tu prenda por otro talle o modelo. Solo necesitás traer el ticket de compra y la prenda en perfecto estado sin uso.'
    },
    {
      pregunta: '¿Tienen talles grandes?',
      respuesta: '¡Sí! Contamos con variedad de talles desde S/1 hasta talles especiales como XXXL/6 en todas nuestras prendas.'
    },
    {
      pregunta: '¿Qué métodos de pago aceptan?',
      respuesta: 'Aceptamos todos los medios de pago: efectivo, tarjetas de débito y crédito, transferencias bancarias, link de pago y QR de Mercado Pago.'
    }
  ];

  return (
    <main>
      <h1>PREGUNTAS FRECUENTES</h1>
      
      <div className="faq-contenedor">
        <div className="faq-desplegable">
          {preguntas.map((faq, index) => (
            <ItemFAQ 
              key={index}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Ayuda;