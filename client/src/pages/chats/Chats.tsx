import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import messageAction from "../../redux/action/message/messageAction";
import roomChatAction from "../../redux/action/roomChat/roomChatAction";
import { authSelector } from "../../redux/selector/selectors";
import Conversations from "./Conversations";

const Chats = () => {
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser.access_token) return;
    messageAction.getConversations(authUser, dispatch);
    roomChatAction.getRoomChats(dispatch, authUser.access_token);
  }, [authUser, dispatch]);

  return (
    <div className="flex gap-2">
      {/* Content chats  */}
      <div className="w-2/3 ">
        <Outlet />
      </div>

      {/* Conversation chats  */}
      <div className="w-1/3">
        <Conversations />
      </div>
    </div>
  );
};

export default Chats;
