import express from "express";
import quickTestCtrl from "../controllers/quickTestCtrl";
import authAdmin from "../middleware/auth/authAdmin";
import authUser from "../middleware/auth/authUser";

const router = express.Router();

// router.get("/quickTests", authUser, authAdmin, quickTestCtrl.getQuickTests);
router.get("/quickTests", quickTestCtrl.getQuickTests);

router.get("/quickTest/:id", authUser, authAdmin, quickTestCtrl.getQuickTest);

router.get("/quickTest/question/:id", quickTestCtrl.getQuestion);
router.patch("/quickTest/question/:id", quickTestCtrl.updateQuestion);
router.delete("/quickTest/question/:id", quickTestCtrl.deleteQuestion);

router.post("/quickTest", authUser, authAdmin, quickTestCtrl.createQuickTest);

router
  .route("/quickTest/:id")
  .patch(authUser, authAdmin, quickTestCtrl.updateQuickTest)
  .delete(authUser, authAdmin, quickTestCtrl.deleteQuickTest);

export default router;
