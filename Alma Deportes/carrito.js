// Carrito de compras
let carrito = [];

// Cargar carrito del localStorage al iniciar
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarCarrito(nombre, precio) {
    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }
    
    guardarCarrito();
    alert('¡Producto agregado al carrito! 🛒\n\n' + nombre + ' - $' + precio);
    mostrarResumenCarrito();
}

// Mostrar resumen del carrito en consola (puedes expandir esto)
function mostrarResumenCarrito() {
    console.log('=== CARRITO ===');
    let total = 0;
    carrito.forEach(item => {
        console.log(item.nombre + ' x' + item.cantidad + ' = $' + (item.precio * item.cantidad));
        total += item.precio * item.cantidad;
    });
    console.log('TOTAL: $' + total);
    console.log('===============');
}

// Ver carrito completo
function verCarrito() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    let mensaje = '🛒 TU CARRITO:\n\n';
    let total = 0;
    
    carrito.forEach((item, index) => {
        mensaje += (index + 1) + '. ' + item.nombre + '\n';
        mensaje += '   Cantidad: ' + item.cantidad + '\n';
        mensaje += '   Precio: $' + item.precio + '\n';
        mensaje += '   Subtotal: $' + (item.precio * item.cantidad) + '\n\n';
        total += item.precio * item.cantidad;
    });
    
    mensaje += '━━━━━━━━━━━━━━━━\n';
    mensaje += 'TOTAL: $' + total;
    
    alert(mensaje);
}

// Vaciar carrito
function vaciarCarrito() {
    if (confirm('¿Estás segura que querés vaciar el carrito?')) {
        carrito = [];
        guardarCarrito();
        alert('Carrito vaciado');
    }
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    
    if (confirm('¿Confirmar compra por $' + total + '?')) {
        alert('¡Gracias por tu compra! 💜\n\nTotal: $' + total + '\n\nNos contactaremos pronto para coordinar el pago y envío.');
        carrito = [];
        guardarCarrito();
    }
}

// Cargar el carrito al iniciar
cargarCarrito();