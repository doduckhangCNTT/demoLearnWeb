import React from "react";
import { Link } from "react-router-dom";

const PaidCourse = () => {
  const courses = [
    {
      name: "HTML CSS",
      url: "https://i.pinimg.com/564x/17/49/c3/1749c326230aea56f1b6f72dcecb6196.jpg",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      price: "10000đ",
      oldPrice: "15000đ",
      link: "",
    },
    {
      name: "Reactjs",
      url: "https://i.pinimg.com/564x/17/49/c3/1749c326230aea56f1b6f72dcecb6196.jpg",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      price: "10000đ",
      oldPrice: "15000đ",
      link: "",
    },
    {
      name: "HTML CSS",
      url: "https://i.pinimg.com/564x/17/49/c3/1749c326230aea56f1b6f72dcecb6196.jpg",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      price: "10000đ",
      oldPrice: "15000đ",
      link: "",
    },
    {
      name: "HTML CSS",
      url: "https://i.pinimg.com/564x/17/49/c3/1749c326230aea56f1b6f72dcecb6196.jpg",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      price: "10000đ",
      oldPrice: "15000đ",
      link: "",
    },
    {
      name: "HTML CSS",
      url: "https://i.pinimg.com/564x/17/49/c3/1749c326230aea56f1b6f72dcecb6196.jpg",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      price: "10000đ",
      oldPrice: "15000đ",
      link: "",
    },
  ];

  return (
    <div className="mt-3">
      <h1 className="font-bold text-[30px]">Paid Courses</h1>
      <div className=" grid grid-cols-4 gap-2 ml-5">
        {courses.map((course, index) => {
          return (
            <div
              key={index}
              className="border-2 rounded-lg hover:shadow-md gap-3"
            >
              <Link to={course.link}>
                <div className="">
                  <img src={course.url} alt="" className="rounded-lg" />
                </div>
                <div className="p-2">
                  <h1 className="font-bold text-[20px] hover:text-sky-500">
                    {course.name}
                  </h1>
                  <div className="flex gap-3 items-center">
                    <small className="line-through">{course.oldPrice}</small>
                    <p className="font-bold text-sky-500">{course.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaidCourse;
