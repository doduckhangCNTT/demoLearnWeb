import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import messageAction from "../../redux/action/message/messageAction";
import roomChatAction from "../../redux/action/roomChat/roomChatAction";
import { authSelector } from "../../redux/selector/selectors";
import Conversations from "./Conversations";

const Chats = () => {
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [toggleConversation, setToggleConversation] = useState<boolean>(false);

  useEffect(() => {
    if (!authUser.access_token) return;
    messageAction.getConversations(authUser, dispatch);
    roomChatAction.getRoomChats(dispatch, authUser.access_token);
  }, [authUser, dispatch]);

  return (
    <div className="flex gap-2 relative">
      {/* Content chats  */}
      <div className="lg:w-2/3 md:w-full sm:w-full w-full">
        <Outlet />
      </div>

      {/* Conversation chats  */}
      <div
        className={`${
          toggleConversation ? "" : "w-1/3"
        } lg:relative lg:mt-0 md:relative md:mt-0 sm:absolute absolute sm:top-0 sm:right-0 sm:mt-[100px] sm:bg-slate-100`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setToggleConversation(!toggleConversation)}
            className="
            p-1 w-[50px] 
            top-[100px] right-0 z-10 rounded-md 
            cursor-pointer font-bold 
            bg-gray-100 
            hover:bg-sky-500 hover:text-white
            "
          >
            {toggleConversation ? "<--" : "-->"}
          </button>
        </div>

        {toggleConversation ? (
          ""
        ) : (
          <div className="mt-[20px]">
            <Conversations />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
