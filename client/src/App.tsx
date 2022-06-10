import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Alert from "./components/alert/Alert";
import Footer from "./components/global/Footer";
import Header from "./components/global/Header";
import Navbar from "./components/global/Navbar";
import actionAuth from "./redux/action/actionAuth";
import HandleRouter from "./routes/HandleRouter";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    actionAuth.refreshAction(dispatch);
  }, [dispatch]);

  return (
    <div className="h-[100vh] flex flex-col">
      <div>
        <Alert />
        <Header />
      </div>

      <div className="flex flex-1">
        <div className="h-full max-w-[100px] flex flex-col flex-shrink top-0">
          <Navbar />
        </div>

        <div className="w-full h-full">
          <HandleRouter />
        </div>
      </div>

      <div className="bottom-0 bg-black">
        <Footer />
      </div>
    </div>
  );
}

export default App;
