import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollTopLogo from '../components/ScrollTopLogo';
import styles from './AdminDashboard.module.css';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    profileImage: ''
  });
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name || '',
          age: data.age || '',
          email: data.email || '',
          profileImage: data.profile_image || ''
        });
      })
      .catch(() => toast.error('Error al cargar perfil'));
  }, [token]);

  useEffect(() => {
    fetch(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => toast.error('Error al cargar usuarios'));
  }, [token]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => toast.error('Error al cargar productos'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, profileImage: reader.result }));
      setFile(reader.result);
    };
    reader.readAsDataURL(selected);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: form.name,
          age: form.age,
          profile_image: form.profileImage
        })
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Perfil actualizado correctamente');
      } else {
        toast.error(data.message || 'Error al actualizar perfil');
      }
    } catch {
      toast.error('Error en la conexión con el servidor');
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Rol actualizado');
        setUsers(prev =>
          prev.map(user => (user.id === id ? { ...user, role } : user))
        );
      } else {
        toast.error(data.message || 'Error al actualizar rol');
      }
    } catch {
      toast.error('Error al conectar con el servidor');
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Producto agregado');
        setProducts(prev => [...prev, data]);
        setNewProduct({ name: '', description: '', price: '', image_url: '' });
        setShowAddForm(false);
      } else {
        toast.error(data.error || 'Error al agregar producto');
      }
    } catch {
      toast.error('Error al conectar con el servidor');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Producto eliminado');
        setProducts(prev => prev.filter(product => product.id !== id));
      } else {
        toast.error('Error al eliminar producto');
      }
    } catch {
      toast.error('Error en la conexión con el servidor');
    }
  };

  const handleEditProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(showEditForm)
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Producto actualizado');
        setProducts(prev => prev.map(p => (p.id === id ? data : p)));
        setShowEditForm(null);
      } else {
        toast.error(data.message || 'Error al actualizar producto');
      }
    } catch {
      toast.error('Error al conectar con el servidor');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.adminContainer}>
        <header className={styles.header}>
          <h1>Panel de Administrador</h1>
        </header>

        <section className={styles.section}>
          <h2>Mi Perfil</h2>
          <div className={styles.profileForm}>
            <input name="name" type="text" placeholder="Nombre completo" value={form.name} onChange={handleChange} />
            <input name="age" type="number" placeholder="Edad" value={form.age} onChange={handleChange} />
            <input name="email" type="email" placeholder="Correo electrónico" value={form.email} disabled />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button className={styles.saveButton} onClick={handleSubmit}>Guardar Cambios</button>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Usuarios Registrados</h2>
          <div className={styles.userList}>
            {users.map(user => (
              <div key={user.id} className={styles.userCard}>
                <p><strong>{user.name}</strong> - {user.email}</p>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Gestor de Productos</h2>
          <div className={styles.productActions}>
            <button onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cerrar Formulario' : 'Agregar Producto'}
            </button>
          </div>

          {showAddForm && (
            <div className={styles.addProductForm}>
              <input type="text" placeholder="Nombre del producto" value={newProduct.name} onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))} />
              <input type="text" placeholder="Descripción" value={newProduct.description} onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))} />
              <input type="number" placeholder="Precio" value={newProduct.price} onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))} />
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setNewProduct(prev => ({ ...prev, image_url: reader.result }));
                };
                if (file) reader.readAsDataURL(file);
              }} />
              <button onClick={handleAddProduct}>Guardar Producto</button>
            </div>
          )}

          <div className={styles.productList}>
            {products.map(product => (
              <div key={product.id} className={styles.productCard}>
                <strong>{product.name}</strong> - ${product.price.toLocaleString('es-CL')}
                <div>
                  <button onClick={() => setShowEditForm(product)}>Editar</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                </div>
                {showEditForm?.id === product.id && (
                  <div className={styles.addProductForm}>
                    <input type="text" value={showEditForm.name} onChange={(e) => setShowEditForm(prev => ({ ...prev, name: e.target.value }))} />
                    <input type="text" value={showEditForm.description} onChange={(e) => setShowEditForm(prev => ({ ...prev, description: e.target.value }))} />
                    <input type="number" value={showEditForm.price} onChange={(e) => setShowEditForm(prev => ({ ...prev, price: e.target.value }))} />
                    <button onClick={() => handleEditProduct(product.id)}>Guardar Cambios</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <ScrollTopLogo />
      <Footer />
    </>
  );
};

export default AdminDashboard;