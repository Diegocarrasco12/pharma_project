import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <>
      <Header />
      <Navbar />

      <section className={styles.profileContainer}>
        <h1>Mi Perfil</h1>

        <div className={styles.profileBox}>
          <div className={styles.profileImage}>
            <img src="/images/default-user.png" alt="Foto de perfil" />
            <button className={styles.uploadButton}>Cambiar foto</button>
          </div>

          <form className={styles.form}>
            <label>
              Nombre:
              <input type="text" placeholder="Ingresa tu nombre" />
            </label>
            <label>
              Edad:
              <input type="number" placeholder="Ingresa tu edad" />
            </label>
            <label>
              Correo electrónico:
              <input type="email" placeholder="correo@ejemplo.com" />
            </label>
            <button className={styles.saveButton}>Guardar cambios</button>
          </form>
        </div>

        <div className={styles.section}>
          <h2>Mis Compras</h2>
          <div className={styles.orders}>
            <div className={styles.orderCard}>
              <img src="/images/producto-vitamina-c.jpg" alt="Producto" />
              <p>Vitamina C 1000mg</p>
              <span>$5.990</span>
            </div>
            <div className={styles.orderCard}>
              <img src="/images/producto-alcohol-gel.jpg" alt="Producto" />
              <p>Alcohol Gel 70%</p>
              <span>$2.500</span>
            </div>
            {/* ...simula más si quieres */}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default UserProfile;
