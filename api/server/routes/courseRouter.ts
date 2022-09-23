import express from "express";
import courseCtrl from "../controllers/course/courseCtrl";
import authAdmin from "../middleware/auth/authAdmin";
import authUser from "../middleware/auth/authUser";

const router = express.Router();

router.get("/courses", authUser, courseCtrl.getCourses);

router.get("/course/:id", authUser, authAdmin, courseCtrl.getCourse);

router.post("/course", authUser, authAdmin, courseCtrl.createCourse);

router
  .route("/courses/:id")
  .patch(authUser, authAdmin, courseCtrl.updateCourse)
  .delete(authUser, authAdmin, courseCtrl.deleteCourse);

export default router;
