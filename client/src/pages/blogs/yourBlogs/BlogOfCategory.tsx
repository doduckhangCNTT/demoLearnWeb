import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotValue from "../../../components/global/NotValue";
import blogCategoryAction from "../../../redux/action/blogCategoryAction";
import {
  blogsCategorySelector,
  categorySelector,
} from "../../../redux/selector/selectors";
import { IBlog } from "../../../utils/Typescript";
import CardBlog from "../Card/CardBlog";

const BlogOfCategory = () => {
  const { option } = useParams();
  const [categoryId, setCategoryId] = useState("");
  const [count, setCount] = useState(0);
  const [blogsOfCategory, setBlogsOfCategory] = useState<IBlog[]>([]);
  const { categories } = useSelector(categorySelector);
  const dispatch = useDispatch();
  const { blogsCategory } = useSelector(blogsCategorySelector);

  useEffect(() => {
    const category = categories.find(
      (category) => category.name?.toLowerCase() === option
    );
    setCategoryId(category?._id ? category._id : "");
  }, [categories, option]);

  useEffect(() => {
    if (!categoryId) return;

    if (blogsCategory.every((category) => category.id !== categoryId)) {
      blogCategoryAction.getBlogCategoryId(categoryId, dispatch);
    } else {
      const data = blogsCategory.find((category) => category.id === categoryId);
      if (!data) return;
      setBlogsOfCategory(data.blogs);
      setCount(data.count ? data.count : 0);
    }
  }, [categoryId, blogsCategory, dispatch]);

  return (
    <div className="">
      <div className="font-bold text-[20px]">
        Quality Blog Categories : {count}
      </div>
      {/* List Blogs */}
      <div className={`w-full`}>
        {blogsOfCategory.length > 0 ? (
          blogsOfCategory?.map((blog, index) => {
            return (
              <div className="" key={index}>
                <CardBlog blog={blog} />
              </div>
            );
          })
        ) : (
          <NotValue />
        )}
      </div>
    </div>
  );
};

export default BlogOfCategory;
