import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { useCart } from "../context/CartContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ScrollTopLogo from "./ScrollTopLogo";
import {
  FiPhone,
  FiLogIn,
  FiUserPlus,
  FiUser,
  FiMail,
  FiLogOut,
  FiShoppingCart,
  FiMenu,
} from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL;

export default function Header() {
  const { toggleCart, cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    } else if (token) {
      fetch(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.profile_image) {
            setProfileImage(data.profile_image);
            localStorage.setItem("profileImage", data.profile_image);
          }
        })
        .catch((err) =>
          console.error("Error al cargar imagen de perfil:", err)
        );
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        setProfileImage(base64);
        localStorage.setItem("profileImage", base64);

        try {
          await fetch(`${API_URL}/api/users/profile-image`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ imageUrl: base64 }),
          });
        } catch (error) {
          console.error("Error al guardar imagen en backend:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <header className={styles.header} id="top">
        <div className={styles.topBar}>
          {/* Logo */}
          <div className={styles.left}>
            <Link to="/" className={styles.logoLink}>
              <img
                src="/images/logo2.png"
                alt="Logo Pharma Project"
                className={styles.logoImg}
              />
            </Link>
          </div>

          {/* Barra de búsqueda */}
          <div className={styles.center}>
            <div className={styles.searchContainer}>
              <input type="search" placeholder="Buscar productos..." />
            </div>
          </div>

          {/* Íconos a la derecha */}
          {!isMobile && (
            <div className={styles.right}>
              <Link
                to="/contacto"
                className={styles.iconButton}
                title="Contacto"
              >
                <FiPhone size={20} />
              </Link>

              {!token ? (
                <>
                  <Link
                    to="/login"
                    className={styles.iconButton}
                    title="Iniciar sesión"
                  >
                    <FiLogIn size={20} />
                  </Link>
                  <Link
                    to="/registro"
                    className={styles.iconButton}
                    title="Registrarse"
                  >
                    <FiUserPlus size={20} />
                  </Link>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleCart();
                    }}
                    className={styles.iconButton}
                    title="Ver carrito"
                  >
                    <FiShoppingCart size={20} />
                    <span className={styles.cartCount}>{cartItems.length}</span>
                  </Link>
                </>
              ) : (
                <>
                  <div className={styles.profileSection}>
                    {profileImage ? (
                      <Link
                        to={
                          role === "admin" ? "/perfil-admin" : "/perfil-usuario"
                        }
                        title="Perfil"
                      >
                        <img
                          src={profileImage}
                          alt="Perfil"
                          className={styles.profileImage}
                        />
                      </Link>
                    ) : (
                      <label
                        className={styles.uploadLabel}
                        title="Subir imagen de perfil"
                      >
                        📷
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                      </label>
                    )}
                  </div>

                  <Link
                    to={role === "admin" ? "/perfil-admin" : "/perfil-usuario"}
                    className={styles.iconButton}
                    title="Perfil"
                  >
                    <FiUser size={20} />
                  </Link>

                  {role === "admin" && (
                    <Link
                      to="/admin/mensajes"
                      className={styles.iconButton}
                      title="Mensajes"
                    >
                      <FiMail size={20} />
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className={styles.iconButton}
                    title="Cerrar sesión"
                  >
                    <FiLogOut size={20} />
                  </button>
                </>
              )}

              {/* Menú hamburguesa solo en móvil */}
              {isMobile && (
                <button
                  className={styles.iconButton}
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Abrir menú"
                >
                  <FiMenu size={22} />
                </button>
              )}
            </div>
          )}

          {/* Botón menú hamburguesa en mobile visible siempre */}
          {isMobile && (
            <button
              className={styles.iconButton}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <FiMenu size={22} />
            </button>
          )}
        </div>

        {/* Navegación */}
        <nav
          className={`${styles.navMenu} ${
            menuOpen && isMobile ? styles.showMobile : ""
          }`}
        >
          <Link to="/">Inicio</Link>
          <Link to="/categoria/medicamentos">Medicamentos</Link>
          <Link to="/categoria/vitaminas">Vitaminas</Link>
          <Link to="/categoria/higiene">Higiene</Link>
          <Link to="/categoria/accesorios-medicos">Accesorios médicos</Link>

          {/* Íconos dentro del menú hamburguesa en mobile */}
          {isMobile && (
            <div className={styles.navMenuIcons}>
              <Link to="/contacto">Contacto</Link>

              {!token ? (
                <>
                  <Link to="/login">Iniciar sesión</Link>
                  <Link to="/registro">Registrarse</Link>
                  <button
                    onClick={toggleCart}
                    className={styles.mobileTextButton}
                  >
                    Ver carrito ({cartItems.length})
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={role === "admin" ? "/perfil-admin" : "/perfil-usuario"}
                  >
                    Mi perfil
                  </Link>

                  {role === "admin" && (
                    <Link to="/admin/mensajes">Mensajes</Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className={styles.mobileTextButton}
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          )}
        </nav>
      </header>

      {isMobile && <ScrollTopLogo />}
    </>
  );
}
