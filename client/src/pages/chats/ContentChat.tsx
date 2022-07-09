import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Icons from "../../components/Icons";
import messageAction from "../../redux/action/message/messageAction";
import { authSelector, messageSelector } from "../../redux/selector/selectors";
import { getApi } from "../../utils/FetchData";
import {
  FormSubmit,
  IMessage,
  InputChangedEvent,
  IUser,
} from "../../utils/Typescript";
import ShowMessages from "./ShowMessages";

const ContentChat = () => {
  const options = [
    {
      name: "Telephone",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      name: "Video Call",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  const Uploads = {
    name: "Image",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  const { authUser } = useSelector(authSelector);
  const { conversation } = useSelector(messageSelector);

  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const solution = async () => {
      const res = await getApi(`users/${id}`, authUser.access_token);
      setUser(res.data.user);
    };

    solution();
  }, [authUser.access_token, id]);

  useEffect(() => {
    if (!id || !authUser.access_token) return;

    messageAction.getMessages(id, authUser, dispatch);
  }, [authUser, dispatch, id]);

  const handleChangeInput = (e: InputChangedEvent) => {
    const { value } = e.target;
    setText(value);
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!authUser.access_token || !authUser.user || !id) return;
    const msg = {
      sender: authUser.user,
      recipient: id,
      text,
      media,
    };

    messageAction.createMessage(msg, authUser.access_token, dispatch);
    setText("");
  };

  return (
    <div className="relative">
      <div className="sticky top-[60px] flex justify-between p-2 shadow-md bg-white">
        {/* Info User */}
        <div className="">
          <div className="flex hover:bg-slate-200 transition p-2 mt-2 rounded-md">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={`${user?.avatar}`}
              alt="man"
            />
            <div className="ml-3 overflow-hidden w-full">
              <Link to="" className="text-sm font-medium text-slate-900">
                {user?.name}
              </Link>
              <p className="text-sm text-slate-500 truncate">Time</p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="flex gap-2 items-center">
          {options.map((option, index) => {
            return (
              <div className="flex gap-2 hover:opacity-[0.8]" key={index}>
                {option.icon}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contents */}
      <div className="flex h-[100vh] flex-col justify-end ">
        <div className="">
          {(conversation?.data as any).messages?.map(
            (msg: IMessage, index: React.Key | null | undefined) => {
              return (
                <div key={index} className="mt-2">
                  <ShowMessages msg={msg} />
                </div>
              );
            }
          )}
        </div>

        <div className="flex gap-3 items-center">
          <form action="" onSubmit={handleSubmit} className="w-full my-3">
            <input
              type="text"
              value={text}
              placeholder="Message your ..."
              className="bg-slate-200 w-full rounded-full p-3 outline-none"
              onChange={handleChangeInput}
            />
            <button type="submit" className="opacity-0"></button>
          </form>

          {/* Icon, Image */}
          <div className="flex gap-2">
            <Icons text={text} setText={setText} />

            <span>{Uploads.icon}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentChat;
