import Alert from "./components/alert/Alert";
import Footer from "./components/global/Footer";
import Header from "./components/global/Header";
import HandleRouter from "./routes/HandleRouter";

function App() {
  return (
    <div className="h-[100vh] flex flex-col">
      <div>
        <Alert />
        <Header />
      </div>

      <div className="flex-1">
        <HandleRouter />
      </div>

      <div className="bottom-0 bg-black">
        <Footer />
      </div>
    </div>
  );
}

export default App;
