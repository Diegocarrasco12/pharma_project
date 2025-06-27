import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ScrollTopLogo from './components/ScrollTopLogo';
import ProtectedRoute from './components/ProtectedRoute';
import AdminMessages from './components/AdminMessages';

import Categoria from './pages/Categoria';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import PrescriptionPage from './pages/PrescriptionPage';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

// ✅ Tu Home directamente como componente funcional aquí mismo
import HeroCarousel from './components/HeroCarousel';
import Services from './components/Services';
import PrescriptionInfo from './components/PrescriptionInfo';
import ProductCard from './components/ProductCard';
import products from './pages/ProductDetail/products';
import styles from './styles/Home.module.css';

const Home = () => (
  <>
    <HeroCarousel />
    <Services />
    <main className={styles.productGrid}>
      {products.map((producto) => (
        <ProductCard
          key={producto.id}
          id={producto.id}
          name={producto.nombre}
          price={producto.precio}
          image={producto.imagen}
          categoria={producto.categoria}
        />
      ))}
    </main>
    <PrescriptionInfo />
  </>
);

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:nombre" element={<Categoria />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/como-comprar-con-receta" element={<PrescriptionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        
        <Route path="/perfil-usuario" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />

        <Route path="/perfil-admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/mensajes" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminMessages />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Cart />
      <Footer />
      <ScrollTopLogo />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
