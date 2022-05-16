import React from "react";
import { Link } from "react-router-dom";
import CardBlog from "./CardBlog";

const Blogs = () => {
  const WIDTH_BLOGS = "3/4";
  const WIDTH_CATEGORIES = "1/4";

  const listBlogs = [
    {
      name: "Font-End Developer",
      path: "/font_end",
    },
    {
      name: "Back-End Developer",
      path: "/back_end",
    },
    {
      name: "Other",
      path: "/other",
    },
  ];

  return (
    <>
      {/* Introduce user blog */}
      <div className="m-3">
        <h1 className="font-bold text-[35px]">{`Tiêu đề blogs`}</h1>
        <p className="">
          Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online
          và các kỹ thuật lập trình web.
        </p>
      </div>

      <div className="flex p-3 mt-5 md:flex-row sm:flex-col-reverse xs:flex-col-reverse">
        <div className={`md:w-3/4 sm:w-full xs:w-full`}>
          {/* List Blogs */}
          <div className="">
            <CardBlog />
          </div>
        </div>

        {/* List Categories */}
        <div className={`md:w-1/4 m-3`}>
          <h1 className="font-bold text-[20px]">List Categories</h1>
          <div className="mt-5 sm:w-full flex-wrap">
            {listBlogs.map((item, index) => {
              return (
                <div
                  className="bg-slate-300 text-color-black inline-block m-2 p-3 rounded-full text-center hover:bg-sky-600 hover:text-color-white shadow-md"
                  key={index}
                >
                  <Link to={`${item.path}`}>{item.name}</Link>
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
