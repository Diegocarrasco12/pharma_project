import React from 'react';
import styles from './PrescriptionInfo.module.css';

const PrescriptionInfo = () => {
  return (
    <section className={styles.prescriptionSection}>
      <p>
        Compra online de <strong>medicamentos con receta</strong>
      </p>
      <a href="/como-comprar-con-receta" className={styles.button}>
        Cómo comprar con receta
      </a>
    </section>
  );
};

export default PrescriptionInfo;
