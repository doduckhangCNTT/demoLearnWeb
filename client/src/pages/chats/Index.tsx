import React from "react";

const MainChat = () => {
  return (
    <div className="relative flex justify-center top-0 bottom-0 h-full items-center text-[30px] font-bold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[50px] w-[50px] text-sky-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
      <span>Message</span>
    </div>
  );
};

export default MainChat;
