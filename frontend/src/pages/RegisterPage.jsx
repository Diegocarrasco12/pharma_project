import React, { useState, useRef, useEffect } from 'react';
import styles from './RegisterPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const navigate = useNavigate();

  useEffect(() => {
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      toast.success(toastMessage);
      localStorage.removeItem('toastMessage');
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'El correo no es válido';
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres';
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
    if (firstErrorRef.current) firstErrorRef.current.focus();
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('toastMessage', 'Cuenta creada con éxito');
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigate('/login');
        } else {
          toast.error(data.message || 'Error al registrar');
        }
      } catch (error) {
        toast.error('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Por favor corrige los errores del formulario');
    }
  };

  const inputClass = (field) => (errors[field] ? `${styles.inputError}` : '');

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
            className={inputClass('name')}
            ref={errors.name ? firstErrorRef : null}
            aria-invalid={!!errors.name}
            aria-describedby="error-name"
          />
          {errors.name && <p id="error-name" className={styles.error}>❌ {errors.name}</p>}

          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className={inputClass('email')}
            ref={errors.email && !errors.name ? firstErrorRef : null}
            aria-invalid={!!errors.email}
            aria-describedby="error-email"
          />
          {errors.email && <p id="error-email" className={styles.error}>❌ {errors.email}</p>}

          <label>Contraseña</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className={inputClass('password')}
              ref={errors.password && !errors.name && !errors.email ? firstErrorRef : null}
              aria-invalid={!!errors.password}
              aria-describedby="error-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.toggleButton}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.password && <p id="error-password" className={styles.error}>❌ {errors.password}</p>}

          <label>Confirmar contraseña</label>
          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className={inputClass('confirmPassword')}
              ref={
                errors.confirmPassword &&
                !errors.name &&
                !errors.email &&
                !errors.password
                  ? firstErrorRef
                  : null
              }
              aria-invalid={!!errors.confirmPassword}
              aria-describedby="error-confirm"
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
            <p id="error-confirm" className={styles.error}>❌ {errors.confirmPassword}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p className={styles.loginLink}>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
