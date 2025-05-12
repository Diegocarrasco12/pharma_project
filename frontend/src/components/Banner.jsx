import styles from './Banner.module.css';

export default function Banner() {
  return (
    <div className={styles.banner}>
      <h2>🧴 Hasta 30% OFF en productos seleccionados</h2>
      <button>Ver ofertas</button>
    </div>
  );
}
