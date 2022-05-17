import React from "react";
import SelectItem from "../SelectItem";
import CardBlog from "./CardBlog";

const CreateBlog = () => {
  return (
    <div className="flex m-5 w-2/3 mx-auto flex-col gap-5">
      <div className="flex ">
        <div className="w-1/2">
          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-[20px]">Title Blog</h1>
              <input type="text" className=" p-3 " placeholder="Title Blog" />
            </div>

            <div>
              <h1 className="font-bold text-[20px] my-3">Image Blog</h1>
              <input type="file" className="" />
            </div>

            <div className="">
              <h1 className="font-bold text-[20px] my-3">Categories</h1>
              <SelectItem />
            </div>
          </form>
        </div>

        <div className="w-1/2">
          <CardBlog />
        </div>
      </div>

      <div>Content Blogs</div>

      <div className="hover:bg-sky-600 hover:text-white w-[200px] mx-auto text-center border-2 inline-block transition text-[20px] rounded px-3 cursor-pointer">
        <button className="">Save</button>
      </div>
    </div>
  );
};

export default CreateBlog;
