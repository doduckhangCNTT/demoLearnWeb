import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import QuickTestModel from "../models/quickTestModel";

const quickTestCtrl = {
  getQuickTests: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "Invalid Authentication" });
    }
    try {
      const quickTests = await QuickTestModel.find()
        .populate("user")
        .populate("category");

      res.json(quickTests);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getQuickTest: async (req: Request, res: Response) => {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide id quick test" });
    }
    try {
      const quickTest = await QuickTestModel.findOne({
        _id: req.params.id,
      }).populate("user");

      if (!quickTest) {
        return res
          .status(400)
          .json({ success: false, message: "Quick test not found" });
      }

      return res.json({ quickTest });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  createQuickTest: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "Invalid Authentication" });
    }
    try {
      const {
        titleTest,
        category,
        time,
        description,
        image,
        questions,
        numberOfTimes,
      } = req.body;

      const newQuickTest = new QuickTestModel({
        user: req.user?._id,
        titleTest,
        category,
        time,
        description,
        image,
        questions,
        numberOfTimes,
      });
      await newQuickTest.save();

      res.json({
        newQuickTest,
        user: req.user,
        message: "Create quick test successfully",
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateQuickTest: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { quickTest } = req.body;
      console.log("Quick Test: ", quickTest);
      await QuickTestModel.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        quickTest
      );

      return res.json({ success: true, message: "Added a question" });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteQuickTest: async (req: IReqAuth, res: Response) => {
    try {
      const quickTestId = req.params.id;
      const quickTest = await QuickTestModel.findOneAndDelete({
        _id: quickTestId,
      });

      return res.json({
        success: true,
        quickTest,
        msg: "Delete quick test successfully",
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getQuestion: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide id quick test" });
    }
    try {
      const question = await QuickTestModel.findOne(
        {
          "questions._id": req.params.id,
        },
        { "questions.$": 1 }
      ).populate("user");

      if (!question) {
        return res
          .status(400)
          .json({ success: false, message: "Quick test not found" });
      }

      return res.json({ question });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateQuestion: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide id quick test" });
    }
    try {
      const { newQuestion } = req.body;

      const quickQuestion = await QuickTestModel.findOneAndUpdate(
        {
          "questions._id": req.params.id,
        },
        { $set: { "questions.$": newQuestion } },
        { new: true }
      );

      if (!quickQuestion) {
        return res
          .status(400)
          .json({ success: false, message: "Quick test not found" });
      }

      return res.json({ quickQuestion, msg: "Update question successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteQuestion: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide id quick test" });
    }
    try {
      const quickQuestion = await QuickTestModel.findOneAndUpdate(
        {
          "questions._id": req.params.id,
        },
        { $pull: { questions: { _id: req.params.id } } },
        { new: true }
      );

      if (!quickQuestion) {
        return res
          .status(400)
          .json({ success: false, message: "Quick test not found" });
      }

      return res.json({ quickQuestion });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default quickTestCtrl;
