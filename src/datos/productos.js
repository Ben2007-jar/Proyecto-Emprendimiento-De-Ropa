export const categorias = [
  { id: 'remeras', nombre: 'Remeras', imagen: '/ropa/remera.PNG' },
  { id: 'musculosas', nombre: 'Musculosas', imagen: '/ropa/musculosa.PNG' },
  { id: 'tops', nombre: 'Tops deportivos', imagen: '/ropa/top.PNG' }, // Cambiado de 'Tops deportivos' a 'Tops'
  { id: 'shorts', nombre: 'Shorts y polleras', imagen: '/ropa/short.png' },
  { id: 'camisetas', nombre: 'Camisetas', imagen: '/ropa/camisetas.PNG' }, // Cambiado de 'Camisetas' a 'Camisetas deportivas'
  { id: 'camperas', nombre: 'Camperas', imagen: '/ropa/campera.png' },
  { id: 'conjuntos', nombre: 'Conjuntos', imagen: '/ropa/conjuntos.png' },
  { id: 'catsuits', nombre: 'Catsuits', imagen: '/ropa/catsuit.png' }, // Cambiado de 'Catsuits' a 'Catsuit'
  { id: 'mayas', nombre: 'Mayas', imagen: '/ropa/maya.png' },
  { id: 'accesorios', nombre: 'Accesorios', imagen: '/ropa/accesorios.png' }
];

export const productos = {
  remeras: Array(10).fill(null).map((_, i) => ({
    id: `remera-${i}`,
    nombre: 'Remera Deportiva',
    precio: 8500,
    imagen: '/ropa/remera.PNG',
    categoria: 'remeras'
  })),
  
  musculosas: Array(10).fill(null).map((_, i) => ({
    id: `musculosa-${i}`,
    nombre: 'Musculosa',
    precio: 12000,
    imagen: '/ropa/musculosa.PNG',
    categoria: 'musculosas'
  })),
  
  tops: Array(10).fill(null).map((_, i) => ({
    id: `tops-${i}`,
    nombre: 'Top Deportivo',
    precio: 7500,
    imagen: '/ropa/top.PNG',
    categoria: 'tops'
  })),
  
  shorts: Array(10).fill(null).map((_, i) => ({
    id: `short-${i}`,
    nombre: 'Short Deportivo',
    precio: 6500,
    imagen: '/ropa/short.png',
    categoria: 'shorts'
  })),
  
  camisetas: Array(10).fill(null).map((_, i) => ({
    id: `camiseta-${i}`,
    nombre: 'Camiseta',
    precio: 18000,
    imagen: '/ropa/camisetas.PNG',
    categoria: 'camisetas'
  })),
  
  camperas: Array(10).fill(null).map((_, i) => ({
    id: `campera-${i}`,
    nombre: 'Campera Deportiva',
    precio: 22000,
    imagen: '/ropa/campera.png',
    categoria: 'camperas'
  })),
  
  conjuntos: Array(10).fill(null).map((_, i) => ({
    id: `conjunto-${i}`,
    nombre: 'Conjunto Deportivo',
    precio: 22000,
    imagen: '/ropa/conjuntos.png',
    categoria: 'conjuntos'
  })),
  
  catsuits: Array(10).fill(null).map((_, i) => ({
    id: `catsuit-${i}`,
    nombre: 'Catsuit',
    precio: 22000,
    imagen: '/ropa/catsuit.png',
    categoria: 'catsuits'
  })),
  
  mayas: Array(10).fill(null).map((_, i) => ({
    id: `maya-${i}`,
    nombre: 'Maya Deportiva',
    precio: 22000,
    imagen: '/ropa/maya.png',
    categoria: 'mayas'
  })),
  
  accesorios: Array(10).fill(null).map((_, i) => ({
    id: `accesorio-${i}`,
    nombre: 'Accesorio',
    precio: 22000,
    imagen: '/ropa/accesorios.png',
    categoria: 'accesorios'
  }))
};

export const ofertas = [
  {
    id: 'oferta-1',
    nombre: 'Top Deportivo Nike (OFERTA)',
    precio: 7500,
    precioAnterior: 10000,
    descuento: 25,
    imagen: '/ropa/top.PNG'
  },
  {
    id: 'oferta-2',
    nombre: 'Calza Larga Adidas (OFERTA)',
    precio: 10500,
    precioAnterior: 15000,
    descuento: 30,
    imagen: '/ropa/maya.PNG'
  },
  {
    id: 'oferta-3',
    nombre: 'Short Deportivo (OFERTA)',
    precio: 6400,
    precioAnterior: 8000,
    descuento: 20,
    imagen: '/ropa/short.PNG'
  },
  {
    id: 'oferta-4',
    nombre: 'Conjunto Gym (OFERTA)',
    precio: 17000,
    precioAnterior: 20000,
    descuento: 15,
    imagen: '/ropa/conjuntos.png'
  }
];