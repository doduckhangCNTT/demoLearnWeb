import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { blogSelector, categorySelector } from "../../redux/selector/selectors";
import CardBlog from "./Card/CardBlog";
import BlogOfCategory from "./yourBlogs/BlogOfCategory";

const Blogs = () => {
  const { blogs } = useSelector(blogSelector);
  const { categories } = useSelector(categorySelector);

  const { option } = useParams();

  return (
    <>
      {/* Introduce user blog */}
      <div className="m-3">
        <div className="">
          <h1 className="font-bold text-[35px] capitalize">
            {option?.replace("_", " ")}
          </h1>
          <div>{/* {blogsCategory} */}</div>
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
              return (
                <div className="" key={index}>
                  <CardBlog blog={blog} />
                </div>
              );
            })
          )}
        </div>

        {/* List Categories */}
        <div className={`md:w-1/4 m-3`}>
          <h1 className="font-bold text-[20px]">List Categories</h1>
          <div className="mt-5 sm:w-full flex-wrap">
            {categories.map((item, index) => {
              return (
                <div
                  className="bg-slate-300 relative text-color-black inline-block m-2 p-3 rounded-full text-center hover:bg-sky-600 hover:text-color-white shadow-md"
                  key={index}
                >
                  <Link to={`category/${item.name?.toLowerCase()}`}>
                    {item.name}
                  </Link>
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
