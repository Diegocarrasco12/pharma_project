import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ name, price, image }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <p className={styles.price}>{price}</p>
      <button>Agregar al carrito</button>
    </div>
  );
}
