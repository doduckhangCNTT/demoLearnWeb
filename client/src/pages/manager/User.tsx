import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import blogAction from "../../redux/action/blogAction";
import { authSelector, blogSelector } from "../../redux/selector/selectors";
import { deleteApi, getApi } from "../../utils/FetchData";
import { IUser } from "../../utils/Typescript";

const User = () => {
  const { authUser } = useSelector(authSelector);
  const { blogs } = useSelector(blogSelector);
  const [users, setUsers] = useState<IUser[]>();
  const dispatch = useDispatch();

  const handleGetUsers = useCallback(async () => {
    const res = await getApi("users", authUser.access_token);
    setUsers(res.data.users);
  }, [authUser.access_token]);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user")) {
      const res = await deleteApi(`user/${userId}`, authUser.access_token);
      console.log("Res: ", res);

      // Delete all blogs of user
      blogAction.getListBlogs(dispatch);
      blogs.forEach((blog) => {
        blogAction.deleteBlog(
          blog,
          authUser.access_token ? authUser.access_token : "",
          dispatch
        );
      });

      handleGetUsers();
    }
  };

  const handleDetailUser = (userId: string) => {};

  return (
    <div className="">
      <h1 className="font-bold text-[30px] my-2">Manager Users</h1>

      <div className="">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID User
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Account
                </th>
                <th scope="col" className="py-3 px-6">
                  Role
                </th>
                <th scope="col" className="py-3 px-6">
                  Type login
                </th>
                <th scope="col" className="py-3 px-6 flex gap-3">
                  <span className="sr-only">Delete</span>
                  <span className="sr-only">Detail</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((user, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="py-4 px-6 ">{user._id}</td>
                      <td className="py-4 px-6">{user.name}</td>
                      <td className="py-4 px-6">{user.account}</td>
                      <td className="py-4 px-6">{user.role}</td>
                      <td className="py-4 px-6">{user.type}</td>

                      <td className="py-4 px-6">
                        {user.role === "admin" ? (
                          ""
                        ) : (
                          <div className="flex gap-3">
                            <div
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              Delete
                            </div>
                            <Link
                              to="#"
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Detail
                            </Link>
                          </div>
                        )}
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

export default User;
