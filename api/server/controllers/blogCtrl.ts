import { Request, Response } from "express";
import mongoose from "mongoose";
import { IReqAuth } from "../config/interface";
import Blogs from "../models/blogModel";

const blogCtrl = {
  getBlogs: async (req: Request, res: Response) => {
    try {
      // const blogs = await Blogs.find().sort("-createdAt");
      const blogs = await Blogs.aggregate([
        {
          $lookup: {
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { password: 0 } },
            ],

            as: "user",
          },
        },

        { $unwind: "$user" },

        {
          $lookup: {
            from: "categories",
            let: { category_id: "$category" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$category_id"] } } },
            ],
            as: "category",
          },
        },
        { $unwind: "$category" },

        { $sort: { createdAt: -1 } },
      ]);
      res.json(blogs);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  createBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res
        .status(400)
        .json({ success: false, error: "Initial Authentication " });

    try {
      const { title, content, description, thumbnail, category } = req.body;
      const newBlog = new Blogs({
        user: req.user._id,
        title: title,
        content: content,
        description: description,
        thumbnail: thumbnail,
        category: category,
      });
      await newBlog.save();
      res.json({
        ...newBlog._doc,
        user: req.user,
        msg: "Create Blog successfully",
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getBlogsCategory: async (req: Request, res: Response) => {
    try {
      const Data = await Blogs.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  // convert id: string --> objectId
                  category: new mongoose.Types.ObjectId(req.params.id),
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { password: 0 } },
                  ],
                  as: "user",
                },
              },

              { $unwind: "$user" },
              { $sort: { createdAt: -1 } },
            ],
            totalCount: [
              {
                $match: {
                  category: new mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            totalData: 1,
            count: { $arrayElemAt: ["$totalCount.count", 0] },
          },
        },
      ]);

      const blogs = Data[0].totalData;
      const count = Data[0].count;

      res.json({ blogs, count });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getBlogsUser: async (req: IReqAuth, res: Response) => {
    try {
      const Data = await Blogs.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  user: new mongoose.Types.ObjectId(req.params.id),
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    {
                      $match: { $expr: { $eq: ["$_id", "$$user_id"] } },
                    },
                    { $project: { password: 0 } },
                  ],
                  as: "user",
                },
              },

              { $unwind: "$user" },
            ],
            totalCount: [
              {
                $match: {
                  user: new mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            totalData: 1,
            count: { $arrayElemAt: ["$totalCount.count", 0] },
          },
        },
      ]);

      const blogs = Data[0].totalData;
      const count = Data[0].count;
      res.json({ blogs, count });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const newBlog = req.body;
      const blog = await Blogs.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        newBlog
      );
      if (!blog) return res.status(400).json({ msg: "Invalid Authentication" });

      res.json({ msg: "Update Blog successfully", blog });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const blog = await Blogs.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      if (!blog) return res.status(400).json({ msg: "Invalid Authentication" });

      res.json({ msg: "Delete Blog successfully", blog });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default blogCtrl;
