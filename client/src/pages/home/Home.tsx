import Course from "./course/Course";
import PaidCourse from "./paidCourse/PaidCourse";
import SlideShow from "./slideShow/SlideShow";

const Home = () => {
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
