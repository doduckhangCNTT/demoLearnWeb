import { Response } from "express";
import { IReqAuth } from "../config/interface";
import Conversations from "../models/conversationModel";
import Messages from "../models/messagesModel";

const messageCtrl = {
  createMessage: async (req: IReqAuth, res: Response) => {
    try {
      const { sender, recipient, text, media } = req.body;

      console.log("Media: ", media);
      const newConversation = await Conversations.findOneAndUpdate(
        {
          $or: [
            { recipients: [sender, recipient] },
            { recipients: [recipient, sender] },
          ],
        },
        {
          recipients: [sender, recipient],
          text,
          media,
        },
        { new: true, upsert: true }
      );

      const newMessage = new Messages({
        conversation: newConversation._id,
        sender,
        recipient,
        text,
        media,
      });

      await newMessage.save();

      res.json(newMessage);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getConversations: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "User need Login" });

    try {
      const conversations = await Conversations.find({
        recipients: req.user._id,
      }).populate("recipients");

      res.json({
        conversations,
        result: conversations.length,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getMessages: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "User need Login" });

    try {
      const messages = await Messages.find({
        $or: [
          { sender: req.user._id, recipient: req.params.recipientId },
          { sender: req.params.recipientId, recipient: req.user._id },
        ],
      }).populate("sender recipient");

      res.json({
        messages,
        result: messages.length,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteMessage: async (req: IReqAuth, res: Response) => {
    try {
      const message = await Messages.findOneAndDelete({ _id: req.params.id });

      res.json({ msg: "Delete successfully", message: message });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default messageCtrl;
