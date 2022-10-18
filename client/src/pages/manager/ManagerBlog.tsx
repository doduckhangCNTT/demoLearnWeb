import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import blogAction from "../../redux/action/blogAction";
import { blogSelector } from "../../redux/selector/selectors";
import { FormSubmit, ICategory, IUser } from "../../utils/Typescript";

const ManagerBlog = () => {
  const { blogs } = useSelector(blogSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (blogs.length <= 0) {
      blogAction.getBlogs(dispatch);
    }
  }, [blogs.length, dispatch]);

  const handleDeleteBlog = () => {};

  const handleSubmitSearchBlog = (e: FormSubmit) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <div className="">
        <h1 className="font-bold text-[30px] my-2">Manager Blogs</h1>

        <div className="flex justify-between p-2 border-2">
          {/* Sort Blog */}
          <div className="">
            <h1 className="font-bold">Sort: </h1>
            <select name="sort" id="">
              <option value="">Sort</option>
              <option value="title">Title (a -&gt; z)</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmitSearchBlog} className="">
              <input
                type="text"
                className="border-2 rounded-full p-2"
                placeholder="Search Blog"
              />
            </form>
            <div className="flex justify-end">
              <button className="border-2 p-1 inline-block hover:bg-sky-500 hover:text-white transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Select
                </th>
                <th scope="col" className="py-3 px-6">
                  ID Course
                </th>
                <th scope="col" className="py-3 px-6">
                  User
                </th>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Category
                </th>
                <th scope="col" className="py-3 px-6 flex gap-3">
                  <span className="sr-only">Delete</span>
                  <span className="sr-only">Detail</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs &&
                blogs?.map((blog, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="py-4 px-6 ">
                        <input
                          type="checkbox"
                          // onChange={(e) => handleChangeSelected(e, quickTest)}
                          // checked={checkedTests.includes(
                          //   quickTest._id ? quickTest._id : ""
                          // )}
                        />
                      </td>
                      <td className="py-4 px-6 ">{blog._id}</td>
                      <td className="py-4 px-6">
                        {(blog.user as IUser).account}
                      </td>
                      <td className="py-4 px-6">{blog.title}</td>
                      <td className="py-4 px-6">
                        {(blog.category as ICategory).name}
                      </td>
                      <td className="py-4 px-6 text-right flex gap-3">
                        <div
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleDeleteBlog()}
                        >
                          Delete
                        </div>
                        <Link
                          to="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex justify-end">
          <nav aria-label="Page navigation example">
            <ul className="flex -space-x-px">
              <li>
                <Link
                  to="#"
                  className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ManagerBlog;
