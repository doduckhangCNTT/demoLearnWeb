import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import { LIMIT_TEST_PAGE } from "../../constants/quickTestPage";
import useCustomRouter from "../../hooks/useCustomRouter";
import useOptionLocationUrl from "../../hooks/useOptionLocationUrl";
import ListsSorted from "../../hooks/useSorted";
import quickTestPageAction from "../../redux/action/pagination/quickTestPageAction";
import quickTestAction from "../../redux/action/quickTestAction";
import { alertSlice } from "../../redux/reducers/alertSlice";
import { quickTestsPageSlice } from "../../redux/reducers/pagination/quickTestPageSlice";
import {
  authSelector,
  quickTestsPageSelector,
  quickTestsSelector,
} from "../../redux/selector/selectors";
import {
  FormSubmit,
  ICategory,
  InputChangedEvent,
  IQuickTest,
  IUser,
} from "../../utils/Typescript";

const ManagerTest = () => {
  const [limit, setLimit] = useState(LIMIT_TEST_PAGE);
  const { pushQuery } = useCustomRouter();
  const [sortValue, setSortValue] = useState<string>();
  const [checkedTests, setCheckedTests] = useState<string[]>([]);
  const { page, sort } = useOptionLocationUrl();

  const [selectedAll, setSelectedAll] = useState(false);

  const { authUser } = useSelector(authSelector);
  const { quickTests } = useSelector(quickTestsSelector);
  const { quickTestsPage } = useSelector(quickTestsPageSelector);
  const dispatch = useDispatch();

  // Handle have change sort on url
  useEffect(() => {
    setSortValue(sort ? sort : "");
  }, [sort]);

  const handleGetQuickTestPage = useCallback(() => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    const data = {
      page: Number(page),
      sort: sortValue ? sortValue.toString() : "",
      limit: limit,
    };

    quickTestPageAction.getQuickTestsPage(
      data,
      authUser.access_token,
      dispatch
    );
  }, [authUser.access_token, dispatch, limit, page, sortValue]);

  useEffect(() => {
    handleGetQuickTestPage();
  }, [handleGetQuickTestPage]);

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

  // Tinh tong so trang
  const totalPage = useMemo(() => {
    if (quickTests.length === 0) return 0;
    return Math.ceil(quickTestsPage.totalCount / limit);
  }, [limit, quickTests.length, quickTestsPage.totalCount]);

  const handleSortPage = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    const pageValueLocal = page ? Number(page) : 1;
    pushQuery(pageValueLocal, value);
    console.log("Value: ", value);

    if (sortValue !== null) {
      let items = [] as IQuickTest[] | undefined;

      if (value === "category") {
        items = ListsSorted<IQuickTest>(quickTestsPage.data, value, "name");
      } else {
        items = ListsSorted<IQuickTest>(quickTestsPage.data, value);
      }

      dispatch(
        quickTestsPageSlice.actions.updateQuickTestPage({
          data: items ? items : [],
        })
      );
    }
  };

  const handleChangeSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    quickTest: IQuickTest
  ) => {
    const { checked } = e.target;
    if (checked) {
      // Khong nen su dung vì khien bat dong bo
      // setCheckedTests((prev) => [...prev, quickTest._id ? quickTest._id : ""]);

      const newABC = [...checkedTests, quickTest._id ? quickTest._id : ""];
      setCheckedTests(newABC);

      console.log("NewABC: ", newABC);
    } else {
      console.log("Delete check");
      console.log("QuickTestId: ", quickTest._id);

      const quickTestsRemaining = checkedTests.filter(
        (item) => item !== quickTest._id
      );

      setCheckedTests(quickTestsRemaining);

      console.log("quickTests: ", quickTestsRemaining);
    }
  };

  const handleSelectedAll = () => {
    setSelectedAll(!selectedAll);

    const allTestSelected = [] as string[];
    if (!selectedAll) {
      quickTestsPage.data.forEach((item) => {
        allTestSelected.push(item._id ? item._id : "");
      });
      setCheckedTests(allTestSelected);
    } else {
      setCheckedTests([]);
    }
  };

  const handleDeleteMultipleTest = () => {
    if (window.confirm("Are you sure you want to delete")) {
      checkedTests.forEach((item) => {});
    }
  };

  const handleSubmitSearch = (e: FormSubmit) => {};

  return (
    <div>
      <div className="">
        <div className="flex justify-between">
          <h1 className="font-bold text-[30px] my-2">Manager Tests</h1>

          {/* Sort / Filter / Sort */}
          <div className="flex gap-3 border-2 p-2 my-2">
            <div className="flex flex-col gap-2">
              <div className="inline-block">
                <form action="" onSubmit={handleSubmitSearch}>
                  <input
                    className="outline-none border-2 rounded-lg p-1"
                    type="text"
                  />
                  <button
                    type="submit"
                    className="rounded-lg transition hover:bg-sky-500 hover:text-white font-bold p-2"
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="">
                <button
                  className={`border-2 rounded-lg p-2 hover:bg-sky-500 transition ${
                    selectedAll ? "" : "hidden"
                  }`}
                  onClick={handleDeleteMultipleTest}
                >
                  DeleteAll
                </button>
              </div>
            </div>

            <div className="">
              <h1 className="font-bold">Sort: </h1>
              <select name="sort" id="" onChange={(e) => handleSortPage(e)}>
                <option value="">Sort</option>
                <option value="titleTest">Title (a -&gt; z)</option>
                <option value="category">Category</option>
                <option value="accessModifier">Access Modifier</option>
              </select>
            </div>

            <div className="">
              <h1 className="font-bold">Filter: </h1>
              <div className="flex flex-col gap-2 border-2 p-2">
                <select name="filterAccessModifier" id="">
                  <option value="">Access Modifier</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>

                <select name="filterTime" id="">
                  <option value="">Time</option>
                  <option value=""> {">"} 50p</option>
                  <option value="public"> {"<"} 50p</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 hover:bg-sky-500 transition cursor-pointer"
                    onClick={() => handleSelectedAll()}
                  >
                    Select
                  </th>
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
                {quickTestsPage &&
                  quickTestsPage.data.map((quickTest, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="py-4 px-6 ">
                          <input
                            type="checkbox"
                            onChange={(e) => handleChangeSelected(e, quickTest)}
                            checked={checkedTests.includes(
                              quickTest._id ? quickTest._id : ""
                            )}
                          />
                        </td>
                        <td className="py-4 px-6 ">{quickTest._id}</td>
                        <td className="py-4 px-6">
                          {(quickTest.user as IUser).account}
                        </td>
                        <td className="py-4 px-6">{quickTest.titleTest}</td>
                        <td className="py-4 px-6">
                          {(quickTest.category as ICategory).name}
                        </td>
                        <td className="py-4 px-6">{quickTest.time}</td>
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

          <Pagination totalPages={totalPage} />
        </div>
      </div>
    </div>
  );
};

export default ManagerTest;
