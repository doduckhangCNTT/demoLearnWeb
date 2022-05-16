import express from "express";
import uploadImgCtrl from "../controllers/uploadImgCtrl";
import authUser from "../middleware/auth/authUser";

const router = express.Router();

router.post("/upload", authUser, uploadImgCtrl.uploadImg);

router.post("/destroy", authUser, uploadImgCtrl.destroyImg); //

export default router;
