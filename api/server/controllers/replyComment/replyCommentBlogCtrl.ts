import { Response } from "express";
import { IReqAuth } from "../../config/interface";
import ReplyCommentBlogModel from "../../models/replyCommentBlogModel";
import CommentBlogModel from "../../models/commentBlogModel";
import mongoose from "mongoose";

const replyCommentsBlogCtrl = {
  createCommentReplyBlog: async (req: IReqAuth, res: Response) => {
    try {
      const {
        content,
        blog_id,
        blog_of_userID,
        rootComment_answeredId,
        reply_user,
      } = req.body;

      const newReplyComment = new ReplyCommentBlogModel({
        user: req.user?._id,
        content,
        blog_id,
        blog_of_userID,

        rootComment_answeredId,
        reply_user: reply_user._id,
      });

      await CommentBlogModel.findOneAndUpdate(
        {
          _id: rootComment_answeredId,
        },
        {
          $push: { reply_comment: newReplyComment._id },
        }
      );

      await newReplyComment.save();
      res.json(newReplyComment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getCommentsReplyBlog: async (req: IReqAuth, res: Response) => {
    try {
      const Data = await ReplyCommentBlogModel.aggregate([
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
                  let: { reply_user_id: "$reply_user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$reply_user_id"] } } },
                    { $project: { password: 0 } },
                  ],
                  as: "reply_user",
                },
              },
              { $unwind: "$reply_user" },

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
                $group: {
                  _id: "$blog_id",
                  userReplyComment: { $first: "$user" },
                  replyComments: { $push: "$$ROOT" },
                  count: { $sum: 1 },
                },
              },
            ],
            totalCount: [],
          },
        },
      ]);

      const replyComments = Data[0].totalData;

      res.json(replyComments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCommentReplyBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.json({ msg: "Invalid Authentication" });
    }

    try {
      const replyComment = await ReplyCommentBlogModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { content: req.body?.content }
      );

      if (!replyComment)
        return res.status(400).json({ msg: "ReplyComment not found" });

      res.json(replyComment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCommentReplyBlog: async (req: IReqAuth, res: Response) => {
    try {
      const replyComment = await ReplyCommentBlogModel.findOneAndDelete({
        _id: req.params.id,
      });

      if (!replyComment) {
        return res
          .status(400)
          .json({ success: false, msg: "ReplyComment not found" });
      }

      res.json(replyComment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCommentRootBlog: async (req: IReqAuth, res: Response) => {
    try {
      console.log({ body: req.body });
      console.log({ id: req.params.id });
      const comment = await CommentBlogModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { reply_comment: req.body?.replyComment }
      );

      if (!comment) {
        return res
          .status(400)
          .json({ success: false, msg: "ReplyComment not found" });
      }

      res.json(comment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default replyCommentsBlogCtrl;
