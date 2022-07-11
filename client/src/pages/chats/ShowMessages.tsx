import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/selector/selectors";
import { IMessage, IUser } from "../../utils/Typescript";
import OptionMessage from "../option/OptionMessage";

interface IProps {
  msg: IMessage;
}

const ShowMessages: React.FC<IProps> = ({ msg }) => {
  const { authUser } = useSelector(authSelector);

  return (
    <div className="relative">
      <div className="flex flex-col justify-end overflow-auto touch-auto px-3">
        {(msg.sender._id || msg.sender) !== authUser.user?._id ? (
          <div className="">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={`${(msg.sender as IUser).avatar}`}
                  alt="user"
                />
                <span className="rounded-full bg-slate-200 p-1 group flex gap-2 relative">
                  {msg.text}
                  {/* <div className="hidden group-hover:block absolute -right-[20px]">
                    <OptionMessage />
                  </div> */}
                </span>
              </div>

              <div className="flex justify-end">
                <small>{moment(msg.createdAt).fromNow()}</small>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end group ">
            <div className="flex flex-col">
              <div className="flex flex-col gap-1">
                <div className="text-right h-full flex gap-2 justify-end items-center ">
                  <span className="rounded-full bg-slate-200 p-2 mt-2 relative ">
                    <div className="hidden group-hover:block h-full absolute -left-[50px]">
                      <OptionMessage msg={msg} />
                    </div>

                    {msg.text}
                  </span>
                </div>

                <small className="flex justify-end">
                  {moment(msg.createdAt).fromNow()}
                </small>
              </div>

              <div className="flex flex-col gap-1 text-right">
                {msg.media?.map((item, index) => {
                  console.log("Type: ", item.type);
                  return (
                    <div key={index} className="h-[200px]">
                      {item.mimetype === "jpg" ||
                      item.mimetype === "jpeg" ||
                      item.mimetype === "png" ? (
                        <img
                          src={item.url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <video controls className="h-full">
                          <source type="video/mp4" src={item.url}></source>
                        </video>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowMessages;
