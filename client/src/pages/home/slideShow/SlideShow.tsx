import React from "react";
import CompactParam from "../../../components/CompactParam";

const SlideShow = () => {
  const description =
    "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of theprinting and typesetting industry. Lorem Ipsum has been theindustry's standard dummy text ever since the 1500s, when anunknown printer took a galley of type and scrambled it to make atype specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release ofLetraset sheets containing Lorem Ipsum passages, and more recentlywith desktop publishingare like Aldus PageMaker includingversions of Lorem Ipsum.";

  return (
    <div className="w-full">
      <div className="border-2 rounded-lg relative">
        <img
          src="https://images.unsplash.com/photo-1644559321363-0cf2745083d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="rounded-lg h-[300px] w-full object-cover"
        />

        <div className="absolute flex justify-between top-2 bottom-2 left-2 right-2 w-full">
          <div className="top-3 bottom-3 left-5 bg-slate-50 rounded-lg p-3 opacity-75 max-w-3xl">
            <h1 className="font-bold text-[30px]">Khoa hoc mien phi</h1>
            <div className="indent-8">
              <CompactParam param={description} quantitySlice={200} />
            </div>
            <button className="border-2 rounded-full hover:opacity-80 p-3 mt-5 text-white bg-cyan-500">
              Access to show details
            </button>
          </div>

          <div className="h-[200px] fle items-center">
            <img
              src="https://img.freepik.com/vector-gratis/concepto-ilustracion-analiticas_114360-85.jpg?w=826&t=st=1663661695~exp=1663662295~hmac=3efd85beb77c7014f23f5e365aa583b00fc5b1ff56acdd282a2c73e9b6182be7"
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
