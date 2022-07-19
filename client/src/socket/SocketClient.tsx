import React from "react";
import SocketClientComment from "./SocketClientComment";
import SocketClientMessage from "./socketClientMessage";
import SocketClientMessageRoom from "./SocketClientMessageRoom";

const SocketClient = () => {
  return (
    <div>
      <SocketClientComment />
      <SocketClientMessage />
      <SocketClientMessageRoom />
    </div>
  );
};

export default SocketClient;
