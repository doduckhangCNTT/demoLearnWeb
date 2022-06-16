import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentBlogAction from "../../redux/action/commentBlogAction";
import replyCommentsBlogAction from "../../redux/action/replyCommentAction/replyCommentBlogAction";
import { authSelector } from "../../redux/selector/selectors";
import {
  FormSubmit,
  IBlog,
  IComment,
  InputChangedEvent,
  IUser,
} from "../../utils/Typescript";
import InputComments from "./InputComments";

interface IProps {
  comment: IComment;
  blog?: IBlog;
}

const ShowComment: React.FC<IProps> = ({ blog, comment }) => {
  const { authUser } = useSelector(authSelector);
  const [checkEdit, setCheckEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);
  const dispatch = useDispatch();

  const initialState = {
    text: "",
    bodyUpdate: "",
  };
  const [commentBody, setCommentBody] = useState(initialState);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setCommentBody({ ...commentBody, [name]: value });
  };

  const handleSaveCommentBlog = () => {
    if (!authUser.access_token || !blog) return;
    const body = { ...comment, content: commentBody.bodyUpdate.trim() };
    CommentBlogAction.updateCommentBlog(body, authUser.access_token, dispatch);

    // setCommentBody({ ...commentBody, text: body.content });

    setCheckEdit(false);
  };

  const handleUpdateCommentBlog = () => {
    if (!authUser.access_token) return;
    setCheckEdit(true);
    setCommentBody({ ...commentBody, bodyUpdate: comment.content });
  };

  const handleDeleteCommentBlog = () => {
    if (!authUser.access_token) return;
    CommentBlogAction.deleteCommentBlog(
      comment,
      authUser.access_token,
      dispatch
    );
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!blog || !authUser.access_token) return;

    const data = {
      content: commentBody?.text.trim(),
      user: authUser.user as IUser,
      blog_id: blog._id as string,
      blog_of_userID: (blog.user as IUser)._id,
      reply_comment: [],
      reply_user: comment.user,
      rootComment_answeredId: comment._id,
      createdAt: new Date().toISOString(),
    };

    replyCommentsBlogAction.createCommentBlog(
      data,
      authUser.access_token,
      dispatch
    );
  };

  return (
    <div className="flex gap-3 mt-5 w-full">
      <div className="">
        <img
          src={comment?.user.avatar}
          alt=""
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col gap-2 bg-slate-300 rounded-lg p-2">
          <div className="">
            <h1 className="font-bold text-[20px]">{comment.user.name}</h1>
          </div>

          {checkEdit ? (
            <div className="relative">
              <input
                type="text"
                name="bodyUpdate"
                onChange={handleChangeInput}
                value={commentBody.bodyUpdate}
                className="w-full outline-none p-2 rounded"
              />

              <div
                onClick={() => setCheckEdit(false)}
                className="rounded-full w-[25px] h-[25px] -top-[10px] -right-[10px] absolute border-2 hover:bg-sky-600 hover:text-white flex justify-center items-center cursor-pointer p-2 transition"
              >
                X
              </div>
            </div>
          ) : (
            <div className="">{comment.content}</div>
          )}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="hover:text-sky-600 transition cursor-pointer">
              Like
            </div>
            <div
              onClick={() => setOnReply(!onReply)}
              className="hover:text-sky-600 transition cursor-pointer"
            >
              Reply
            </div>
            <div className="">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </div>

          {comment.user._id === authUser.user?._id ? (
            <div className="flex gap-2">
              {checkEdit ? (
                <button
                  onClick={handleSaveCommentBlog}
                  className="border rounded hover:bg-cyan-600 hover:text-white transition p-1"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleUpdateCommentBlog}
                  className="border rounded hover:bg-cyan-600 hover:text-white transition p-1"
                >
                  Update
                </button>
              )}

              <button
                onClick={handleDeleteCommentBlog}
                className="border rounded hover:bg-cyan-600 hover:text-white transition p-1"
              >
                Delete
              </button>
            </div>
          ) : (blog?.user as IUser)._id === authUser.user?._id ? (
            <button
              onClick={handleDeleteCommentBlog}
              className="border rounded hover:bg-cyan-600 hover:text-white transition p-1"
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
        {onReply ? (
          <InputComments
            handleChangeInput={handleChangeInput}
            handleSubmit={handleSubmit}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ShowComment;
