import { Response } from "express";
import { IReqAuth } from "../../config/interface";
import ReplyCommentBlogModel from "../../models/replyCommentBlogModel";
import CommentBlogModel from "../../models/commentBlogModel";

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
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCommentReplyBlog: async (req: IReqAuth, res: Response) => {
    try {
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCommentReplyBlog: async (req: IReqAuth, res: Response) => {
    try {
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default replyCommentsBlogCtrl;
