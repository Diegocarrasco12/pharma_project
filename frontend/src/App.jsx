import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Services from './components/Services'; // Importamos el componente nuevo
import ProductCard from './components/ProductCard';
import styles from './styles/Home.module.css';
import './styles/global.css';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <HeroCarousel />
      <Services />

      <main className={styles.productGrid}>
        <ProductCard
          name="Vitamina C 1000mg"
          price="$5.990"
          image="/images/producto-vitamina-c.jpg"
        />
        <ProductCard
          name="Mascarilla KN95"
          price="$1.500"
          image="/images/producto-mascarilla-kn95.jpg"
        />
        <ProductCard
          name="Gel Analgésico"
          price="$6.990"
          image="/images/producto-gel-analgesico.jpg"
        />
        <ProductCard
          name="Termómetro Digital"
          price="$4.200"
          image="/images/producto-termometro-digital.jpg"
        />
        <ProductCard
          name="Vitamina D3"
          price="$7.990"
          image="/images/producto-vitamina-d3.jpg"
        />
        <ProductCard
          name="Alcohol Gel 70%"
          price="$2.500"
          image="/images/producto-alcohol-gel.jpg"
        />
      </main>
    </>
  );
}

export default App;
