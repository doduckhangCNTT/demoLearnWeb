import React from "react";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";
import IntroduceAndActive from "./IntroduceAndActive";

const UserProfile = () => {
  return (
    <>
      <div>
        <div className="relative -z-10">
          {/* Background Show of Profile  */}
          <LazyLoadingImg
            url="https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
            alt=""
            className="w-full object-cover h-80"
          />

          {/* User name  */}
          <div className=" md:flex-row sm:flex-col xs:flex-col -bottom-[50px] gap-3 items-end absolute ml-[100px]">
            <div>
              <img
                src="https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                alt=""
                className="w-[100px] h-[100px] rounded-full"
              />
            </div>

            <h1 className="text-[30px]">User Name</h1>
          </div>
        </div>
      </div>

      <div className="flex gap-5 mx-auto mt-[100px] md:w-2/3 md:flex-row sm:w-full xs:w-full sm:flex-col xs:flex-col">
        <div className=" md:w-1/3 rounded-xl  sm:w-full xs:w-full ">
          {/* Introduce */}
          <div className="border-2 rounded-xl p-3">
            <h1 className="font-bold text-[20px]">Introduce</h1>
            <div>
              <p>
                Thành viên của F8 - Học lập trình để đi làm từ một năm trước
              </p>
            </div>
          </div>

          <div>
            <IntroduceAndActive />
          </div>
        </div>

        <div className="xl:w-2/3 md:w-full sm:w-full xs:w-full border-2 rounded-xl">
          <h1 className="font-bold text-[25px] m-3">List Courses</h1>
          <div className="flex gap-3 border-2 xl:flex-row xl:w-auto md:flex-col md:w-auto rounded-xl m-3 sm:flex-col xs:flex-col">
            {/* Img course  */}
            <div className="xl:w-1/3 md:w-full sm:w-full max-h-[200px]">
              <LazyLoadingImg
                url="https://images.unsplash.com/photo-1602265585142-6b221b9b2c24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
                alt=""
                className="rounded-xl object-cover w-[200px] h-[200px]"
              />
            </div>

            {/* Content course   */}
            <div className=" xl:w-2/3 md:w-full sm:w-full xs:w-full p-3">
              <div>
                <h1 className="font-bold text-[20px]">
                  Xây Dựng Website với ReactJS
                </h1>
              </div>

              <div className="w-ful">
                <p className="mt-3">
                  Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học
                  này là bạn có thể làm hầu hết các dự án thường gặp với
                  ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án giống
                  Tiktok.com, bạn có thể tự tin đi xin việc khi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
