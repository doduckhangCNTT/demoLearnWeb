import express from "express";
import roomChatCtrl from "../../controllers/roomChat/roomChatCtrl";
import authUser from "../../middleware/auth/authUser";

const router = express.Router();

router.post("/roomChat", authUser, roomChatCtrl.createRoomChat);

router.get("/roomChats", authUser, roomChatCtrl.getRoomChats);

router.get("/roomChat/:id", authUser, roomChatCtrl.getRoomChat);

router
  .route("/roomChat/:id")
  .patch(authUser, roomChatCtrl.updateRoomChat)
  .delete(authUser, roomChatCtrl.deleteRoomChat);

export default router;
