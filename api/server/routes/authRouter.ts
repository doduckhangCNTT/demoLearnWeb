import express from "express";
import authCtrl from "../controllers/authCtrl";
import authAdmin from "../middleware/auth/authAdmin";
import authUser from "../middleware/auth/authUser";
import { validRegister } from "../middleware/valid";

const router = express.Router();

router.post("/register", validRegister, authCtrl.register);

router.post("/login", authCtrl.login);

router.post("/active", authCtrl.activeAccount);

router.get("/logout", authUser, authCtrl.logout);

router.get("/refresh_token", authCtrl.refreshToken);

export default router;
