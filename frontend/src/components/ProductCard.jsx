import React from 'react';
import styles from './ProductCard.module.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, name, price, image }) => {
  const { addToCart, toggleCart } = useCart();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/producto/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // ❗ Evita redirección
    const product = { id, name, price };
    addToCart(product);
    toggleCart();
  };

  return (
    <div className={styles.card} onClick={handleNavigate}>
      <img src={image} alt={name} className={styles.cardImage} />
      <h3 className={styles.cardTitle}>{name}</h3>
      <p className={styles.cardPrice}>{price}</p>
      <button
        className={styles.addButton}
        onClick={handleAddToCart}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
