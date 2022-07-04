import React from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { socketSelector } from "./redux/selector/selectors";

const SocketClient = () => {
  const { socket } = useSelector(socketSelector);

  return <div></div>;
};

export default SocketClient;
