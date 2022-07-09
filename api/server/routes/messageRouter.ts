import express from "express";
import messageCtrl from "../controllers/messageCtrl";
import authUser from "../middleware/auth/authUser";

const router = express.Router();

router.get("/messages/:recipientId", authUser, messageCtrl.getMessages);

router.post("/message", authUser, messageCtrl.createMessage);

router.get("/conversations", authUser, messageCtrl.getConversations);

router
  .route("/message/:id")
  .patch(authUser, messageCtrl.updateMessage)
  .delete(authUser, messageCtrl.deleteMessage);

export default router;
