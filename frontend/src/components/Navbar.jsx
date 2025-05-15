import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const items = [
    'Medicamentos',
    'Cuidado Personal',
    'Vitaminas',
    'Dermocosmética',
    'Salud Sexual',
    'Adulto Mayor',
  ];

  return (
    <nav className={styles.navbar}>
      <ul>
        {items.map(name => (
          <li key={name}>
            <a href="#">{name}</a>
          </li>
        ))}

        {/* ✅ Enlace adicional al formulario de contacto */}
        <li>
          <Link to="/contacto" className={styles.contactLink}>Contacto</Link>
        </li>

        {/* ✅ Botones de autenticación */}
        <li>
          <Link to="/login" className={styles.authButton}>Iniciar sesión</Link>
        </li>
        <li>
          <Link to="/registro" className={styles.authButtonSecondary}>Registrarse</Link>
        </li>
      </ul>
    </nav>
  );
}
