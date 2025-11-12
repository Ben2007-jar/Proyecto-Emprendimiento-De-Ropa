import React from 'react';
import { Link } from 'react-router-dom';
import { categorias } from '../datos/productos';

const Categorias = () => {
  return (
    <main>
      <h1>NUESTRAS CATEGORIAS</h1>
      <br />
      <div className="productos-container">
        {categorias.map(categoria => (
          <div key={categoria.id} className="card">
            <img src={categoria.imagen} alt={categoria.nombre} />
            <div className="card-body">
              <h2 className="card-title">{categoria.nombre}</h2>
              <button>
                <Link to={`/productos/${categoria.id}`}>
                  <strong>Ver categoria</strong>
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Categorias;