import React from 'react';
import styles from './Cart.module.css';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    toggleCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/\$|\./g, '').replace(',', '.'));
    return sum + price * (item.quantity || 1);
  }, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    const cartData = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity || 1,
      price: parseFloat(item.price.replace(/\$|\./g, '').replace(',', '.'))
    }));

    try {
      await axios.post('/api/orders', {
        cartItems: cartData,
        total: total.toFixed(2)
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('¡Compra registrada exitosamente!');
      clearCart();
      navigate('/perfil');

    } catch (error) {
      console.error('Error al registrar compra:', error);
      toast.error('Error al registrar la compra');
    }
  };

  return (
    <div className={`${styles.cartSidebar} ${isCartOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={toggleCart}>✕</button>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#0b2b4b' }}>Mi Carrito</h2>

      <ul className={styles.cartList}>
        {cartItems.length === 0 ? (
          <p className={styles.emptyMessage}>Tu carrito está vacío</p>
        ) : (
          cartItems.map((item, index) => (
            <li key={index} className={styles.cartItem}>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{item.name}</p>
                <p style={{ marginBottom: '4px' }}>{item.price}</p>
                <div className={styles.quantityControls}>
                  <button onClick={() => decreaseQuantity(item.name)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.name)}>+</button>
                </div>
              </div>
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
        <>
          <div className={styles.cartTotal}>
            <p>Total: ${total.toLocaleString('es-CL')}</p>
          </div>

          <div className={styles.cartFooter}>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
