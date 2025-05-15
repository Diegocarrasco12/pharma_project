import React from 'react';
import styles from './Header.module.css';
import { useCart } from '../context/CartContext'; // ✅ Importar contexto

export default function Header() {
  const { toggleCart, cartItems } = useCart(); // ✅ Acceder al carrito

  return (
    <>
      <header className={styles.header} id="top">
        <a href="/" className={styles.logoLink}>
          <img src="/images/logo.png" alt="Logo Pharma Project" className={styles.logo} />
        </a>

        <div className={styles.searchContainer}>
          <input type="search" placeholder="Buscar productos..." />
        </div>

        <div className={styles.account}>
          {/* ✅ Botón del carrito conectado */}
          <button onClick={toggleCart} className={styles.cartButton}>
            🛒 Carrito ({cartItems.length})
          </button>
        </div>
      </header>

      {/* Logo flotante en mobile para volver arriba */}
      <a href="#top" className={styles.logoMobileFloating}>
        <img src="/images/logo.png" alt="Volver arriba" />
      </a>
    </>
  );
}
