import React from 'react';
import TarjetaProducto from '../componentes/TarjetaProducto';
import { ofertas } from '../datos/productos';

const Ofertas = () => {
  return (
    <main>
      <h1>OFERTAS ESPECIALES 🔥</h1>
      <br />
      <div className="ofertas-banner">
        <h2>¡SUPER DESCUENTOS!</h2>
        <p>Hasta 30% OFF en productos seleccionados</p>
      </div>

      <div className="productos-container">
        {ofertas.map(producto => (
          <TarjetaProducto 
            key={producto.id} 
            producto={producto} 
            esOferta={true}
          />
        ))}
      </div>
    </main>
  );
};

export default Ofertas;