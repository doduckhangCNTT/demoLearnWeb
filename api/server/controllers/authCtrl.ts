import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
} from "../config/generateToken";
import { validEmail, validPhone } from "../middleware/valid";
import sendEmail from "../config/sendMail";
import jwt from "jsonwebtoken";
import { IDecodedToken, IReqAuth, IUser } from "../config/interface";

const userCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      if (!name || !account || !password) {
        return res.json({ msg: "Invalid information" });
      }
      const user = await Users.findOne({ account });
      if (user) {
        return res.json({ msg: "User already exists" });
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = { name, account, password: passwordHash };

      // Tao accesstoken
      const access_token = generateActiveToken({ newUser });

      const url = `${process.env.BASE_URL}/active/${access_token}`;
      // Check register with pass or phone
      if (validEmail(account)) {
        sendEmail(account, url, "Verify your email");
        return res.json({
          success: true,
          access_token,
          message: "Please check your email.",
        });
      } else if (validPhone(account)) {
      }
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;
      if (!account || !password) {
        return res.json({ msg: "Invalid information" });
      }
      if (!validEmail(account)) {
        return res.json({ msg: "Email incorrect format" });
      }
      const user = await Users.findOne({ account });
      if (!user) {
        return res.json({ msg: "User not found" });
      }

      loginUser(user, password, res);
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      await Users.findOneAndUpdate({ _id: req.user._id }, { rf_token: "" });

      res.json({ msg: "Logged out" });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      console.log("RefToken: ", rf_token);
      if (!rf_token) {
        return res.json({ msg: "You need Login or Register 1" });
      }

      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );
      if (!decoded.id) {
        return res.status(400).json({ msg: "You need Login or Register 2" });
      }

      const user = await Users.findById(decoded.id).select(
        "-password +rf_token"
      );
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      if (rf_token !== user.rf_token) {
        return res.status(400).json({ msg: "You need Login or Register 3" });
      }

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      await Users.findOneAndUpdate(
        { _id: user._id },
        { rf_token: refresh_token }
      );

      res.json({
        success: true,
        msg: "Refresh token was successfully",
        user,
        access_token,
      });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );
      const { newUser } = decoded;
      // console.log("Decoded: ", decoded);
      if (!newUser) {
        return res.json({ msg: "Invalid Authentication" });
      }
      const user = await Users.findOne({ account: newUser.account });
      if (user) {
        return res.json({ msg: "User already exists" });
      }
      const new_user = new Users(newUser);
      await new_user.save();
      res.json({ msg: "Register successfully" });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const check = await bcrypt.compare(password, user.password);
  if (!check) return res.json({ msg: "User password mismatch" });

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);

  await Users.findOneAndUpdate({ _id: user._id }, { rf_token: refresh_token });

  res.json({
    msg: "Login successful",
    access_token,
    refresh_token,
    user: { ...user._doc, password: "" },
  });
};

export default userCtrl;
