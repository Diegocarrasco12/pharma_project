import React from 'react';
import styles from './PrescriptionPage.module.css';

const PrescriptionPage = () => {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Cómo comprar con receta médica</h1>
      <div className={styles.steps}>
        <div className={styles.step}>
          <h2>Paso 1: Realiza tu pedido</h2>
          <p>
            Agrega los productos a tu carrito y procede con la compra como lo
            harías normalmente.
          </p>
        </div>
        <div className={styles.step}>
          <h2>Paso 2: Envía tu receta</h2>
          <p>
            Una vez realizado el pedido, envía una foto legible de la receta a
            nuestro correo: <strong>recetas@pharmaproject.cl</strong> o por
            WhatsApp al <strong>+56 9 1234 5678</strong>.
          </p>
        </div>
        <div className={styles.step}>
          <h2>Paso 3: Validación y despacho</h2>
          <p>
            Validaremos tu receta con nuestro equipo farmacéutico y luego te
            despacharemos el producto.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrescriptionPage;
