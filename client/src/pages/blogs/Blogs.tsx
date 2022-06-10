import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  blogSelector,
  categorySelector,
  saveBlogUserSelector,
  authSelector,
  blogsCategorySelector,
} from "../../redux/selector/selectors";
import CardBlog from "./Card/CardBlog";
import BlogOfCategory from "./yourBlogs/BlogOfCategory";
import saveBlogAction from "../../redux/action/saveBlogAction";
import { IBookMarkBlogUser, IGetBlogsCategory } from "../../utils/Typescript";
import blogAction from "../../redux/action/blogAction";
import categoryAction from "../../redux/action/categoryAction";

const Blogs = () => {
  const { option } = useParams();

  const { blogs } = useSelector(blogSelector);
  const { categories } = useSelector(categorySelector);
  const { saveBlog } = useSelector(saveBlogUserSelector);
  const { blogsCategory } = useSelector(blogsCategorySelector);
  const { authUser } = useSelector(authSelector);

  const dispatch = useDispatch();

  const [blogsOfCategory, setBlogsOfCategory] = useState<IGetBlogsCategory>();
  const [blogsSaved, setBlogsSaved] = useState<IBookMarkBlogUser>();

  useEffect(() => {
    blogAction.getBlogs(dispatch);
    categoryAction.getCategory(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (!authUser.access_token) return;
    saveBlogAction.getBlogs(authUser.access_token, dispatch);
  }, [authUser.access_token, dispatch]);

  useEffect(() => {
    const listBlogsSaved = saveBlog.find(
      (item) => item._id === authUser.user?._id
    );
    setBlogsSaved(listBlogsSaved);
  }, [authUser.user?._id, saveBlog]);

  useEffect(() => {
    const blogCategory = blogsCategory.find((item) => item._id === option);
    setBlogsOfCategory(blogCategory);
  }, [blogsCategory, option]);

  return (
    <>
      {/* Introduce user blog */}
      <div className="m-3">
        <div className="flex items-end">
          <h1 className="font-bold text-[35px] capitalize">
            {blogsOfCategory?.category.name?.replace("_", " ")}
          </h1>
        </div>
        <p className="">
          Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online
          và các kỹ thuật lập trình web.
        </p>
      </div>

      <div className="flex p-3 mt-5 md:flex-row sm:flex-col-reverse xs:flex-col-reverse">
        <div className={`md:w-3/4 sm:w-full xs:w-full`}>
          {/* List Blogs */}
          {option ? (
            <BlogOfCategory />
          ) : (
            blogs.map((blog, index) => {
              if (!blog._id) return [];
              const res = blogsSaved?.blogs?.find(
                (item) => blog._id === item.id_blog
              );
              return (
                <div className="" key={index}>
                  {res ? (
                    <CardBlog blog={blog} bookmark={res} />
                  ) : (
                    <CardBlog blog={blog} />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* List Categories */}
        <div className={`md:w-1/4 m-3 z-1`}>
          <h1 className="font-bold text-[20px]">List Categories</h1>
          <div className="mt-5 sm:w-full flex-wrap">
            <div className="bg-slate-300 relative text-color-black inline-block m-2 p-3 rounded-full text-center hover:bg-sky-600 hover:text-color-white shadow-md">
              <Link to={`/blogs`}>All</Link>
            </div>
            {categories.map((item, index) => {
              return (
                <div
                  className="bg-slate-300 relative text-color-black inline-block m-2 p-3 rounded-full text-center hover:bg-sky-600 hover:text-color-white shadow-md"
                  key={index}
                >
                  <Link to={`category/${item._id}`}>{item.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
