import { Route, Routes } from "react-router-dom";
import LoginPass from "../components/auth/LoginPass";
import RegisterForm from "../components/auth/RegisterForm";
import NotFound from "../components/global/NotFound";
import Blogs from "../pages/Blogs";
import Courses from "../pages/Courses";
import Home from "../pages/Home";
import PagesCommon from "../pages/PagesCommon";
import LearningPaths from "./LearningPaths";

const HandleRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesCommon />}>
        <Route index element={<Home />} />

        <Route path="login" element={<LoginPass />} />
        <Route path="register" element={<RegisterForm />} />

        <Route path="leaning-paths" element={<LearningPaths />} />
        <Route path="courses" element={<Courses />} />
        <Route path="blogs" element={<Blogs />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default HandleRouter;
