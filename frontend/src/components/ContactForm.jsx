import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import { toast } from 'react-toastify';
import WhatsAppIcon from './icons/WhatsAppIcon';
import ScrollTopLogo from './ScrollTopLogo';

const API_URL = import.meta.env.VITE_API_URL;
const whatsappNumber = '56983249135';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // ✅ NUEVO

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = 'El correo no es válido';
    }
    if (!form.message.trim() || form.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setLoading(true); // ✅ Activar loading
      try {
        const response = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Mensaje enviado correctamente');
          setForm({ name: '', email: '', message: '' });
        } else {
          toast.error(data.message || 'Error al enviar el mensaje');
        }
      } catch (error) {
        toast.error('Hubo un problema al conectar con el servidor');
      } finally {
        setLoading(false); // ✅ Desactivar loading
      }
    } else {
      toast.error('Por favor corrige los errores del formulario');
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.icon}>📬</div>
      <h2>Contáctanos</h2>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <label>Nombre completo</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tu nombre"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <label>Mensaje</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí..."
          rows={5}
        />
        {errors.message && <p className={styles.error}>{errors.message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>

      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappButton}
      >
        <WhatsAppIcon size={20} color="#fff" />
        Hablar por WhatsApp
      </a>

      <ScrollTopLogo />
    </div>
  );
};

export default ContactForm;
