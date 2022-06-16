import { Response } from "express";
import mongoose from "mongoose";
import { IReqAuth } from "../config/interface";
import CommentBlog from "../models/commentBlogModel";

const commentBlogCtrl = {
  createCommentBlog: async (req: IReqAuth, res: Response) => {
    try {
      const { content, blog_id, blog_of_userID } = req.body;

      console.log({ content, blog_id, blog_of_userID });

      const newCommentBlog = new CommentBlog({
        user: req.user?._id,
        content,
        blog_id,
        blog_of_userID,
      });

      await newCommentBlog.save();

      res.json({
        success: true,
        msg: "Created comment Blog successfully",
        newCommentBlog,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getCommentsBlog: async (req: IReqAuth, res: Response) => {
    try {
      const Data = await CommentBlog.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  blog_id: new mongoose.Types.ObjectId(req.params.id),
                },
              },

              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { password: 0, rf_token: 0 } },
                  ],
                  as: "user",
                },
              },
              { $unwind: "$user" },

              {
                $group: {
                  _id: "$blog_id",
                  userComment: { $first: "$user" },
                  comments: { $push: "$$ROOT" },
                  count: { $sum: 1 },
                },
              },
            ],

            totalCount: [],
          },
        },
      ]);

      const comments = Data[0].totalData;

      res.json(comments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCommentBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "Invalid Authentication" });
    }

    try {
      const comment = await CommentBlog.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user?.id,
        },
        { content: req.body?.content }
      );

      if (!comment) return res.status(400).json({ msg: "Comment not found" });

      res.json(comment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCommentBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "Invalid Authentication" });
    }

    try {
      const comment = await CommentBlog.findOneAndDelete({
        _id: req.params.id,
        // user: req.user?.id,
      });

      if (!comment) return res.status(400).json({ msg: "Comment not found" });

      res.json(comment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default commentBlogCtrl;
