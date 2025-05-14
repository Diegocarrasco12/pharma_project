import React from 'react';
import styles from './Cart.module.css';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, isCartOpen, toggleCart, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className={styles.cartSidebar}>
      <button className={styles.closeButton} onClick={toggleCart}>✕</button>
      <h2>Mi Carrito</h2>
      <ul className={styles.cartList}>
        {cartItems.length === 0 ? (
          <p className={styles.emptyMessage}>Tu carrito está vacío</p>
        ) : (
          cartItems.map((item, index) => (
            <li key={index} className={styles.cartItem}>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(item.name)}
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>

      {cartItems.length > 0 && (
        <div className={styles.cartFooter}>
          <button className={styles.checkoutButton}>Finalizar compra</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
