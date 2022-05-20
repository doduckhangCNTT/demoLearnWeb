import React, { useEffect, useRef } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "../../components/editor/ReactQuill";
import { authSelector, categorySelector } from "../../redux/selector/selectors";
import { IBlog, InputChangedEvent, IUser } from "../../utils/Typescript";

import { validCreateBlog } from "../../utils/Valid";
import { alertSlice } from "../../redux/reducers/alertSlice";
import blogAction from "../../redux/action/blogAction";
import PreviewBlog from "./PreviewBlog";

const CreateBlog = () => {
  const initialState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };

  const [body, setBody] = useState("");
  const [text, setText] = useState("");
  const [blog, setBlog] = useState<IBlog>(initialState);

  const dispatch = useDispatch();
  const { categories } = useSelector(categorySelector);
  // const { authUser } = useSelector(authSelector);
  const { authUser }: IUser | any = useSelector(authSelector);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const text = div.innerText as string;
    setText(text);
  }, [body]);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeFile = (e: InputChangedEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    console.log("FILE: ", files);
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };

  const handleSubmit = () => {
    if (!authUser.access_token)
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );

    const newBlog = { ...blog, content: text };
    const check = validCreateBlog(newBlog);
    if (check.errLength > 0)
      return dispatch(alertSlice.actions.alertAdd({ error: check.errMsg }));

    blogAction.createBlog(newBlog, authUser.access_token, dispatch, authUser);
  };

  return (
    <div className="flex m-5 w-2/3 mx-auto flex-col gap-5">
      <div className="flex gap-3 xl:flex-row md:flex-col-reverse sm:flex-col-reverse xs:flex-col-reverse">
        <div className="xl:w-1/2 md:w-full sm:w-full xs:w-full">
          <form action="" className="flex flex-col gap-5">
            {/* Title Blog */}
            <div className="flex flex-col gap-3 w-full sm:w-full xs:w-full">
              <h1 className="font-bold text-[20px]">Title Blog</h1>
              <input
                type="text"
                className=" p-3 w-full"
                placeholder="Title Blog"
                name="title"
                onChange={handleChangeInput}
              />
            </div>

            {/* Description Blog */}
            <div className="font-bold text-[16px]">
              <h1 className="">Introduce Blog</h1>
              <textarea
                className="w-full h-[100px] p-3"
                id=""
                placeholder="Introduce Blog here..."
                name="description"
                onChange={handleChangeInput}
              ></textarea>
            </div>

            {/* Image Blog  */}
            <div>
              <h1 className="font-bold text-[20px] my-3">Image Blog</h1>
              <input
                type="file"
                className=""
                name="thumbnail"
                onChange={handleChangeFile}
              />
            </div>

            {/* Category Blog    */}
            <div className="">
              <h1 className="font-bold text-[20px] my-3">Categories</h1>
              <select
                className="w-[200px] border-2"
                value={blog.category}
                name="category"
                onChange={handleChangeInput}
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* View Blog */}
        <div className="xl:w-1/2 md:w-full sm:w-full xs:w-full">
          <PreviewBlog blog={blog} />
        </div>
      </div>

      {/* Content Blog  */}
      <div>
        <ReactQuill body={body} setBody={setBody} />

        <div
          className="hidden"
          ref={divRef}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <small>{text.length}</small>
      </div>

      <button
        onClick={handleSubmit}
        className="hover:bg-sky-600 hover:text-white w-[200px] mx-auto text-center border-2 inline-block transition text-[20px] rounded px-3 cursor-pointer"
      >
        Save
      </button>
    </div>
  );
};

export default CreateBlog;
