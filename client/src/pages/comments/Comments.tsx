import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentBlogAction from "../../redux/action/commentBlogAction";
import {
  authSelector,
  commentBlogSelector,
} from "../../redux/selector/selectors";
import {
  FormSubmit,
  IBlog,
  IComment,
  InputChangedEvent,
  IUser,
} from "../../utils/Typescript";
import InputComments from "./InputComments";
import ShowComment from "./ShowComment";

interface IProps {
  blog?: IBlog;
}

const Comments: React.FC<IProps> = ({ blog }) => {
  const initialState = {
    text: "",
  };
  const [comment, setComment] = useState(initialState);
  const { commentsBlog } = useSelector(commentBlogSelector);
  const { authUser } = useSelector(authSelector);

  console.log("Comment Blog: ", commentsBlog);

  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (!blog) return;
    CommentBlogAction.getCommentsBlog(blog, dispatch);
  }, [blog, dispatch]);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    const solution = async () => {
      if (!blog) return;
      if (!authUser.access_token) return;
      const data = {
        content: comment.text.trim(),
        user: authUser.user as IUser,
        blog_id: blog._id as string,
        blog_of_userID: (blog.user as IUser)._id,
        reply_comment: [],
        createdAt: new Date().toISOString(),
      };
      // setShowComments([data, ...showComments]);
      await CommentBlogAction.createCommentBlog(data, authUser, dispatch);
      CommentBlogAction.getCommentsBlog(blog, dispatch);
    };

    solution();
    setComment(initialState);
  };

  useEffect(() => {
    setShowComments((commentsBlog as any).comments);
  }, [blog?._id, commentsBlog]);

  return (
    <div>
      <div className="mt-[100px]">
        <h1 className="font-bold text-[20px]">
          So luong binh luan {showComments?.length}
        </h1>
      </div>

      {/* Comment your comment */}
      {authUser.access_token ? (
        <InputComments
          comment={comment}
          handleSubmit={handleSubmit}
          handleChangeInput={handleChangeInput}
        />
      ) : (
        <div className="mt-[10px]">
          You need Login to comment
          <Link to="/login" className="text-sky-600">
            {" "}
            Login{" "}
          </Link>
        </div>
      )}

      {/* List comment  */}
      <div className="flex-col gap-2 w-full">
        {showComments
          ? showComments?.map(
              (item: IComment, index: React.Key | null | undefined) => {
                return (
                  <div className="" key={index}>
                    <ShowComment blog={blog} comment={item} />
                  </div>
                );
              }
            )
          : ""}
      </div>
    </div>
  );
};

export default Comments;
