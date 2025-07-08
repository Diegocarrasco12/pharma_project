import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.logo}>
          <img src="/images/logo3.png" alt="Pharma Project" />
          <a
            href="https://www.remediosmasbaratos.cl"
            target="_blank"
            rel="noopener noreferrer"
          >
          <img
             src="/images/cenebast.jpeg"
             alt="Farmacia adherida a CENABAST"
             className={styles.cenabastLogo}
          />

          </a>
        </div>

        <div className={styles.column}>
          <h4>Menú</h4>
          <ul>
            <li>Inicio</li>
            <li>Nosotros</li>
            <li>Cómo comprar con receta</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Categorías</h4>
          <ul>
            <li>Medicamentos</li>
            <li>Vitaminas</li>
            <li>Dermocosmética</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Contacto</h4>
          <p>+56 9 1234 5678</p>
          <p>contacto@pharmaproject.cl</p>
        </div>

        <div className={styles.column}>
          <h4>Métodos de Pago</h4>
          <img src="/images/logo-pagofacil.jpg" alt="PagoFácil" className={styles.paymentLogo} />
        </div>
      </div>

      <div className={styles.copy}>
        <p>&copy; {new Date().getFullYear()} Pharma Project. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
