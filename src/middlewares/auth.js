import jwt from 'jsonwebtoken';
import authConfig from './../config/auth.js';

const authMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  const token = authToken.split(' ')[1]; // Extrai o token do formato "

  try {
    jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (error) {
        throw Error('Invalid token.');
      }
      req.userId = decoded.id; // Armazena o ID do usuário no objeto de requisição
    });
  } catch (_err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
  return next();
};

export default authMiddleware;
