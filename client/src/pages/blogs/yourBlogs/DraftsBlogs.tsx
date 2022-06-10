import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../../components/global/NotFound";
import blogAction from "../../../redux/action/blogAction";
import {
  authSelector,
  draftBlogSelector,
} from "../../../redux/selector/selectors";
import CardDraftBlog from "../Card/CardDraftBlog";

const DraftsBlogs = () => {
  const { authUser } = useSelector(authSelector);
  const { draftBlogs } = useSelector(draftBlogSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser.access_token) return;
    blogAction.getDraftBlogs(authUser.access_token, dispatch);
  }, [dispatch, authUser.access_token]);

  if (!authUser.access_token) return <NotFound />;
  return (
    <div className="flex col-span-2 gap-2">
      {draftBlogs.map((item, index) => {
        return (
          <div className="" key={index}>
            <CardDraftBlog blog={item} />
          </div>
        );
      })}
    </div>
  );
};

export default DraftsBlogs;
