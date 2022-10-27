import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import quickTestAction from "../../../redux/action/quickTestAction";
import { alertSlice } from "../../../redux/reducers/alertSlice";
import {
  authSelector,
  quickTestsSelector,
} from "../../../redux/selector/selectors";

const QuickTestHome = () => {
  const { quickTests } = useSelector(quickTestsSelector);
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser.access_token) {
      dispatch(alertSlice.actions.alertAdd({ error: "Invalid access token" }));
    } else {
      quickTestAction.getQuickTests(authUser.access_token, dispatch);
    }
  }, [authUser.access_token, dispatch]);

  return (
    <div className="mt-3">
      <h1 className="font-bold text-[30px]">Quick Tests</h1>
      <div className=" grid lg:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 ml-5 px-2">
        {quickTests.map((quickTest, index) => {
          return (
            <Fragment key={index}>
              <div className="border-2 rounded-lg hover:shadow-md gap-3">
                <Link to={`/quick_test/show_previous/${quickTest._id}`}>
                  <div className="">
                    <img
                      src={quickTest.image.url as string}
                      alt=""
                      className="rounded-lg h-[200px] w-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h1 className="font-bold text-[20px] hover:text-sky-500">
                      {quickTest.titleTest}
                    </h1>
                  </div>
                </Link>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default QuickTestHome;
