import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ForgotPassWord from "../components/auth/FogotPassWord";
import LoginPass from "../components/auth/LoginPass";
import LoginSms from "../components/auth/LoginSms";
import RegisterForm from "../components/auth/RegisterForm";
import NotFound from "../components/global/NotFound";
import ActiveUser from "../pages/active/ActiveUser";
import Blogs from "../pages/Blogs";
import Courses from "../pages/Courses";
import Home from "../pages/Home";
import PagesCommon from "../pages/PagesCommon";
import actionAuth from "../redux/action/actionAuth";
import LearningPaths from "./LearningPaths";
import ResetPassWord from "../pages/resetPassword/ResetPassword";

const HandleRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    actionAuth.refreshAction(dispatch);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<PagesCommon />}>
        <Route index element={<Home />} />

        <Route path="login" element={<LoginPass />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="login_sms" element={<LoginSms />} />
        <Route path="forgot_password" element={<ForgotPassWord />} />
        <Route
          path="reset_password/:access_token"
          element={<ResetPassWord />}
        />

        <Route path="leaning-paths" element={<LearningPaths />} />
        <Route path="courses" element={<Courses />} />
        <Route path="blogs" element={<Blogs />} />

        <Route path="active/:active_token" element={<ActiveUser />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default HandleRouter;
