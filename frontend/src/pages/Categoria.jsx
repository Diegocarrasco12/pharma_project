// src/pages/Categoria.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from './ProductDetail/products';
import styles from './Categoria.module.css';

const Categoria = () => {
  const { nombre } = useParams();

  // Normalizamos ambas cadenas para evitar problemas por mayúsculas o tildes
  const normalizar = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const nombreNormalizado = normalizar(nombre);

  const productosFiltrados = products.filter(
    producto => normalizar(producto.categoria) === nombreNormalizado
  );

  return (
    <div className={styles.categoriaContainer}>
      <h2 className={styles.title}>Productos en: {nombre}</h2>
      <div className={styles.productGrid}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <ProductCard
              key={producto.id}
              id={producto.id}
              name={producto.nombre}
              price={producto.precio}
              image={producto.imagen}
              categoria={producto.categoria}
            />
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default Categoria;
