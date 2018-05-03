import express from 'express';
import Blog from '../controller/Blog';

const router = express.Router();

router.post('/save', Blog.save);
router.get('/getBlogAllTypes', Blog.getBlogAllTypes);

export default router;
