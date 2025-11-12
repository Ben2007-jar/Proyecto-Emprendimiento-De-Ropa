import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProveedorCarrito } from './contexto/CarritoContexto';
import Encabezado from './componentes/Encabezado';
import Inicio from './paginas/Inicio';
import Categorias from './paginas/Categorias';
import ListaProductos from './paginas/ListaProductos';
import Ofertas from './paginas/Ofertas';
import Ubicacion from './paginas/Ubicacion';
import Ayuda from './paginas/Ayuda';
import Login from './paginas/Login';
import './App.css';

function App() {
  return (
    <ProveedorCarrito>
      <Router>
        <div className="App">
          <Encabezado />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/productos/:categoria" element={<ListaProductos />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/ubicacion" element={<Ubicacion />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </ProveedorCarrito>
  );
}

export default App;