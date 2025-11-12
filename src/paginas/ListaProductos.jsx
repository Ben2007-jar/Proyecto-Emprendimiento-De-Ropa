import React from 'react';
import { useParams } from 'react-router-dom';
import TarjetaProducto from '../componentes/TarjetaProducto';
import { productos, categorias } from '../datos/productos';

const ListaProductos = () => {
  const { categoria } = useParams();
  const productosCategoria = productos[categoria] || [];
  const nombreCategoria = categorias.find(c => c.id === categoria)?.nombre || categoria;

  return (
    <main>
      <h1>{nombreCategoria.toUpperCase()}</h1>
      <br />
      <div className="productos-container">
        {productosCategoria.map(producto => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
};

export default ListaProductos;