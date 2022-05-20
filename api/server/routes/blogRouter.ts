import express from "express";
import blogCtrl from "../controllers/blogCtrl";
import authUser from "../middleware/auth/authUser";

const router = express.Router();

router.post("/blog", authUser, blogCtrl.createBlog);

router.get("/blog", blogCtrl.getBlogs);

router.get("/blog/category/:id", blogCtrl.getBlogsCategory);

router.get("/blog/user/:id", authUser, blogCtrl.getBlogsUser);

router
  .route("/blog/:id")
  .put(authUser, blogCtrl.updateBlog)
  .delete(authUser, blogCtrl.deleteBlog);

export default router;
