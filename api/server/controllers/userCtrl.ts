import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";

import bcrypt from "bcrypt";

const userCtrl = {
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
};

export default userCtrl;
