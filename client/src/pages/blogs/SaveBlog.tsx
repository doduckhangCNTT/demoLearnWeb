import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../components/global/NotFound";
import saveBlogUserAction from "../../redux/action/saveBlogUserAction";
import {
  authSelector,
  saveBlogsOfUserSelector,
} from "../../redux/selector/selectors";
import CardSaveBlog from "./Card/CardSaveBlog";

const SaveBlog = () => {
  const { authUser } = useSelector(authSelector);
  const { saveBlogUser } = useSelector(saveBlogsOfUserSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser.access_token || !authUser.user) return;
    saveBlogUserAction.getBlogUser(
      authUser.user?._id,
      authUser.access_token,
      dispatch
    );
  }, [authUser.access_token, authUser.user, dispatch]);

  if (!authUser.access_token) return <NotFound />;
  return (
    <div className="m-5">
      <h1 className="text-[30px]">
        {" "}
        Quantity Blog Saved {saveBlogUser.blogsSave.length}
      </h1>
      <div className="flex gap-2">
        <div className="w-2/3">
          {saveBlogUser.blogsSave.map((item, index) => {
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
