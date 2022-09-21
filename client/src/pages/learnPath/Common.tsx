import React, { useState } from "react";
import { Link } from "react-router-dom";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";
import CompactParam from "../../components/CompactParam";

interface IProps {
  title: string;
  description: string;
  image: string;
  path: string;
}

const Common: React.FC<IProps> = ({ title, description, image, path }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="border-2 rounded-lg p-3">
      <div className="flex gap-2">
        <div className="">
          <h1 className="font-bold text-[20px]">{title}</h1>
          <div className="indent-3">
            <CompactParam param={description} quantitySlice={150} />
          </div>
        </div>

        <div className="border-2 rounded-full">
          <LazyLoadingImg
            url={image}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      <button className="border-2 rounded-lg p-2 bg-sky-500 text-white hover:opacity-90 font-bold">
        <Link to={path}>Show detail</Link>
      </button>
    </div>
  );
};

export default Common;
