import express from 'express';
import User from '../controller/User';

const router = express.Router();

router.post('/registry', User.registry);

export default router;
