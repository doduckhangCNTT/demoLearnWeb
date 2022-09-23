import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { courseSelector } from "../../../redux/selector/selectors";
import { ICourses } from "../../../utils/Typescript";

const Course = () => {
  // const courses = [
  //   {
  //     name: "HTML CSS",
  //     url: "https://i.pinimg.com/564x/17/49/c3/1749c326230aea56f1b6f72dcecb6196.jpg",
  //     description:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //     price: "10000đ",
  //     oldPrice: "15000đ",
  //     link: "",
  //   },
  //   {
  //     name: "Reactjs",
  //     url: "https://i.pinimg.com/564x/17/49/c3/1749c326230aea56f1b6f72dcecb6196.jpg",
  //     description:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //     price: "10000đ",
  //     oldPrice: "15000đ",
  //     link: "",
  //   },
  //   {
  //     name: "HTML CSS",
  //     url: "https://i.pinimg.com/564x/17/49/c3/1749c326230aea56f1b6f72dcecb6196.jpg",
  //     description:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //     price: "10000đ",
  //     oldPrice: "15000đ",
  //     link: "",
  //   },
  //   {
  //     name: "HTML CSS",
  //     url: "https://i.pinimg.com/564x/17/49/c3/1749c326230aea56f1b6f72dcecb6196.jpg",
  //     description:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //     price: "10000đ",
  //     oldPrice: "15000đ",
  //     link: "",
  //   },
  //   {
  //     name: "HTML CSS",
  //     url: "https://i.pinimg.com/564x/17/49/c3/1749c326230aea56f1b6f72dcecb6196.jpg",
  //     description:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  //     price: "10000đ",
  //     oldPrice: "15000đ",
  //     link: "",
  //   },
  // ];

  const { courses } = useSelector(courseSelector);

  return (
    <div className="mt-3">
      <h1 className="font-bold text-[30px]">Free Courses</h1>
      <div className=" grid grid-cols-4 gap-2 ml-5">
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
