import pool from '../config/db.js';

export const createOrder = async (req, res) => {
  const { product_id, quantity, total_price } = req.body;
  const user_id = req.user?.id; // ✅ capturamos el id desde el token

  // Validación de campos obligatorios
  if (!user_id || !product_id || !quantity || !total_price) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO orders (user_id, product_id, quantity, total_price)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, product_id, quantity, total_price]
    );

    res.status(201).json({ message: 'Compra registrada', order: result.rows[0] });
  } catch (error) {
    console.error('Error al registrar compra:', error);
    res.status(500).json({ message: 'Error al registrar compra' });
  }
};

export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT o.*, p.name, p.image_url
       FROM orders o
       JOIN products p ON o.product_id = p.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener historial de compras:', error);
    res.status(500).json({ message: 'Error al obtener compras' });
  }
};
