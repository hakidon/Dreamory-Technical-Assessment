import express, { Request, Response } from 'express';
import { generateToken } from '../utils/jwtUtils';
import AuthService from '../services/authService';
import tokenVerificationMiddleware from '../middlewares/authMiddleware';
import bcrypt from 'bcrypt';
import UserService from '../services/userService';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    console.log(user)
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await AuthService.comparePassword(user, password);
    if (isMatch) {
      const token = generateToken((user._id as string).toString());
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/verify', tokenVerificationMiddleware, (req: Request, res: Response) => {
  if (req.body.isTokenValid) {
    res.status(200).json({ message: 'Token is valid', valid: true });
  } else {
    res.status(200).json({ message: 'Token is invalid', valid: false });
  }
});

router.post('/check-id-password', async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const user = await AuthService.getUserById(user_id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Credentials are correct' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
