import React from 'react';
import styles from './Header.module.css';

export default function Header() {
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
          <a href="#">Mi cuenta 🛒</a>
        </div>
      </header>

      {/* Logo flotante en mobile para volver arriba */}
      <a href="#top" className={styles.logoMobileFloating}>
        <img src="/images/logo.png" alt="Volver arriba" />
      </a>
    </>
  );
}
