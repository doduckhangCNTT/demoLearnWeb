import express from "express";
import userCtrl from "../controllers/userCtrl";
import authUser from "../middleware/auth/authUser";

const router = express.Router();

router.patch("/reset_password", authUser, userCtrl.resetPassword);

export default router;
