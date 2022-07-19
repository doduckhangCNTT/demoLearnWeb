import { Response } from "express";
import { IReqAuth } from "../../config/interface";
import RoomChatModel from "../../models/roomChatModel";

const roomChatCtrl = {
  createRoomChat: async (req: IReqAuth, res: Response) => {
    try {
      const { nameRoom, listUser } = req.body;
      if (listUser.length < 2)
        return res.status(400).json({ msg: "Quantity users not available" });

      listUser.push(req.user);
      const roomChat = new RoomChatModel({
        name: nameRoom,
        users: listUser,
        admin: req.user,
      });

      await roomChat.save();

      res.json({ msg: "Create Room Chat successfully!" });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  getRoomChats: async (req: IReqAuth, res: Response) => {
    try {
      const rooms = await RoomChatModel.find({
        users: { $elemMatch: { $eq: req.user?._id } },
      })
        .populate("users", "-password -rf_token")
        .populate("admin", "-password -rf_token");

      res.json(rooms);
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  getRoomChat: async (req: IReqAuth, res: Response) => {
    try {
      const room = await RoomChatModel.findOne({
        _id: req.params.id,
      })
        .populate("users", "-password -rf_token")
        .populate("admin", "-password -rf_token");

      res.json(room);
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateRoomChat: async (req: IReqAuth, res: Response) => {
    try {
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  deleteRoomChat: async (req: IReqAuth, res: Response) => {
    try {
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

export default roomChatCtrl;
