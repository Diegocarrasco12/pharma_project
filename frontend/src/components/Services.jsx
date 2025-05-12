import React from 'react';
import styles from './Services.module.css';

const Services = () => {
  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.title}>Nuestros Servicios</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <img src="/images/icon-despacho.png" alt="Despacho a domicilio" />
          <h3>Despacho a domicilio</h3>
          <p>Recibe tus productos directamente en tu hogar en menos de 48 horas hábiles.</p>
        </div>
        <div className={styles.card}>
          <img src="/images/icon-retiro.png" alt="Retiro en tienda" />
          <h3>Retiro en tienda</h3>
          <p>Haz tu compra online y retira en la sucursal más cercana sin costo adicional.</p>
        </div>
        <div className={styles.card}>
          <img src="/images/icon-recetario.png" alt="Recetario magistral" />
          <h3>Recetario magistral</h3>
          <p>Preparamos fórmulas personalizadas indicadas por tu médico, con respaldo profesional.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
