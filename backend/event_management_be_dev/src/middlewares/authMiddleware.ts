import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

const tokenVerificationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    req.body.isTokenValid = false;
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.body.decoded = decoded;
    req.body.isTokenValid = true;
    next();
  } catch (error) {
    req.body.isTokenValid = false;
    next();
  }
};

export default tokenVerificationMiddleware;
