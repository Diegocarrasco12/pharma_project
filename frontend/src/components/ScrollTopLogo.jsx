// src/components/ScrollTopLogo.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './ScrollTopLogo.module.css';

const ScrollTopLogo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Ya estás en home → solo scroll
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navega a home y espera para hacer scroll
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <button onClick={handleClick} className={styles.logoMobileFloating} aria-label="Volver al inicio">
      <img src="/images/logo.png" alt="Volver al inicio" />
    </button>
  );
};

export default ScrollTopLogo;
