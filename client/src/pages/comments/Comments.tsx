import React from "react";

const Comments = () => {
  return (
    <div>
      <div className="">
        <h1 className="font-bold text-[20px]">So luong binh luan</h1>
      </div>

      {/* Comment your comment */}
      <div className="flex gap-2 items-center mt-5">
        <div className="">
          <img
            src="https://images.unsplash.com/photo-1652068359232-a98e76719936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=679&q=80"
            alt=""
            className="h-10 w-10 rounded-full"
          />
        </div>

        <div className="border-b-2 p-2 w-full">
          <form action="" className="flex gap-2">
            <input
              type="text"
              className="w-full outline-0"
              placeholder="Comment your comment here ... "
            />
            <button className="bg-gray-300 rounded-lg hover:bg-sky-600 hover:text-white p-2">
              Send
            </button>
          </form>
        </div>
      </div>

      {/* List comment  */}
      <div className="flex gap-3 mt-5">
        <div className="">
          <img
            src="https://images.unsplash.com/photo-1652068359232-a98e76719936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=679&q=80"
            alt=""
            className="h-12 w-12 rounded-full"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 bg-slate-300 rounded-lg p-2">
            <div className="">
              <h1 className="font-bold text-[20px]">Ten nguoi binh luan</h1>
            </div>
            <div className="">Noi dun binh luan</div>
          </div>

          <div className="flex gap-3">
            <div className="">Like</div>
            <div className="">Reply</div>
            <div className="">Time Comment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
