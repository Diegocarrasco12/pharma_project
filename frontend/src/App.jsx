import React from 'react';
import { Link } from 'react-router-dom'; 
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import Services from './components/Services';
import PrescriptionInfo from './components/PrescriptionInfo';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ScrollTopLogo from './components/ScrollTopLogo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles/Home.module.css';
import './styles/global.css';

function App() {
  return (
    <>
      <Header />
      <HeroCarousel />
      <Services />

      <main className={styles.productGrid}>
        <Link to="/producto/1">
          <ProductCard
            id={1}
            name="Vitamina C 1000mg"
            price="$5.990"
            image="/images/producto-vitamina-c.jpg"
          />
        </Link>
        <Link to="/producto/2">
          <ProductCard
            id={2}
            name="Mascarilla KN95"
            price="$1.500"
            image="/images/producto-mascarilla-kn95.jpg"
          />
        </Link>
        <Link to="/producto/3">
          <ProductCard
            id={3}
            name="Gel Analgésico"
            price="$6.990"
            image="/images/producto-gel-analgesico.jpg"
          />
        </Link>
        <Link to="/producto/4">
          <ProductCard
            id={4}
            name="Termómetro Digital"
            price="$4.200"
            image="/images/producto-termometro-digital.jpg"
          />
        </Link>
        <Link to="/producto/5">
          <ProductCard
            id={5}
            name="Vitamina D3"
            price="$7.990"
            image="/images/producto-vitamina-d3.jpg"
          />
        </Link>
        <Link to="/producto/6">
          <ProductCard
            id={6}
            name="Alcohol Gel 70%"
            price="$2.500"
            image="/images/producto-alcohol-gel.jpg"
          />
        </Link>
      </main>

      <PrescriptionInfo />
      <Cart />
      <Footer />
      <ScrollTopLogo />

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
