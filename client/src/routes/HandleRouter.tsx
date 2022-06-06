import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SaveBlog from "../pages/blogs/SaveBlog";

// React Lazy
const PagesCommon = React.lazy(() => import("../pages/PagesCommon"));
const Home = React.lazy(() => import("../pages/Home"));
const LoginPass = React.lazy(() => import("../components/auth/LoginPass"));
const RegisterForm = React.lazy(
  () => import("../components/auth/RegisterForm")
);
const LoginSms = React.lazy(() => import("../components/auth/LoginSms"));
const ForgotPassWord = React.lazy(
  () => import("../components/auth/ForgotPassWord")
);
const ResetPassWord = React.lazy(
  () => import("../pages/resetPassword/ResetPassword")
);
const CreateCategory = React.lazy(
  () => import("../pages/category/CreateCategory")
);
const UserProfile = React.lazy(() => import("../pages/user/UserProfile"));
const UserSetting = React.lazy(() => import("../pages/user/UserSetting"));
const LearningPaths = React.lazy(() => import("./LearningPaths"));
const Courses = React.lazy(() => import("../pages/Courses"));
const ActiveUser = React.lazy(() => import("../pages/active/ActiveUser"));
const NotFound = React.lazy(() => import("../components/global/NotFound"));

const Blogs = React.lazy(() => import("../pages/blogs/Blogs"));
const CreateBlog = React.lazy(() => import("../pages/blogs/CreateBlog"));
const UpdateBlog = React.lazy(
  () => import("../pages/blogs/updateBlog/UpdateBlog")
);
const UpdateDraftBlog = React.lazy(
  () => import("../pages/blogs/updateBlog/UpdateDraftBlog")
);
const DeleteBlog = React.lazy(() => import("../pages/blogs/DeleteBlog"));
const YourBlogs = React.lazy(
  () => import("../pages/blogs/yourBlogs/YourBlogs")
);
const DetailBlog = React.lazy(() => import("../pages/blogs/DetailBlog"));
const BlogOfCategory = React.lazy(
  () => import("../pages/blogs/yourBlogs/BlogOfCategory")
);
const PublishedBlogs = React.lazy(
  () => import("../pages/blogs/yourBlogs/PublishedBlogs")
);
const DraftsBlogs = React.lazy(
  () => import("../pages/blogs/yourBlogs/DraftsBlogs")
);

const HandleRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="absolute z-[1000] w-full h-full flex justify-center items-center text-center min-h-screen opacity-[0.5] bg-slate-600">
          <div className="font-bold text-[30px]">Loading...</div>
        </div>
      }
    >
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
          <Route path="create_category" element={<CreateCategory />} />

          <Route path="your_profile" element={<UserProfile />} />
          <Route path="your_setting" element={<UserSetting />} />

          <Route path="leaning-paths" element={<LearningPaths />} />
          <Route path="courses" element={<Courses />} />

          <Route path="blogs" element={<Blogs />}>
            <Route path="category/:option" element={<BlogOfCategory />} />
          </Route>

          <Route path="update_blog/:id" element={<UpdateBlog />} />
          <Route path="save_blogs" element={<SaveBlog />} />

          <Route
            path="update_draftBlog/:valueId"
            element={<UpdateDraftBlog />}
          />
          <Route path="delete_blog/:id" element={<DeleteBlog />} />
          <Route path="create_blog" element={<CreateBlog />} />
          <Route path="detail_blog/:id" element={<DetailBlog />} />

          <Route path="/your_blogs" element={<YourBlogs />}>
            <Route path="drafts" element={<DraftsBlogs />} />
            <Route path="published" element={<PublishedBlogs />} />
          </Route>

          <Route path="active/:active_token" element={<ActiveUser />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default HandleRouter;
