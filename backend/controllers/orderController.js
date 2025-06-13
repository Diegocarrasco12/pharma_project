import pool from '../config/db.js';

// 🛒 Crear una orden completa con múltiples ítems
export const createFullOrder = async (req, res) => {
  const { cartItems, total } = req.body;
  const userId = req.user?.id;

  if (!userId || !Array.isArray(cartItems) || cartItems.length === 0 || !total) {
    return res.status(400).json({ message: 'Datos incompletos para registrar la orden' });
  }

  try {
    // Crear orden principal
    const orderResult = await pool.query(
      'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id',
      [userId, total]
    );

    const orderId = orderResult.rows[0].id;

    // Insertar ítems de la orden
    for (const item of cartItems) {
      const { productId, quantity, price } = item;

      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, productId, quantity, price]
      );
    }

    res.status(201).json({ message: 'Orden registrada exitosamente', orderId });
  } catch (error) {
    console.error('❌ Error al registrar orden:', error);
    res.status(500).json({ message: 'Error al registrar la orden' });
  }
};

// 🔁 FUNCIÓN ORIGINAL (mantener por compatibilidad)
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

// 🔍 Obtener historial de compras de un usuario (revisar en función de estructura usada)
export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT o.id AS order_id, o.total, o.created_at,
              p.name AS product_name, p.image_url,
              oi.quantity, oi.price
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON oi.product_id = p.id
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
