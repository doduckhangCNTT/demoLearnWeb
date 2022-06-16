import authRouter from "./authRouter";
import userRouter from "./userRouter";
import categoryRouter from "./categoryRouter";
import cloudImgRouter from "./cloudImgRouter";
import blogRouter from "./blogRouter";
import saveBlogRouter from "./saveBlogRouter";
import commentBlogRouter from "./commentBlogRouter";
import replyCommentBlogRouter from "./replyCommentBlogRouter";

const routes = [
  authRouter,
  userRouter,
  categoryRouter,
  cloudImgRouter,
  blogRouter,
  saveBlogRouter,

  commentBlogRouter,
  replyCommentBlogRouter,
];

export default routes;
