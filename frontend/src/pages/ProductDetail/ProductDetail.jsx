import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from './products';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cart from '../../components/Cart';
import ScrollTopLogo from '../../components/ScrollTopLogo';

import styles from './ProductDetail.module.css';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  // ✅ Forzar scroll al top al cambiar de producto
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!product) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <h2 style={{ color: 'red', textAlign: 'center' }}>Producto no encontrado</h2>
          <Link to="/" className={styles.button}>Volver al inicio</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Imagen */}
          <div className={styles.imageContainer}>
            <img src={product.imagen} alt={product.nombre} className={styles.image} />
          </div>

          {/* Información */}
          <div className={styles.details}>
            <h1 className={styles.title}>{product.nombre}</h1>
            <p className={styles.price}>{product.precio}</p>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Acción terapéutica</h2>
              <p className={styles.sectionText}>{product.accion_terapeutica}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Principio activo</h2>
              <p className={styles.sectionText}>{product.principio_activo}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Ficha técnica</h2>
              <p className={styles.sectionText}>{product.ficha_tecnica}</p>
            </div>

            <Link to="/" className={styles.button}>Volver al inicio</Link>
          </div>
        </div>
      </div>
      <Cart />
      <Footer />
      <ScrollTopLogo />
    </>
  );
}

export default ProductDetail;
