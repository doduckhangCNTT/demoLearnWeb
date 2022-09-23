import { Response } from "express";
import { IReqAuth } from "../../config/interface";
import CourseModel from "../../models/courseModel";

const courseCtrl = {
  createCourse: async (req: IReqAuth, res: Response) => {
    try {
      const {
        name,
        thumbnail,
        description,
        accessModifier,
        category,
        videoIntro,
        format,
        price,
        oldPrice,
        courses,
      } = req.body;

      const newCourse = new CourseModel({
        user: req.user?._id,
        name,
        thumbnail,
        description,
        accessModifier,
        category,
        videoIntro,
        format,
        price,
        oldPrice,
        courses,
      });

      await newCourse.save();

      res.json({ newCourse, message: "Course saved successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getCourses: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Authentication" });
    }
    try {
      const courses = await CourseModel.find().populate("user");

      if (!courses) {
        return res.json({ msg: "No courses found" });
      }

      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getCourse: async (req: IReqAuth, res: Response) => {
    try {
      const course = await CourseModel.findOne({ _id: req.params.id }).populate(
        "user"
      );

      if (!course) {
        return res.json({ msg: "Course not found" });
      }

      res.json(course);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateCourse: async (req: IReqAuth, res: Response) => {
    try {
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteCourse: async (req: IReqAuth, res: Response) => {
    try {
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default courseCtrl;
