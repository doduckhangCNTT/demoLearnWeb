import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";

import bcrypt from "bcrypt";

const userCtrl = {
  getUsers: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Authentication" });
    }
    try {
      const users = await Users.find().select("-password").sort("-createdAt");

      res.json({ users });
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  getUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Authentication" });
    }
    try {
      const user = await Users.findById(req.params.id).select("-password");
      if (!user)
        return res
          .status(400)
          .json({ success: false, msg: "Invalid Authentication" });

      res.json({ user });
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Authentication" });
    }
    try {
      const { name, avatar, bio, telephoneNumber } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        { name, avatar, bio, telephoneNumber }
      );

      res.json({ success: true, msg: "Updated user successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  updateOneComponentOfUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Authentication" });
    }
    try {
      const { name, user } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { [`${name}`]: user[`${name}`] }
      );

      res.json({ success: true, msg: "Updated item successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  deleteUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Authentication" });
    }
    try {
      await Users.findOneAndDelete({ _id: req.params.id });

      res.json({ success: true, msg: "Delete user successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  resetPassword: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "User not found" });

    if (req.user.type !== "register") {
      return res.status(400).json({
        msg: `Quick login account with ${req.user.type} can't use this function`,
      });
    }
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { password: passwordHash }
      );

      res.json({ success: true, msg: "Updated password is successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },

  uploadImg: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Authentication" });
    }
    try {
      const { url } = req.body;

      await Users.findOneAndUpdate({ _id: req.user._id }, { avatar: url });

      res.json({ success: true, msg: "Updated item successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, msg: error.message });
    }
  },
};

export default userCtrl;
