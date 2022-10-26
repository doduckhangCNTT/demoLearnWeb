import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { courseSelector } from "../../../redux/selector/selectors";
import { ICourses } from "../../../utils/Typescript";

const Course = () => {
  const { courses } = useSelector(courseSelector);

  return (
    <div className="mt-3 ">
      <h1 className="font-bold text-[30px]">Free Courses</h1>
      <div className=" grid gap-2 ml-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-2">
        {(courses as ICourses[])?.map((course, index) => {
          return (
            <div key={index} className="">
              {course.price ? (
                ""
              ) : (
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
                      {course.price === 0 && course.oldPrice === 0 ? (
                        ""
                      ) : (
                        <div className="flex gap-3 items-center">
                          <small className="line-through">
                            {course.oldPrice}
                          </small>
                          <p className="font-bold text-sky-500">
                            {course.price}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Course;
