import { Socket } from "socket.io";

export const SocketServer = (socket: Socket) => {
  console.log(socket.id + " connected");

  socket.on("joinRoom", (id: string) => {
    socket.join(id);
    console.log("Room blog: ", (socket as any).adapter.rooms);
  });

  socket.on("outRoom", (id: string) => {
    socket.leave(id);
    console.log("Out Room blog: ", (socket as any).adapter.rooms);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
};
