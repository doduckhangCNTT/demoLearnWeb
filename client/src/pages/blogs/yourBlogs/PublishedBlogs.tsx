import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../../components/global/NotFound";
import blogUserAction from "../../../redux/action/blogUserAction";
import {
  blogsUserSelector,
  authSelector,
} from "../../../redux/selector/selectors";
import { IBlog } from "../../../utils/Typescript";
import CardBlog from "../Card/CardBlog";

const PublishedBlogs = () => {
  const { blogsUser } = useSelector(blogsUserSelector);
  const { authUser } = useSelector(authSelector);
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser.user || !authUser.access_token) return;

    if (blogsUser.every((blog) => blog.id !== authUser.user?._id)) {
      blogUserAction.getBlogUser(
        authUser.user?._id,
        authUser.access_token,
        dispatch
      );
    } else {
      const data = blogsUser.find((blog) => blog.id === authUser.user?._id);
      if (!data) return;

      setBlogs(data.blogs);
      setCount(data.count ? data.count : 0);
    }
  }, [authUser.user, authUser.access_token, blogsUser, dispatch]);

  if (!authUser.access_token) return <NotFound />;
  return (
    <div className="flex flex-col gap-5">
      <div className="text-[20px] font-bold">Quality Blogs: {count}</div>

      <div className={`grid xl:grid-cols-2  gap-2`}>
        {/* List Blogs */}
        {blogs?.map((blog, index) => {
          return (
            <div key={index} className={`w-full h-full`}>
              <CardBlog blog={blog} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublishedBlogs;
