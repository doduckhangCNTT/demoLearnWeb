import React, { useState } from "react";
import { Link } from "react-router-dom";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";
import InfoCreator from "./InfoCreator";

const CardBlog = () => {
  const WIDTH_BLOG_CONTENT = "2/3";
  const WIDTH_BLOG_IMG = "1/3";

  return (
    <div className="border-2 rounded-lg p-3 my-3 ">
      <div>
        {/* Info creator */}
        <InfoCreator />
      </div>

      <div className="flex gap-5 mt-2 md:flex-row sm:flex-col-reverse xs:flex-col-reverse">
        {/* Content Blog */}
        <div
          className={`w-${WIDTH_BLOG_CONTENT} flex flex-col justify-between`}
        >
          <div className="">
            <Link to="/detail_blog">
              <h1 className="font-bold text-[25px]">{`Title Blog`}</h1>
            </Link>
            <div className="">
              <p className="">
                Mình có đọc qua vài bình luận ở dưới một số video trong khóa JS
                cơ bản và thấy một số bạn muốn có thêm bài tập thực hành (cụ
                thể...
              </p>
            </div>
          </div>

          <div>8 ngày trước·2 phút đọc</div>
        </div>

        {/* Img Blog */}
        <div className={`md:w-${WIDTH_BLOG_IMG} sm:w-full`}>
          <div className="w-full max-h-[200px]">
            <LazyLoadingImg
              url="https://images.unsplash.com/photo-1652068359232-a98e76719936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=679&q=80"
              alt=""
              className="w-full max-h-[200px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
