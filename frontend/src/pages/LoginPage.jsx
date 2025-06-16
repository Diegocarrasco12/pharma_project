import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollTopLogo from '../components/ScrollTopLogo';
import styles from './LoginPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const firstErrorRef = useRef(null);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'El correo no es válido';
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    return newErrors;
  };

  useEffect(() => {
    if (firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Inicio de sesión exitoso');
          localStorage.setItem('token', data.token);

          if (data.user?.role) {
            localStorage.setItem('role', data.user.role);
          }

          setEmail('');
          setPassword('');

          // 🔁 Delay para permitir que el toast se muestre antes de redirigir
          setTimeout(() => {
            if (data.user?.role === 'admin') {
              navigate('/perfil-admin');
            } else {
              navigate('/perfil-usuario');
            }
          }, 500);

        } else {
          toast.error(data.message || 'Credenciales incorrectas');
        }
      } catch (error) {
        toast.error('Error al conectar con el servidor');
      }
    } else {
      toast.error('Por favor corrige los errores del formulario');
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <h1>Iniciar sesión</h1>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                ref={errors.email ? firstErrorRef : null}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}

              <label>Contraseña</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  ref={errors.password && !errors.email ? firstErrorRef : null}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.toggleButton}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {errors.password && <p className={styles.error}>{errors.password}</p>}

              <button type="submit" disabled={loading}>
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>
            <p className={styles.registerLink}>
              ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </div>
        </div>

        <ScrollTopLogo />
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
