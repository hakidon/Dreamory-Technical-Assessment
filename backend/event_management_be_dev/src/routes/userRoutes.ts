import express, { Request, Response } from 'express';
import UserService from '../services/userService';
import tokenVerificationMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// router.use('/users', tokenVerificationMiddleware);

// Get all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get a user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create a new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update a user
router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete a user
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    if (user) {
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
