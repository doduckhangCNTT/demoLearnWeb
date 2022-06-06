import authRouter from "./authRouter";
import userRouter from "./userRouter";
import categoryRouter from "./categoryRouter";
import cloudImgRouter from "./cloudImgRouter";
import blogRouter from "./blogRouter";
import saveBlogRouter from "./saveBlogRouter";

const routes = [
  authRouter,
  userRouter,
  categoryRouter,
  cloudImgRouter,
  blogRouter,
  saveBlogRouter,
];

export default routes;
