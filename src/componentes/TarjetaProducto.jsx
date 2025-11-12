import React from 'react';
import { useCarrito } from '../contexto/CarritoContexto';

const TarjetaProducto = ({ producto, esOferta = false }) => {
  const { agregarAlCarrito } = useCarrito();

  const manejarAgregar = () => {
    agregarAlCarrito(producto);
  };

  return (
    <div className="card">
      {esOferta && producto.descuento && (
        <div className="etiqueta-oferta">-{producto.descuento}% OFF</div>
      )}
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="card-body">
        <h2 className="card-title">{producto.nombre}</h2>
        {esOferta && producto.precioAnterior && (
          <p className="precio-anterior">${producto.precioAnterior.toLocaleString()}</p>
        )}
        <p className="card-text">
          <strong>${producto.precio.toLocaleString()}</strong>
        </p>
        <button onClick={manejarAgregar}>
          <strong>Agregar al carrito</strong>
        </button>
      </div>
    </div>
  );
};

export default TarjetaProducto;