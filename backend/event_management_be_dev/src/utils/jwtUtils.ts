import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET || ''; 

export function generateToken(userId: string): string {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, secretKey);
}
