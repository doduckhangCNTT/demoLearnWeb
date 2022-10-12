import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import quickTestAction from "../../redux/action/quickTestAction";
import { alertSlice } from "../../redux/reducers/alertSlice";
import {
  authSelector,
  quickTestsSelector,
} from "../../redux/selector/selectors";
import { ICategory, IUser } from "../../utils/Typescript";

const ManagerTest = () => {
  const { authUser } = useSelector(authSelector);
  const { quickTests } = useSelector(quickTestsSelector);
  const dispatch = useDispatch();

  // Lay toan bo quickTests
  useEffect(() => {
    if (!authUser.access_token) {
      dispatch(alertSlice.actions.alertAdd({ error: "Invalid access token" }));
    } else {
      if (quickTests.length <= 0) {
        quickTestAction.getQuickTests(authUser.access_token, dispatch);
      }
    }
  }, [authUser.access_token, dispatch, quickTests.length]);

  return (
    <div>
      <div>
        <div className="">
          <h1 className="font-bold text-[30px] my-2">Manager Tests</h1>

          <div className="">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      ID Quick Test
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
                      Time
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
                  {quickTests &&
                    quickTests?.map((quickTest, index) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="py-4 px-6 ">{quickTest._id}</td>
                          <td className="py-4 px-6">
                            {(quickTest.user as IUser).account}
                          </td>
                          <td className="py-4 px-6">{quickTest.titleTest}</td>
                          <td className="py-4 px-6">
                            {(quickTest.category as ICategory).name}
                          </td>
                          <td className="py-4 px-6">Public</td>
                          <td className="py-4 px-6 text-right flex gap-3">
                            <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                              Delete
                            </div>
                            <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                              Detail
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <Pagination totalPages={7} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerTest;
