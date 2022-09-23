import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import courseAction from "../../redux/action/course/courseAction";
import { alertSlice } from "../../redux/reducers/alertSlice";
import { authSelector } from "../../redux/selector/selectors";
import Course from "./course/Course";
import PaidCourse from "./paidCourse/PaidCourse";
import SlideShow from "./slideShow/SlideShow";

const Home = () => {
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetCourses = () => {
      if (!authUser.access_token) {
        return dispatch(
          alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
        );
      }
      courseAction.getCourses(authUser.access_token, dispatch);
    };

    handleGetCourses();
  }, [authUser.access_token, dispatch]);

  return (
    <div className="">
      {/* Slide show */}
      <div className="">
        <SlideShow />
      </div>

      {/* Paid Courses */}
      <div className="">
        <PaidCourse />
      </div>

      {/* Courses */}
      <div className="">
        <Course />
      </div>

      {/* Blog Outstanding */}
      <div className=""></div>
    </div>
  );
};

export default Home;
