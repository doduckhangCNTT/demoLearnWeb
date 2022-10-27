import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { courseSelector } from "../../../redux/selector/selectors";

const PaidCourse = () => {
  const { courses } = useSelector(courseSelector);

  return (
    <div className="mt-3">
      <h1 className="font-bold text-[30px]">Paid Courses</h1>
      <div className=" grid lg:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 ml-5 px-2">
        {courses.map((course, index) => {
          return (
            <Fragment key={index}>
              {course.price > 0 ? (
                <div className="border-2 rounded-lg hover:shadow-md gap-3">
                  <Link
                    to={`course/${course?.name
                      .replace(" ", "-")
                      .toLowerCase()}/${course._id ? course._id : ""}`}
                  >
                    <div className="">
                      <img
                        src={course.thumbnail?.url as string}
                        alt=""
                        className="rounded-lg"
                      />
                    </div>
                    <div className="p-2">
                      <h1 className="font-bold text-[20px] hover:text-sky-500">
                        {course.name}
                      </h1>
                      <div className="flex gap-3 items-center">
                        <small className="line-through">
                          {course.oldPrice}
                        </small>
                        <p className="font-bold text-sky-500">{course.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PaidCourse;
