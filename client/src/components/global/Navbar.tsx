import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const listComponentOfNavbar = [
    {
      path: "leaning - paths",
      name: "Leaning Paths",
    },
    {
      path: "Courses",
      name: "Courses",
    },
    {
      path: "blogs",
      name: "Blogs",
    },
  ];

  return (
    <div className="shadow-md h-full flex flex-col">
      {listComponentOfNavbar.map((item, index) => {
        return (
          <div key={index} className="mt-5">
            <Link to={`${item.path}`}>{item.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
