import React from 'react';
import styles from './Cart.module.css';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, isCartOpen, toggleCart, removeFromCart } = useCart();

  // ✅ Cálculo del total
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/\$|\./g, '').replace(',', '.'));
    return sum + price;
  }, 0);

  return (
    <div
      className={`${styles.cartSidebar} ${isCartOpen ? styles.open : ''}`}
    >
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

      {/* ✅ Mostrar total si hay productos */}
      {cartItems.length > 0 && (
        <>
          <div className={styles.cartTotal}>
            <p>Total: ${total.toLocaleString('es-CL')}</p>
          </div>

          <div className={styles.cartFooter}>
            <button className={styles.checkoutButton}>Finalizar compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
