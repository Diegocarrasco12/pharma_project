import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import PrescriptionPage from './pages/PrescriptionPage.jsx';
import UserProfile from './pages/UserProfile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFound from './pages/NotFound.jsx';
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx'; // ✅ NUEVA RUTA

import { CartProvider } from './context/CartContext';

import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/producto/:id" element={<ProductDetail />} /> {/* ✅ IMPORTANTE */}
          <Route path="/como-comprar-con-receta" element={<PrescriptionPage />} />
          <Route path="/perfil-usuario" element={<UserProfile />} />
          <Route path="/perfil-admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
