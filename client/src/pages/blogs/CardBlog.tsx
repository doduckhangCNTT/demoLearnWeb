import React, { useState } from "react";
import { Link } from "react-router-dom";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";
import DropDownItem from "../DropDown";

const CardBlog = () => {
  const icons = [
    {
      iconBookmark: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      ),
      iconBookmarkSolid: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      ),
      iconOption: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const WIDTH_BLOG_CONTENT = "2/3";
  const WIDTH_BLOG_IMG = "1/3";

  const [save, setSave] = useState(false);

  return (
    <div className="border-2 rounded-lg p-3 my-3 ">
      <div className="flex items-center justify-between mx-3">
        {/* Info creator */}
        <div className="max-w-sm rounded-xl flex items-center space-x-4">
          <div className="shrink-0">
            <LazyLoadingImg
              url="https://images.unsplash.com/photo-1652068359232-a98e76719936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=679&q=80"
              alt="ChitChat Logo"
              className="h-12 w-12 rounded-full"
            />
          </div>
          <div>
            <div className="text-xl font-medium text-black">ChitChat</div>
            <p className="text-slate-500">You have a new message!</p>
          </div>
        </div>

        {/* BookMark & Option Icon */}
        <div className="">
          {icons.map((item, index) => {
            return (
              <div className="flex gap-3" key={index}>
                <div className="" onClick={() => setSave(!save)}>
                  {save ? item.iconBookmarkSolid : item.iconBookmark}
                </div>
                <div>{item.iconOption}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-5 mt-2 md:flex-row sm:flex-col-reverse xs:flex-col-reverse">
        {/* Content Blog */}
        <div
          className={`w-${WIDTH_BLOG_CONTENT} flex flex-col justify-between`}
        >
          <div className="">
            <h1 className="font-bold text-[25px]">{`Title Blog`}</h1>
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
