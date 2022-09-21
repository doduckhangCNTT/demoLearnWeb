import React, { useState } from "react";
import CompactParam from "../../../components/CompactParam";

const ShowVideoCourse = () => {
  const [widthFull, setWidthFull] = useState(false);

  return (
    <div className="flex gap-2">
      {/* Video / Chats / Note  */}
      <div className={widthFull ? "w-full relative" : "w-2/3 relative"}>
        <div className="">
          <iframe
            className="w-full h-[750px]"
            src="https://www.youtube.com/embed/ly36kn0ug4k"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mt-3">
          <h1 className="font-bold text-[20px]">Tieu de bai hoc</h1>
          <CompactParam param="Description" quantitySlice={150} />
        </div>

        <div className="flex justify-end my-5">
          <button
            className="
              p-2 
              font-bold 
              hover:text-sky-500 
              bg-slate-200 
              rounded-lgo"
            onClick={() => setWidthFull((prev) => !prev)}
          >
            {widthFull ? "Show lessons" : "Hide lessons"}
          </button>
        </div>

        <button
          className="
            absolute 
            border-2 font-bold 
            bottom-5 left-5
            transition 
            rounded-full p-2 
            hover:bg-sky-500 
            hover:text-white"
        >
          Questions
        </button>
      </div>

      {/* Lessons with Index */}
      <div className={widthFull ? "hidden" : "w-1/3"}>Lessons</div>
    </div>
  );
};

export default ShowVideoCourse;
