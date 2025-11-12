import React, { createContext, useState, useContext, useEffect } from 'react';

const CarritoContexto = createContext();

export const useCarrito = () => {
  const contexto = useContext(CarritoContexto);
  if (!contexto) {
    throw new Error('usarCarrito debe usarse dentro de ProveedorCarrito');
  }
  return contexto;
};

export const ProveedorCarrito = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito(carritoAnterior => {
      const productoExistente = carritoAnterior.find(item => item.nombre === producto.nombre);
      
      if (productoExistente) {
        return carritoAnterior.map(item =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      
      return [...carritoAnterior, { ...producto, cantidad: 1 }];
    });

    alert(`¡Producto agregado al carrito! 🛒\n\n${producto.nombre} - $${producto.precio.toLocaleString()}`);
  };

  const eliminarDelCarrito = (nombreProducto) => {
    setCarrito(carritoAnterior => 
      carritoAnterior.filter(item => item.nombre !== nombreProducto)
    );
  };

  const actualizarCantidad = (nombreProducto, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(nombreProducto);
      return;
    }
    
    setCarrito(carritoAnterior =>
      carritoAnterior.map(item =>
        item.nombre === nombreProducto
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const vaciarCarrito = () => {
    if (window.confirm('¿Estás segura que querés vaciar el carrito?')) {
      setCarrito([]);
      alert('Carrito vaciado');
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    const total = calcularTotal();
    if (window.confirm(`¿Confirmar compra por $${total.toLocaleString()}?`)) {
      alert(`¡Gracias por tu compra! 💜\n\nTotal: $${total.toLocaleString()}\n\nNos contactaremos pronto para coordinar el pago y envío.`);
      setCarrito([]);
    }
  };

  const verCarrito = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    
    let mensaje = '🛒 TU CARRITO:\n\n';
    let total = 0;
    
    carrito.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.nombre}\n`;
      mensaje += `   Cantidad: ${item.cantidad}\n`;
      mensaje += `   Precio: $${item.precio.toLocaleString()}\n`;
      mensaje += `   Subtotal: $${(item.precio * item.cantidad).toLocaleString()}\n\n`;
      total += item.precio * item.cantidad;
    });
    
    mensaje += '━━━━━━━━━━━━━━━━\n';
    mensaje += `TOTAL: $${total.toLocaleString()}`;
    
    alert(mensaje);
  };

  return (
    <CarritoContexto.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
      calcularTotal,
      obtenerCantidadTotal,
      finalizarCompra,
      verCarrito
    }}>
      {children}
    </CarritoContexto.Provider>
  );
};