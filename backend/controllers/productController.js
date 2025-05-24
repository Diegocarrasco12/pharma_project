import pool from '../config/db.js';
import fs from 'fs';

export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image_url, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, image_url, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, image_url, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image_url, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }

  try {
    const result = await pool.query(
      `UPDATE products
       SET name = $1, price = $2, image_url = $3, description = $4
       WHERE id = $5
       RETURNING *`,
      [name, price, image_url, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateProductImage = async (req, res) => {
  const { id } = req.params;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: 'No se subió ninguna imagen' });
  }

  try {
    const imagePath = `/uploads/${image.filename}`;

    // ✅ Usamos el nombre correcto de la columna según tu DB: image_url
    const result = await pool.query(
      'UPDATE products SET image_url = $1 WHERE id = $2 RETURNING *',
      [imagePath, id]
    );

    if (result.rowCount === 0) {
      // Si el producto no existe, eliminamos la imagen subida
      fs.unlinkSync(image.path);
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Imagen actualizada', product: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar imagen' });
  }
};
