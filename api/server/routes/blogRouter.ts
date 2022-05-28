import express from "express";
import blogCtrl from "../controllers/blogCtrl";
import authUser from "../middleware/auth/authUser";

const router = express.Router();

router.post("/blog", authUser, blogCtrl.createBlog);

router.get("/blog", blogCtrl.getBlogs);
router.get("/draft/blog", authUser, blogCtrl.getDraftBlogs);

router.get("/blog/category/:id", blogCtrl.getBlogsCategory);

router.get("/blog/user/:id", authUser, blogCtrl.getBlogsUser);

router
  .route("/blog/:id")
  .get(blogCtrl.getBlog)
  .put(authUser, blogCtrl.updateBlog)
  .delete(authUser, blogCtrl.deleteBlog);

router
  .route("/draftBlog/:id")
  .get(blogCtrl.getDraftBlog)
  .delete(authUser, blogCtrl.deleteDraftBlog);
export default router;
