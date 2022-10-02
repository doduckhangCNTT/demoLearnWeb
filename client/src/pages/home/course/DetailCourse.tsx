import React, { useCallback, useEffect, useState } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import ComboboxLessons from "./ComboboxLessons";
import { getApi } from "../../../utils/FetchData";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/selector/selectors";
import { ICourses } from "../../../utils/Typescript";
import CompactParam from "../../../components/CompactParam";

import { Combobox } from "@headlessui/react";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const DetailCourse = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const [course, setCourse] = useState<ICourses>();
  const { authUser } = useSelector(authSelector);

  const handleGetCourse = useCallback(
    async (courseId: string) => {
      const res = await getApi(`course/${courseId}`, authUser.access_token);
      setCourse(res.data);
    },
    [authUser.access_token]
  );

  useEffect(() => {
    if (courseId) {
      handleGetCourse(courseId);
    }
  }, [handleGetCourse, courseId]);

  return (
    <div className="flex gap-2">
      <div className="w-2/3 ">
        <div className="my-3">
          <h1 className="font-bold text-[30px]">{course?.name}</h1>
          <div className="">
            <CompactParam
              param={course?.description ? course.description : ""}
              quantitySlice={200}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className=" w-2/3 border-2 h-full">
            <div className="">{/* <ComboboxLessons /> */}</div>

            <div className=""></div>
          </div>
        </div>
      </div>

      {/* Man hinh xem */}
      <div className="w-1/3">
        <div className="shadow-md border-2 rounded-lg p-2">
          {/* Video introduce */}
          <div className="">
            <iframe
              className="w-full h-[300px]"
              src={course?.videoIntro}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex justify-center mt-5">
            <button className="border-2 p-2 rounded-lg text-[20px] text-white font-bold bg-sky-300 hover:opacity-80">
              Start Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;