import express from "express";
import courseCtrl from "../controllers/course/courseCtrl";
import authAdmin from "../middleware/auth/authAdmin";
import authUser from "../middleware/auth/authUser";

const router = express.Router();

router.get("/courses", authUser, courseCtrl.getCourses);

router.get("/course/:id", authUser, authAdmin, courseCtrl.getCourse);

router.get(
  "/course/:courseId/chapter/:chapterId",
  authUser,
  authAdmin,
  courseCtrl.getChapterCourse
);

router.post(
  "/course/:courseId/chapter/:chapterId/lesson",
  authUser,
  authAdmin,
  courseCtrl.createLessonOfChapter
);

router.post("/course", authUser, authAdmin, courseCtrl.createCourse);

router.patch(
  "/chapter/course/:courseId",
  authUser,
  authAdmin,
  courseCtrl.createChapterOfCourse
);

router
  .route("/courses/:courseId/chapter/:chapterId/lesson/:lessonId")
  .patch(courseCtrl.updateCourse)
  // .delete(courseCtrl.deleteCourse);
  .delete(authUser, authAdmin, courseCtrl.deleteLessonOfChapter);

export default router;