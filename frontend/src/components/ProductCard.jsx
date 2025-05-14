import React from 'react';
import styles from './ProductCard.module.css';
import { useCart } from '../context/CartContext';

const ProductCard = ({ name, price, image }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = { name, price };
    addToCart(product);
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <button className={styles.addButton} onClick={handleAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
