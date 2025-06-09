import React, { useState, useRef, useEffect } from 'react';
import styles from './RegisterPage.module.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScrollTopLogo from '../components/ScrollTopLogo';

const API_URL = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const firstErrorRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'El nombre es obligatorio';
    if (!email) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(email)) {
      newErrors.email = 'El correo no es válido';
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password = 'Debe contener una mayúscula y un número';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
        const response = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Cuenta creada con éxito');
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } else {
          toast.error(data.message || 'Error al registrar');
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
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h1>Crear cuenta</h1>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label>Nombre completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            ref={errors.name ? firstErrorRef : null}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            ref={errors.email && !errors.name ? firstErrorRef : null}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <label>Contraseña</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              ref={errors.password && !errors.name && !errors.email ? firstErrorRef : null}
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

          <label>Confirmar contraseña</label>
          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              ref={
                errors.confirmPassword &&
                !errors.name &&
                !errors.email &&
                !errors.password
                  ? firstErrorRef
                  : null
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.toggleButton}
            >
              {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p className={styles.loginLink}>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
      <ScrollTopLogo />
    </div>
  );
};

export default RegisterPage;
