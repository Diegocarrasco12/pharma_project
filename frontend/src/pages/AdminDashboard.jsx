import React from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1>Panel de Administrador</h1>
      </header>

      <section className={styles.section}>
        <h2>Mi Perfil</h2>
        <div className={styles.profileForm}>
          <input type="text" placeholder="Nombre completo" />
          <input type="number" placeholder="Edad" />
          <input type="email" placeholder="Correo electrónico" />
          <input type="file" accept="image/*" />
          <button className={styles.saveButton}>Guardar Cambios</button>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Usuarios Registrados</h2>
        <div className={styles.userList}>
          <div className={styles.userCard}>Juan Pérez - juan@email.com</div>
          <div className={styles.userCard}>Ana Torres - ana@email.com</div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Gestor de Productos</h2>
        <div className={styles.productActions}>
          <button>Agregar Producto</button>
          <button>Editar Producto</button>
          <button>Eliminar Producto</button>
        </div>
        <div className={styles.productList}>
          <div className={styles.productCard}>Vitamina C - $5.990</div>
          <div className={styles.productCard}>Gel Analgésico - $6.990</div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
