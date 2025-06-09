import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import ScrollTopLogo from './ScrollTopLogo'; // ✅ Importar

export default function Header() {
  const { toggleCart, cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  // Detecta tamaño de pantalla para controlar clases
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false); // Cierra menú en desktop
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // inicial
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={styles.header} id="top">
        <div className={styles.topBar}>
          <div className={styles.left}>
            <Link to="/" className={styles.logoLink}>
              <img
                src="/images/logo.png"
                alt="Logo Pharma Project"
                className={styles.logo}
              />
            </Link>
          </div>

          <div className={styles.center}>
            <div className={styles.searchContainer}>
              <input type="search" placeholder="Buscar productos..." />
            </div>
          </div>

          <div className={styles.right}>
            <button onClick={toggleCart} className={styles.cartButton} aria-label="Carrito">
              🛒 <span className={styles.cartCount}>{cartItems.length}</span>
            </button>
            {isMobile && (
              <button
                className={styles.menuToggle}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
              >
                ☰
              </button>
            )}
          </div>
        </div>

        {/* UN SOLO NAV */}
        <nav
          className={`${styles.navMenu} ${menuOpen && isMobile ? styles.showMobile : ''}`}
        >
          <Link to="/">Inicio</Link>
          <Link to="/medicamentos">Medicamentos</Link>
          <Link to="/vitaminas">Vitaminas</Link>
          <Link to="/dermocosmetica">Dermocosmética</Link>
          <Link to="/adulto-mayor">Adulto Mayor</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/registro">Registrarse</Link>
        </nav>
      </header>

      {/* ✅ Logo flotante en mobile funcional en todas las rutas */}
      {isMobile && <ScrollTopLogo />}
    </>
  );
}
