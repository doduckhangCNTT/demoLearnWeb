import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import courseAction from "../../redux/action/course/courseAction";
import { alertSlice } from "../../redux/reducers/alertSlice";
import { courseNowSlice } from "../../redux/reducers/course/courseNowSlice";
import { authSelector, courseSelector } from "../../redux/selector/selectors";
import { ICategory, IUser } from "../../utils/Typescript";

const ManagerCourse = () => {
  const { courses } = useSelector(courseSelector);
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const handleGetCourses = async () => {
      if (!authUser.access_token) {
        return dispatch(
          alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
        );
      }
      if (courses.length <= 0) {
        courseAction.getCourses(authUser.access_token, dispatch);
      }
    };

    handleGetCourses();
  }, [authUser.access_token, courses.length, dispatch]);

  const handleEditCourse = (courseId: string) => {
    dispatch(courseNowSlice.actions.getCourseIdNow({ courseId: courseId }));
    navigate("/create_course");
  };

  const handleDetailCourse = (courseId: string) => {
    dispatch(courseNowSlice.actions.getCourseIdNow({ courseId: courseId }));
    navigate("/create_course");
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course")) {
    }
  };

  return (
    <div>
      <div className="">
        <h1 className="font-bold text-[30px] my-2">Manager Blogs</h1>

        <div className="">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
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
                  <th scope="col" className="py-3 px-6">
                    Access Modifier
                  </th>
                  <th scope="col" className="py-3 px-6 flex gap-3">
                    <span className="sr-only">Delete</span>
                    <span className="sr-only">Detail</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses &&
                  courses?.map((course, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="py-4 px-6 ">{course._id}</td>
                        <td className="py-4 px-6">
                          {(course.user as IUser).account}
                        </td>
                        <td className="py-4 px-6">{course.name}</td>
                        <td className="py-4 px-6">
                          {(course.category as ICategory).name}
                        </td>
                        <td className="py-4 px-6">{course.accessModifier}</td>
                        <td className="py-4 px-6 text-right flex gap-3">
                          <div
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() =>
                              handleDeleteCourse(course._id ? course._id : "")
                            }
                          >
                            Delete
                          </div>
                          <div
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() =>
                              handleDetailCourse(course._id ? course._id : "")
                            }
                          >
                            Detail
                          </div>
                          <div
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                            onClick={() =>
                              handleEditCourse(course._id ? course._id : "")
                            }
                          >
                            Edit
                          </div>
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
    </div>
  );
};

export default ManagerCourse;
