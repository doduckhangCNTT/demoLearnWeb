import React, { useCallback, useEffect, useRef, useState } from "react";
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
import {
  IBlog,
  IBookMarkBlogUser,
  IGetBlogsCategory,
} from "../../utils/Typescript";
import blogAction from "../../redux/action/blogAction";
import categoryAction from "../../redux/action/categoryAction";
import { blogSlice } from "../../redux/reducers/blogSlice";
import { categorySlice } from "../../redux/reducers/categorySlice";
import useInfinityQuery from "../../hooks/useInfinityQuery";

const Blogs = () => {
  const { option } = useParams();

  const { blogs } = useSelector(blogSelector);
  const { categories } = useSelector(categorySelector);
  const { saveBlog } = useSelector(saveBlogUserSelector);
  const { blogsCategory } = useSelector(blogsCategorySelector);
  const { authUser } = useSelector(authSelector);

  const dispatch = useDispatch();

  const [blogsOfCategory, setBlogsOfCategory] = useState<IGetBlogsCategory>();
  // const [limit, setLimit] = useState(3);

  useEffect(() => {
    if (blogs.length > 0) {
      dispatch(blogSlice.actions.getBlog(blogs));
      dispatch(categorySlice.actions.getCategories(categories));
    } else {
      blogAction.getListBlogs(dispatch);
      categoryAction.getCategory(dispatch);
    }
  }, [dispatch, blogs.length, blogs, categories]);

  // Give Blog user saved
  useEffect(() => {
    if (!authUser.access_token) return;
    if (!(saveBlog as any).blogs) {
      saveBlogAction.getBlogs(authUser, dispatch);
    }
  }, [authUser, dispatch, saveBlog]);

  useEffect(() => {
    const blogCategory = blogsCategory.find((item) => item._id === option);
    setBlogsOfCategory(blogCategory);
  }, [blogsCategory, option]);

  const [limit, setLimit] = useState(3);
  const [qualityStart, setQualityStart] = useState(0);

  const [listBlogs, setListBlogs] = useState<IBlog[]>([]);

  // console.log({ limit, qualityStart });
  // console.log("ListBlogs: ", listBlogs);
  // console.log("Blogs: ", blogs);

  const { BtnRender } = useInfinityQuery({
    limit,
    setLimit,
    qualityStart,
    setQualityStart,
    blogs,
  });

  useEffect(() => {
    // console.log("Value");
    if (blogs && listBlogs.length < blogs?.length) {
      blogs?.slice(qualityStart, limit).forEach((blog: IBlog) => {
        const res = listBlogs?.find((item) => item._id === blog._id);
        if (!res) {
          setListBlogs((prev) => [...prev, blog]);
        }
      });
    }
  }, [limit, qualityStart, listBlogs, blogs]);

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
          T???ng h???p c??c b??i vi???t chia s??? v??? kinh nghi???m t??? h???c l???p tr??nh online
          v?? c??c k??? thu???t l???p tr??nh web.
        </p>
      </div>

      <div className="flex p-3 mt-5 md:flex-row sm:flex-col-reverse xs:flex-col-reverse">
        <div className={`md:w-3/4 sm:w-full xs:w-full`}>
          {/* List Blogs */}
          {option ? (
            <BlogOfCategory />
          ) : (
            <div>
              {listBlogs?.map((blog, index) => {
                if (!blog._id) return [];
                const res = (saveBlog as any).blogs?.find(
                  (item: { id_blog: string | undefined }) =>
                    blog._id === item.id_blog
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
              })}
              <div className=" flex justify-center">{BtnRender()}</div>
            </div>
          )}
        </div>

        {/* List Categories */}
        <div className={`md:w-1/4 m-3`}>
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
