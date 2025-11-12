import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../contexto/CarritoContexto';

const Encabezado = () => {
  const { verCarrito, obtenerCantidadTotal } = useCarrito();
  const cantidadTotal = obtenerCantidadTotal();

  return (
    <header>
      <div className="encabezado">
        <ul>
          <li className="links">
            <Link to="/">
              <img src="/imagenes/alma.png" alt="Logo" width="70" height="70" />
            </Link>
          </li>
          <strong>
            <li className="links">
              <Link to="/categorias">Categorias</Link>
            </li>
            <li className="links">
              <Link to="/ofertas">Ofertas</Link>
            </li>
            <li className="links">
              <Link to="/ubicacion">Ubicación</Link>
            </li>
            <li className="links">
              <Link to="/ayuda">Ayuda</Link>
            </li>
          </strong>
          <li className="iconos">
            <Link to="/">
              <img src="/imagenes/casa.png" alt="Home" width="30" height="30" />
            </Link>
          </li>
          <li className="iconos">
            <Link to="/login">
              <img src="/imagenes/usuario.png" alt="Usuario" width="30" height="30" />
            </Link>
          </li>
          <li className="iconos" style={{ position: 'relative', cursor: 'pointer' }}>
            <div onClick={verCarrito}>
              🛒
              {cantidadTotal > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {cantidadTotal}
                </span>
              )}
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Encabezado;