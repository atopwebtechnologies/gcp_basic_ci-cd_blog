import { Router } from "express";
import {
  addBlogPost,
  updateBlogPost,
  getBlogPost,
  getAllBlogPosts,
  deleteBlogPost,
} from "./controllers";
import { cacheMiddleware } from "./cacheMiddleware";

const router = Router();

router.route("/").post(addBlogPost).get(getAllBlogPosts);

router
  .route("/:postId")
  .get(/*cacheMiddleware,*/ getBlogPost)
  .patch(updateBlogPost)
  .delete(deleteBlogPost);

export default router;
