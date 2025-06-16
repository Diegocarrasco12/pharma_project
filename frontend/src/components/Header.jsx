import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useCart } from '../context/CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ScrollTopLogo from './ScrollTopLogo';

const API_URL = import.meta.env.VITE_API_URL;

export default function Header() {
  const { toggleCart, cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [profileImage, setProfileImage] = useState(null);

  // Obtener imagen desde el backend al iniciar sesión
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    } else if (token) {
      fetch(`${API_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.profile_image) {
            setProfileImage(data.profile_image);
            localStorage.setItem('profileImage', data.profile_image);
          }
        })
        .catch(err => console.error('Error al cargar imagen de perfil:', err));
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('profileImage');
    navigate('/login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        setProfileImage(base64);
        localStorage.setItem('profileImage', base64);

        // Guardar en backend también
        try {
          await fetch(`${API_URL}/api/users/profile-image`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ imageUrl: base64 })
          });
        } catch (error) {
          console.error('Error al guardar imagen en backend:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <header className={styles.header} id="top">
        <div className={styles.topBar}>
          <div className={styles.left}>
            <Link to="/" className={styles.logoLink}>
              <img src="/images/logo.png" alt="Logo Pharma Project" className={styles.logo} />
            </Link>
          </div>

          <div className={styles.center}>
            <div className={styles.searchContainer}>
              <input type="search" placeholder="Buscar productos..." />
            </div>
          </div>

          <div className={styles.right}>
            <button onClick={toggleCart} className={styles.cartButton} aria-label="Carrito">
              🛒 <span className={styles.cartCount}>{cartItems.length}</span>
            </button>
            {isMobile && (
              <button
                className={styles.menuToggle}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
              >
                ☰
              </button>
            )}
          </div>
        </div>

        <nav className={`${styles.navMenu} ${menuOpen && isMobile ? styles.showMobile : ''}`}>
          <Link to="/">Inicio</Link>
          <Link to="/medicamentos">Medicamentos</Link>
          <Link to="/vitaminas">Vitaminas</Link>
          <Link to="/dermocosmetica">Dermocosmética</Link>
          <Link to="/adulto-mayor">Adulto Mayor</Link>
          <Link to="/contacto">Contacto</Link>

          {!token && (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/registro">Registrarse</Link>
            </>
          )}

          {token && (
            <>
              <div className={styles.profileSection}>
                 {profileImage ? (
                 <Link to={role === 'admin' ? '/perfil-admin' : '/perfil-usuario'}>
                 <img src={profileImage} alt="Perfil" className={styles.profileImage} />
                 </Link>
                      ) : (
                 <label className={styles.uploadLabel}>
                   📷
                 <input
                 type="file"
                 accept="image/*"
                 onChange={handleImageChange}
                style={{ display: 'none' }}
                 />
               </label>
          )}

              </div>
              <Link to={role === 'admin' ? '/perfil-admin' : '/perfil-usuario'}>
                Perfil
              </Link>
              {role === 'admin' && <Link to="/admin/mensajes">Mensajes</Link>}
              <button onClick={handleLogout} className={styles.logoutButton}>
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </header>

      {isMobile && <ScrollTopLogo />}
    </>
  );
}
