import express from 'express';
import { login, verifyToken,register } from '../controllers/auth/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verifyToken', verifyToken);

export default router;