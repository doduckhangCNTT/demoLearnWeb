import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../components/global/NotFound";
import saveBlogAction from "../../redux/action/saveBlogAction";
import {
  authSelector,
  saveBlogUserSelector,
} from "../../redux/selector/selectors";
import { IBookMarkBlogUser } from "../../utils/Typescript";
import CardSaveBlog from "./Card/CardSaveBlog";

const SaveBlog = () => {
  const { authUser } = useSelector(authSelector);
  const { saveBlog } = useSelector(saveBlogUserSelector);
  const dispatch = useDispatch();

  const [blogsSaved, setBlogsSaved] = useState<IBookMarkBlogUser>();

  useEffect(() => {
    if (!authUser.access_token || !authUser.user) return;
    saveBlogAction.getBlogs(authUser.access_token, dispatch);
  }, [authUser.access_token, authUser.user, dispatch]);

  useEffect(() => {
    const listBlogsSaved = saveBlog.find(
      (item) => item._id === authUser.user?._id
    );
    setBlogsSaved(listBlogsSaved);
  }, [authUser.user?._id, saveBlog]);

  if (!authUser.access_token) return <NotFound />;
  return (
    <div className="m-5">
      <h1 className="text-[30px]"> Quantity Blog Saved {blogsSaved?.count}</h1>
      <div className="flex gap-2">
        <div className="w-2/3">
          {blogsSaved?.blogs?.map((item, index) => {
            return (
              <div key={index}>
                <CardSaveBlog blog={item} />
              </div>
            );
          })}
        </div>

        <div className="w-1/3">
          <h1 className="text-[20px] font-bold text-center">Introduce Blog</h1>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SaveBlog;
