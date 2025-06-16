import React, { useEffect, useState } from 'react';
import styles from './UserProfile.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollTopLogo from '../components/ScrollTopLogo';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // ✅ Mostrar toast si viene de otra página
  useEffect(() => {
    const message = localStorage.getItem('toastMessage');
    if (message) {
      toast.success(message);
      localStorage.removeItem('toastMessage');
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);
        setName(data.name);
        setAge(data.age || '');
        setImagePreview(data.profile_image || '');
        localStorage.setItem('profileImage', data.profile_image || '');
      } catch (error) {
        toast.error('Error al cargar el perfil');
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          age,
          profile_image: profileImage,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Perfil actualizado correctamente');
        localStorage.setItem('profileImage', data.profile_image || '');
        setUser(data.user);
      } else {
        toast.error(data.message || 'Error al actualizar perfil');
      }
    } catch (err) {
      toast.error('Error al conectar con el servidor');
    }
    setLoading(false);
  };

  if (!user) return <p className={styles.loading}>Cargando perfil...</p>;

  return (
    <>
      <Header />
      <div className={styles.profileContainer}>
        <h2>Mi Perfil</h2>

        <div className={styles.imageContainer}>
          <img
            src={imagePreview || '/uploads/default-user.jpeg'}
            alt="Foto de perfil"
            className={styles.profileImage}
          />
          <label className={styles.uploadBtn}>
            Cambiar foto
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label>Nombre</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>Edad</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            max="120"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Correo electrónico</label>
          <input type="email" value={user.email} disabled />
        </div>

        <button
          className={styles.saveButton}
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
      <Footer />
      <ScrollTopLogo />
    </>
  );
};

export default UserProfile;
