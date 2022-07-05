import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io, { Socket } from "socket.io-client";
import Alert from "./components/alert/Alert";
import Footer from "./components/global/Footer";
import Header from "./components/global/Header";
import Navbar from "./components/global/Navbar";
import actionAuth from "./redux/action/actionAuth";
import { socketSlice } from "./redux/reducers/socketSlice";
import HandleRouter from "./routes/HandleRouter";
import SocketClient from "./SocketClient";

function App() {
  const dispatch = useDispatch();

  // --------------------- Connect Socket --------------------
  useEffect(() => {
    let newSocket: Socket<DefaultEventsMap, DefaultEventsMap>;
    newSocket = io("http://localhost:5000");
    dispatch(socketSlice.actions.socketComment(newSocket));

    return () => {
      newSocket.close();
    };
  }, [dispatch]);

  // ----------------------------------------------------------
  useEffect(() => {
    actionAuth.refreshAction(dispatch);
  }, [dispatch]);

  return (
    <div className="h-[100vh] flex flex-col">
      <SocketClient />
      <div>
        <Alert />
        <Header />
      </div>

      <div className="flex flex-1">
        <div className=" max-w-[100px] flex flex-col flex-shrink top-0">
          <Navbar />
        </div>
        <div className="w-full h-full">
          <HandleRouter />
        </div>
      </div>

      <div className="relative bottom-0 bg-black">
        <Footer />
      </div>
    </div>
  );
}

export default App;
