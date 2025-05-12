import React from 'react';
import styles from './Navbar.module.css';

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
      </ul>
    </nav>
  );
}
