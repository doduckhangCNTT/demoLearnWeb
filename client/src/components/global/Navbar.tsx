import React from "react";
import { Link } from "react-router-dom";
import { listComponentOfNavbar } from "../icons/Icons";

const Navbar = () => {
  return (
    <div className="w-[80px]">
      <div className="h-full inline-block fixed bg-white shadow-lg">
        <div className="flex flex-col items-center text-center">
          {listComponentOfNavbar.map((item, index) => {
            return (
              <Link
                key={index}
                to={`${item.path}`}
                className="mt-5 flex flex-col gap-y-1 items-center hover:text-sky-600"
              >
                <div>{item.icon}</div>
                <div className="">{item.name}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
