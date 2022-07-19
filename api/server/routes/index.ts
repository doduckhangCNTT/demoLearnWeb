import authRouter from "./authRouter";
import userRouter from "./userRouter";
import categoryRouter from "./categoryRouter";
import cloudImgRouter from "./cloudImgRouter";
import blogRouter from "./blogRouter";
import saveBlogRouter from "./saveBlogRouter";
import commentBlogRouter from "./commentBlogRouter";
import replyCommentBlogRouter from "./replyCommentBlogRouter";
import messageRouter from "./messageRouter";
import roomChatRouter from "./roomChat/roomChatRouter";
import messageRoomCharRouter from "./roomChat/messageRoomChatRouter";

const routes = [
  authRouter,
  userRouter,
  categoryRouter,
  cloudImgRouter,
  blogRouter,
  saveBlogRouter,

  commentBlogRouter,
  replyCommentBlogRouter,

  messageRouter,
  messageRoomCharRouter,
  roomChatRouter,
];

export default routes;
