import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretoSuperSeguro';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: 'Token inválido (sin ID de usuario)' });
    }


    req.user = {
      id: decoded.id,
      role: decoded.role || 'user', 
    };

    next();
  } catch (error) {
    console.error('Error al verificar token:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export default verifyToken;
