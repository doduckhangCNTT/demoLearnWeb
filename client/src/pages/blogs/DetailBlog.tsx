import React, { useState } from "react";
import Comments from "../comments/Comments";
import InfoCreator from "./InfoCreator";

const DetailBlog = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="h-full">
      <div className="flex gap-5 w-4/5 mx-auto">
        <div className="w-[20%] fixed p-3 top-1/5">
          <div className=" shadow-lg rounded w-2/3 p-3">
            <div className="">Ten nguoi tao</div>
            <div className="flex gap-5 border-t-2 mt-5 py-3">
              <div className="">Heart</div>
              <div
                className="cursor-pointer"
                onClick={() => setToggle(!toggle)}
              >
                Comment
              </div>
            </div>
          </div>
        </div>

        <div className="w-[20%] top-1/3"></div>
        <div className="w-[80%]">
          <div className="text-center">
            <h1 className="font-bold text-[30px]">Title Blog</h1>
          </div>

          <div className="">
            <div className="my-5">
              <InfoCreator />
            </div>
            <div className="">Content Blog</div>
          </div>
        </div>
      </div>

      {toggle ? (
        <div className="flex absolute transition top-0 right-0 bottom-0 h-full w-full">
          <div
            onClick={() => setToggle(!toggle)}
            className="opacity-50 w-[55%] cursor-pointer bg-slate-300 "
          ></div>
          <div className=" w-[45%] bg-white shadow-md ">
            <div className="relative">
              <button
                onClick={() => setToggle(!toggle)}
                className="top-0 right-0 absolute m-5 hover:text-sky-600"
              >
                Close
              </button>
            </div>

            <div className="m-10">
              <Comments />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DetailBlog;
