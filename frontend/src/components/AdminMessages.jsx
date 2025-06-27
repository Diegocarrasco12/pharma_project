import React, { useEffect, useState } from 'react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('No autorizado o error al obtener mensajes');
        }

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Cargando mensajes...</p>;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>⚠️ {error}</p>;
  if (messages.length === 0) return <p style={{ padding: '2rem' }}>No hay mensajes registrados.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📨 Mensajes de Contacto</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Nombre</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Correo</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Mensaje</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{msg.name}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{msg.email}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{msg.message}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                  {new Date(msg.created_at).toLocaleString('es-CL')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessages;
