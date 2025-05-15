import React, { useState, useRef, useEffect } from 'react';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const firstErrorRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formErrors = validate();
    setErrors(formErrors);
    setLoading(false);

    if (Object.keys(formErrors).length === 0) {
      toast.success('Inicio de sesión exitoso');
      // Aquí irá lógica futura de autenticación
    } else {
      toast.error('Por favor corrige los errores del formulario');
    }
  };

  return (
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            ref={errors.password && !errors.email ? firstErrorRef : null}
          />
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
  );
};

export default LoginPage;
