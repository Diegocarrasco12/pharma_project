import pool from '../config/db.js';

// ✅ Obtener todos los usuarios (solo admin)
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// ✅ Actualizar rol (solo admin)
export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Rol no válido' });
  }

  try {
    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role',
      [role, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Rol actualizado', user: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar rol del usuario:', error);
    res.status(500).json({ message: 'Error al actualizar rol del usuario' });
  }
};

// ✅ Subir imagen de perfil
export const uploadProfileImage = async (req, res) => {
  const { imageUrl } = req.body;
  const userId = req.user.id;

  if (!imageUrl) {
    return res.status(400).json({ message: 'URL de imagen requerida' });
  }

  try {
    await pool.query(
      'UPDATE users SET profile_image = $1 WHERE id = $2',
      [imageUrl, userId]
    );
    res.status(200).json({ message: 'Imagen actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar imagen de perfil:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// ✅ Obtener perfil del usuario logueado
export const getUserProfile = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, role, profile_image, age FROM users WHERE id = $1',
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
};

// ✅ Nueva función: actualizar nombre, edad y/o imagen
export const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, age, profile_image } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, age = $2, profile_image = $3 WHERE id = $4 RETURNING id, name, email, role, profile_image, age',
      [name, age, profile_image, userId]
    );
    res.status(200).json({ message: 'Perfil actualizado', user: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error al actualizar perfil' });
  }
};
