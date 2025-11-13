# Manual del Sistema - Alma Deporte
## Sistema de Gestión de Ventas de Indumentaria Deportiva

---

## Tabla de Contenidos
- [1. Introducción](#1-introducción)
- [2. Arquitectura del Sistema](#2-arquitectura-del-sistema)
- [3. Base de Datos](#3-base-de-datos)
- [4. Estructura del Código](#4-estructura-del-código)
- [5. Componentes Principales](#5-componentes-principales)
- [6. Interfaces y Conexiones](#6-interfaces-y-conexiones)
- [7. Seguridad](#7-seguridad)
- [8. Procesos del Sistema](#8-procesos-del-sistema)
- [9. Instalación y Configuración](#9-instalación-y-configuración)
- [10. Mantenimiento](#10-mantenimiento)
- [11. Solución de Problemas](#11-solución-de-problemas)
- [12. Anexos](#12-anexos)

---

## 1. Introducción

### 1.1 Propósito del Manual
Este manual técnico describe la arquitectura, funcionamiento y mantenimiento del sistema de gestión de ventas desarrollado para "Alma Deporte", un emprendimiento de indumentaria deportiva femenina.

### 1.2 Alcance del Sistema
El sistema abarca desde el contacto con el cliente hasta la entrega del pedido, incluyendo:
- Gestión de ventas (local y online)
- Control de inventario y stock
- Administración de pedidos
- Gestión de proveedores
- Emisión de comprobantes

### 1.3 Audiencia
Este manual está dirigido a:
- Desarrolladores del sistema
- Administradores técnicos
- Personal de mantenimiento IT
- Futuros desarrolladores que necesiten modificar el sistema

### 1.4 Tecnologías Utilizadas
- **Lenguaje**: Java / PHP / JavaScript (especificar)
- **Base de Datos**: MySQL (XAMPP)
- **Frontend**: HTML5, CSS3, JavaScript
- **Servidor**: Apache
- **Control de Versiones**: Git/GitHub
- **Gestión de Proyecto**: Trello (Kanban)

---

## 2. Arquitectura del Sistema

### 2.1 Descripción General
El sistema implementa una arquitectura de tres capas:

```
┌─────────────────────────────────┐
│     CAPA DE PRESENTACIÓN        │
│  (Interfaz Web - HTML/CSS/JS)   │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│      CAPA DE LÓGICA             │
│   (Controladores - Java/PHP)    │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│      CAPA DE DATOS              │
│        (MySQL/XAMPP)            │
└─────────────────────────────────┘
```

### 2.2 Componentes Principales
1. **Frontend**: Páginas web interactivas (Home, Categorías, Ofertas, Login, Ubicación)
2. **Backend**: Controladores y lógica de negocio
3. **Base de Datos**: Almacenamiento persistente de datos
4. **Sistema de Archivos**: Imágenes de productos, logos

### 2.3 Patrones de Diseño
- **MVC (Modelo-Vista-Controlador)**: Separación de responsabilidades
- **DAO (Data Access Object)**: Abstracción de acceso a datos
- **Singleton**: Conexión única a la base de datos

---

## 3. Base de Datos

### 3.1 Diagrama Entidad-Relación (DER)
*(Incluir imagen del MER/DER del documento)*

### 3.2 Esquema de Base de Datos

#### Tabla: CLIENTES
```sql
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    ciudad VARCHAR(50),
    codigo_postal VARCHAR(10),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    cliente_fiel BOOLEAN DEFAULT FALSE
);
```

| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| id_cliente | INT | PK, AUTO_INCREMENT | Identificador único del cliente |
| nombre | VARCHAR(100) | NOT NULL | Nombre del cliente |
| apellido | VARCHAR(100) | NOT NULL | Apellido del cliente |
| email | VARCHAR(100) | UNIQUE, NOT NULL | Correo electrónico |
| telefono | VARCHAR(20) | - | Teléfono de contacto |
| direccion | TEXT | - | Dirección de entrega |
| ciudad | VARCHAR(50) | - | Ciudad de residencia |
| codigo_postal | VARCHAR(10) | - | Código postal |
| fecha_registro | DATETIME | DEFAULT NOW | Fecha de registro |
| cliente_fiel | BOOLEAN | DEFAULT FALSE | Indica si tiene beneficios |

#### Tabla: PRODUCTOS
```sql
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categoria VARCHAR(50),
    talla VARCHAR(10),
    color VARCHAR(30),
    marca VARCHAR(50),
    imagen_url VARCHAR(255),
    fecha_ingreso DATE,
    en_oferta BOOLEAN DEFAULT FALSE,
    precio_oferta DECIMAL(10,2)
);
```

#### Tabla: VENTAS
```sql
CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('efectivo', 'tarjeta', 'qr', 'transferencia', 'link_pago') NOT NULL,
    tipo_venta ENUM('local', 'online') NOT NULL,
    estado ENUM('pendiente', 'completada', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);
```

#### Tabla: DETALLE_VENTA
```sql
CREATE TABLE detalle_venta (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_producto INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);
```

#### Tabla: PROVEEDORES
```sql
CREATE TABLE proveedores (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_empresa VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    sitio_web VARCHAR(150)
);
```

#### Tabla: PEDIDOS
```sql
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    direccion_entrega TEXT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega_estimada DATE,
    estado_pedido ENUM('preparando', 'enviado', 'entregado', 'cancelado') DEFAULT 'preparando',
    notas TEXT,
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta)
);
```

#### Tabla: RESEÑAS
```sql
CREATE TABLE reseñas (
    id_reseña INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    id_cliente INT,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha_reseña DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);
```

### 3.3 Relaciones entre Tablas
- **CLIENTES → VENTAS**: Un cliente puede realizar muchas ventas (1:N)
- **VENTAS → DETALLE_VENTA**: Una venta contiene muchos detalles (1:N)
- **PRODUCTOS → DETALLE_VENTA**: Un producto puede estar en muchos detalles (1:N)
- **VENTAS → PEDIDOS**: Una venta puede generar un pedido (1:1)
- **PRODUCTOS → RESEÑAS**: Un producto puede tener muchas reseñas (1:N)
- **CLIENTES → RESEÑAS**: Un cliente puede hacer muchas reseñas (1:N)

### 3.4 Procedimientos Almacenados

#### Actualizar Stock después de Venta
```sql
DELIMITER //
CREATE PROCEDURE actualizar_stock_venta(
    IN p_id_producto INT,
    IN p_cantidad INT
)
BEGIN
    UPDATE productos 
    SET stock = stock - p_cantidad 
    WHERE id_producto = p_id_producto;
END //
DELIMITER ;
```

#### Calcular Total de Venta
```sql
DELIMITER //
CREATE PROCEDURE calcular_total_venta(IN p_id_venta INT)
BEGIN
    UPDATE ventas v
    SET v.total = (
        SELECT SUM(subtotal)
        FROM detalle_venta
        WHERE id_venta = p_id_venta
    )
    WHERE v.id_venta = p_id_venta;
END //
DELIMITER ;
```

---

## 4. Estructura del Código

### 4.1 Organización de Carpetas
```
alma-deporte/
│
├── src/
│   ├── controllers/        # Controladores de negocio
│   ├── models/            # Modelos de datos
│   ├── dao/               # Acceso a datos
│   ├── services/          # Servicios de negocio
│   └── utils/             # Utilidades y helpers
│
├── web/
│   ├── css/               # Hojas de estilo
│   ├── js/                # Scripts JavaScript
│   ├── images/            # Imágenes y recursos
│   ├── pages/             # Páginas HTML
│   └── index.html         # Página principal
│
├── database/
│   ├── schema.sql         # Esquema de BD
│   ├── data.sql           # Datos de prueba
│   └── procedures.sql     # Procedimientos almacenados
│
├── config/
│   └── database.config    # Configuración de BD
│
├── docs/
│   ├── manual_usuario.md
│   └── manual_sistema.md
│
└── README.md
```

### 4.2 Convenciones de Nomenclatura

#### Java
- **Clases**: PascalCase → `ClienteController`, `VentaService`
- **Métodos**: camelCase → `registrarVenta()`, `actualizarStock()`
- **Variables**: camelCase → `idCliente`, `totalVenta`
- **Constantes**: UPPER_SNAKE_CASE → `MAX_STOCK`, `PRECIO_MINIMO`

#### Base de Datos
- **Tablas**: minúsculas, plural → `clientes`, `productos`
- **Columnas**: snake_case → `id_cliente`, `fecha_venta`
- **Claves foráneas**: `id_tabla` → `id_cliente`, `id_producto`

---

## 5. Componentes Principales

### 5.1 Módulo de Gestión de Clientes

#### Archivos
- `ClienteController.java` / `cliente.controller.php`
- `ClienteDAO.java` / `cliente.dao.php`
- `Cliente.java` / `Cliente.class.php`

#### Métodos Principales

```java
public class ClienteController {
    
    // Registrar nuevo cliente
    public boolean registrarCliente(Cliente cliente) {
        // Validar datos
        // Verificar email único
        // Insertar en BD
        // Retornar resultado
    }
    
    // Buscar cliente por ID
    public Cliente buscarClientePorId(int id) {
        // Consultar BD
        // Retornar objeto Cliente
    }
    
    // Actualizar datos de cliente
    public boolean actualizarCliente(Cliente cliente) {
        // Validar datos
        // Actualizar en BD
        // Retornar resultado
    }
    
    // Verificar si es cliente fiel
    public boolean esClienteFiel(int idCliente) {
        // Contar número de compras
        // Retornar true si >= 5 compras
    }
}
```

### 5.2 Módulo de Gestión de Productos

#### Archivos
- `ProductoController.java`
- `ProductoDAO.java`
- `Producto.java`

#### Métodos Principales

```java
public class ProductoController {
    
    // Listar todos los productos
    public List<Producto> listarProductos() {
        // Consultar BD
        // Retornar lista
    }
    
    // Buscar productos por categoría
    public List<Producto> buscarPorCategoria(String categoria) {
        // Filtrar por categoría
        // Retornar lista
    }
    
    // Verificar stock disponible
    public boolean verificarStock(int idProducto, int cantidad) {
        // Consultar stock actual
        // Comparar con cantidad solicitada
        // Retornar disponibilidad
    }
    
    // Actualizar stock
    public boolean actualizarStock(int idProducto, int cantidad) {
        // Verificar stock suficiente
        // Restar cantidad
        // Actualizar en BD
    }
    
    // Obtener productos en oferta
    public List<Producto> obtenerOfertas() {
        // Filtrar productos con en_oferta = true
        // Retornar lista
    }
}
```

### 5.3 Módulo de Gestión de Ventas

#### Archivos
- `VentaController.java`
- `VentaDAO.java`
- `Venta.java`
- `DetalleVenta.java`

#### Métodos Principales

```java
public class VentaController {
    
    // Registrar nueva venta
    public int registrarVenta(Venta venta) {
        // Iniciar transacción
        // Insertar venta
        // Insertar detalles de venta
        // Actualizar stock de productos
        // Calcular total
        // Commit transacción
        // Retornar ID de venta
    }
    
    // Calcular total de venta
    public double calcularTotal(List<DetalleVenta> detalles) {
        // Sumar subtotales
        // Aplicar descuentos si es cliente fiel
        // Retornar total
    }
    
    // Generar ticket de compra
    public String generarTicket(int idVenta) {
        // Obtener datos de venta
        // Formatear ticket
        // Retornar string con ticket
    }
    
    // Procesar pago
    public boolean procesarPago(int idVenta, String metodoPago) {
        // Validar método de pago
        // Actualizar estado de venta
        // Generar comprobante
        // Retornar resultado
    }
}
```

### 5.4 Módulo de Gestión de Pedidos

#### Archivos
- `PedidoController.java`
- `PedidoDAO.java`
- `Pedido.java`

#### Métodos Principales

```java
public class PedidoController {
    
    // Crear pedido desde venta online
    public int crearPedido(Pedido pedido) {
        // Validar venta asociada
        // Insertar pedido
        // Calcular fecha estimada de entrega
        // Retornar ID de pedido
    }
    
    // Actualizar estado del pedido
    public boolean actualizarEstado(int idPedido, String nuevoEstado) {
        // Validar estado
        // Actualizar en BD
        // Notificar al cliente (opcional)
        // Retornar resultado
    }
    
    // Consultar pedidos pendientes
    public List<Pedido> obtenerPedidosPendientes() {
        // Filtrar por estado 'preparando' o 'enviado'
        // Retornar lista
    }
}
```

---

## 6. Interfaces y Conexiones

### 6.1 Conexión a Base de Datos

#### Configuración (config/database.config)
```properties
db.host=localhost
db.port=3306
db.name=alma_deporte
db.user=root
db.password=
db.driver=com.mysql.cj.jdbc.Driver
```

#### Clase de Conexión (Java)
```java
public class DatabaseConnection {
    private static DatabaseConnection instance;
    private Connection connection;
    
    private DatabaseConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/alma_deporte",
                "root",
                ""
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
    
    public Connection getConnection() {
        return connection;
    }
}
```

### 6.2 APIs y Servicios Externos
- **Mapas**: Google Maps API (para mostrar ubicación de la tienda)
- **Pagos**: MercadoPago API / Stripe (para pagos con QR y link de pago)
- **Email**: JavaMail / PHPMailer (para enviar confirmaciones de pedidos)

---

## 7. Seguridad

### 7.1 Autenticación
- Sistema de login con usuario y contraseña
- Contraseñas encriptadas con hash (SHA-256 o bcrypt)
- Sesiones con timeout de 30 minutos de inactividad

```java
public class SecurityUtil {
    
    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            return null;
        }
    }
    
    public static boolean verificarPassword(String password, String hash) {
        return hashPassword(password).equals(hash);
    }
}
```

### 7.2 Validación de Datos
- Validación de email con expresiones regulares
- Sanitización de entradas para prevenir SQL Injection
- Validación de tipos de datos en el backend

```java
public class Validator {
    
    public static boolean validarEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(regex);
    }
    
    public static String sanitizeInput(String input) {
        // Remover caracteres especiales peligrosos
        return input.replaceAll("[<>\"']", "");
    }
}
```

### 7.3 Prepared Statements
```java
public boolean insertarCliente(Cliente cliente) {
    String sql = "INSERT INTO clientes (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)";
    
    try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
        pstmt.setString(1, cliente.getNombre());
        pstmt.setString(2, cliente.getApellido());
        pstmt.setString(3, cliente.getEmail());
        pstmt.setString(4, cliente.getTelefono());
        
        return pstmt.executeUpdate() > 0;
    } catch (SQLException e) {
        e.printStackTrace();
        return false;
    }
}
```

---

## 8. Procesos del Sistema

### 8.1 Proceso de Venta Local

```
┌─────────────────┐
│ Cliente llega   │
│ al local        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Selecciona      │
│ productos       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Vendedor verifica│
│ stock disponible │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Cliente elige   │
│ método de pago  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Sistema procesa │
│ el pago         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Actualiza stock │
│ en BD           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Genera ticket   │
│ de compra       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Entrega producto│
│ y ticket        │
└─────────────────┘
```

**Código del Proceso:**
```java
public void procesarVentaLocal(int idCliente, List<ItemVenta> items, String metodoPago) {
    // 1. Verificar stock
    for (ItemVenta item : items) {
        if (!verificarStock(item.getIdProducto(), item.getCantidad())) {
            throw new StockInsuficienteException();
        }
    }
    
    // 2. Crear venta
    Venta venta = new Venta();
    venta.setIdCliente(idCliente);
    venta.setMetodoPago(metodoPago);
    venta.setTipoVenta("local");
    
    int idVenta = ventaDAO.insertar(venta);
    
    // 3. Insertar detalles y actualizar stock
    for (ItemVenta item : items) {
        DetalleVenta detalle = new DetalleVenta();
        detalle.setIdVenta(idVenta);
        detalle.setIdProducto(item.getIdProducto());
        detalle.setCantidad(item.getCantidad());
        detalle.setPrecioUnitario(item.getPrecio());
        detalle.setSubtotal(item.getCantidad() * item.getPrecio());
        
        detalleVentaDAO.insertar(detalle);
        productoDAO.actualizarStock(item.getIdProducto(), item.getCantidad());
    }
    
    // 4. Calcular total
    calcularTotalVenta(idVenta);
    
    // 5. Generar ticket
    String ticket = generarTicket(idVenta);
    imprimirTicket(ticket);
}
```

### 8.2 Proceso de Venta Online

```
┌─────────────────┐
│ Cliente navega  │
│ catálogo web    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Agrega productos│
│ al carrito      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Procede al      │
│ checkout        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Ingresa datos   │
│ de envío        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Selecciona      │
│ método de pago  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Procesa pago    │
│ online          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Crea pedido     │
│ de envío        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Envía email     │
│ confirmación    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Prepara pedido  │
│ para envío      │
└─────────────────┘
```

### 8.3 Proceso de Reposición de Stock

```
1. Sistema detecta stock bajo (< 10 unidades)
2. Genera alerta automática
3. Administrador revisa productos a reponer
4. Contacta a proveedor (presencial o telefónico)
5. Registra pedido a proveedor
6. Recibe productos
7. Actualiza stock en sistema
8. Verifica correspondencia con pedido
```

---

## 9. Instalación y Configuración

### 9.1 Requisitos del Sistema

#### Hardware Mínimo
- Procesador: Intel Core i3 o equivalente
- RAM: 4 GB
- Disco: 500 MB disponibles
- Conexión a Internet

#### Software Necesario
- **Sistema Operativo**: Windows 10/11, Linux, macOS
- **XAMPP**: v8.0 o superior
- **Java JDK**: 11 o superior (si usa Java)
- **Navegador Web**: Chrome, Firefox, Edge (última versión)
- **Git**: Para clonar el repositorio

### 9.2 Pasos de Instalación

#### 1. Instalar XAMPP
```bash
# Descargar desde: https://www.apachefriends.org/
# Instalar con módulos: Apache, MySQL, PHP
```

#### 2. Clonar el Repositorio
```bash
git clone https://github.com/usuario/alma-deporte.git
cd alma-deporte
```

#### 3. Configurar Base de Datos
```bash
# Iniciar XAMPP (Apache y MySQL)
# Abrir phpMyAdmin: http://localhost/phpmyadmin
# Crear base de datos:
CREATE DATABASE alma_deporte;

# Importar esquema
mysql -u root -p alma_deporte < database/schema.sql

# Importar datos de prueba (opcional)
mysql -u root -p alma_deporte < database/data.sql
```

#### 4. Configurar Conexión
```bash
# Editar config/database.config
db.host=localhost
db.name=alma_deporte
db.user=root
db.password=tu_password
```

#### 5. Copiar Archivos al Servidor
```bash
# Copiar proyecto a carpeta de XAMPP
cp -r alma-deporte /opt/lampp/htdocs/
# O en Windows: C:\xampp\htdocs\
```

#### 6. Configurar Permisos (Linux/Mac)
```bash
chmod -R 755 /opt/lampp/htdocs/alma-deporte
chown -R www-data:www-data /opt/lampp/htdocs/alma-deporte
```

#### 7. Iniciar Aplicación
```bash
# Abrir navegador
http://localhost/alma-deporte
```

### 9.3 Variables de Entorno

#### Archivo .env (si se usa)
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=alma_deporte
DB_USER=root
DB_PASSWORD=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=alma.deporte@gmail.com
SMTP_PASSWORD=tu_password

API_MAPS_KEY=tu_api_key_de_google_maps
API_PAYMENT_KEY=tu_api_key_de_pagos
```

---

## 10. Mantenimiento

### 10.1 Respaldo de Base de Datos

#### Respaldo Manual
```bash
# Respaldo completo
mysqldump -u root -p alma_deporte > backup_$(date +%Y%m%d).sql

# Respaldo de tabla específica
mysqldump -u root -p alma_deporte clientes > backup_clientes.sql
```

#### Respaldo Automático (Cron Job - Linux)
```bash
# Editar crontab
crontab -e

# Agregar línea para respaldo diario a las 2:00 AM
0 2 * * * mysqldump -u root -ppassword alma_deporte > /backups/alma_deporte_$(date +\%Y\%m\%d).sql
```

#### Restaurar Respaldo
```bash
mysql -u root -p alma_deporte < backup_20250113.sql
```

### 10.2 Actualización del Sistema

```bash
# 1. Hacer respaldo de BD
mysqldump -u root -p alma_deporte > backup_pre_update.sql

# 2. Detener servidor
sudo systemctl stop apache2

# 3. Actualizar código
git pull origin main

# 4. Aplicar migraciones de BD (si las hay)
mysql -u root -p alma_deporte < database/migrations/update_v2.sql

# 5. Reiniciar servidor
sudo systemctl start apache2

# 6. Verificar funcionamiento
curl http://localhost/alma-deporte/health-check
```

### 10.3 Monitoreo y Logs

#### Ubicación de Logs
```
/var/log/apache2/error.log          # Logs de Apache
/var/log/mysql/error.log            # Logs de MySQL
/alma-deporte/logs/application.log  # Logs de la aplicación
```

#### Ver Logs en Tiempo Real
```bash
# Apache
tail -f /var/log/apache2/error.log

# Aplicación
tail -f /alma-deporte/logs/application.log
```

#### Sistema de Logging (Java)
```java
import java.util.logging.*;

public class LoggerUtil {
    private static final Logger logger = Logger.getLogger("AlmaDeporte");
    
    static {
        try {
            FileHandler fh = new FileHandler("logs/application.log", true);
            logger.addHandler(fh);
            SimpleFormatter formatter = new SimpleFormatter();
            fh.setFormatter(formatter);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static void log(Level level, String message) {
        logger.log(level, message);
    }
}
```

### 10.4 Optimización de Consultas

#### Índices Recomendados
```sql
-- Índice en email de clientes
