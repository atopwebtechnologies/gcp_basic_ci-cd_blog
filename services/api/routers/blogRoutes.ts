import express from 'express';
import { listBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';

const router = express.Router();

router.get('/', listBlogs);
router.get('/:id', getBlogById);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
