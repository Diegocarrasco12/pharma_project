import pool from '../config/db.js';
import nodemailer from 'nodemailer';

// 📩 Manejar envío de mensaje de contacto
export const handleContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message || message.length < 10) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios y el mensaje debe tener al menos 10 caracteres.' });
  }

  try {
    // Guardar mensaje en la base de datos
    await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    // Enviar correo
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Pharma Project" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: 'Nuevo mensaje de contacto',
      text: `De: ${name}\nEmail: ${email}\n\n${message}`
    });

    // Respuesta
    res.status(200).json({ message: 'Mensaje enviado y guardado con éxito' });

  } catch (error) {
    console.error('Error al manejar el formulario de contacto:', error);
    res.status(500).json({ error: 'Hubo un problema al enviar o guardar el mensaje' });
  }
};

// 🗂️ Obtener todos los mensajes (solo admin)
export const getAllMessages = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener mensajes de contacto:', error);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
};
