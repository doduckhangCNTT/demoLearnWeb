import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CompactParam from "../../../components/CompactParam";
import LazyLoadingImg from "../../../components/LazyLoadingImg/LazyLoadingImg";
import courseAction from "../../../redux/action/course/courseAction";
import { alertSlice } from "../../../redux/reducers/alertSlice";
import {
  authSelector,
  courseNowSelector,
} from "../../../redux/selector/selectors";
import { getApi } from "../../../utils/FetchData";
import { ICourses, ILesson } from "../../../utils/Typescript";
import ComboboxLessons from "./ComboboxLessons";
import ComboboxToUser from "./ComboboxToUser";

const ShowVideoCourse = () => {
  const [widthFull, setWidthFull] = useState(false);
  const [course, setCourse] = useState<ICourses>();
  const [lesson, setLesson] = useState<ILesson>();
  const { courseId } = useParams();
  const { lessonId } = useParams();

  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetCourse = async () => {
      if (!authUser.access_token) {
        return dispatch(
          alertSlice.actions.alertAdd({ error: "Invalid authentication" })
        );
      }

      if (courseId) {
        const res = await getApi(`course/${courseId}`, authUser.access_token);

        setCourse(res.data);
      }
    };

    handleGetCourse();
  }, [authUser.access_token, courseId, dispatch]);

  useEffect(() => {
    course?.content.forEach((c) => {
      c.lessons.forEach((l) => {
        if (l._id === lessonId) {
          setLesson(l);
        }
      });
    });
  }, [course?.content, lessonId]);

  return (
    <div className="flex gap-2">
      {/* Video / Chats / Note  */}
      <div className={widthFull ? "w-full relative" : "w-2/3 relative"}>
        <div className="">
          {/* Kiem xem dau la video upload va dau la video youtube */}
          {lesson?.fileUpload.public_id ? (
            <div className="">
              {lesson.fileUpload.mimetype === "video" ? (
                <video controls className="h-full">
                  <source
                    type="video/mp4"
                    src={lesson.fileUpload.secure_url}
                  ></source>
                </video>
              ) : (
                <LazyLoadingImg
                  url={lesson.fileUpload.secure_url}
                  alt="images"
                  className="h-full"
                />
              )}
            </div>
          ) : (
            <iframe
              className="w-full h-[750px]"
              src={lesson?.url as string}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="mt-3">
          <h1 className="font-bold text-[20px]">Tieu de bai hoc</h1>
          <CompactParam param="Description" quantitySlice={150} />
        </div>

        <div className="flex justify-end my-5">
          <button
            className="
              p-2 
              font-bold 
              hover:text-sky-500 
              bg-slate-200 
              rounded-lgo"
            onClick={() => setWidthFull((prev) => !prev)}
          >
            {widthFull ? "Show lessons" : "Hide lessons"}
          </button>
        </div>

        <button
          className="
            absolute 
            border-2 font-bold 
            bottom-5 left-5
            transition 
            rounded-full p-2 
            hover:bg-sky-500 
            hover:text-white"
        >
          Questions
        </button>
      </div>

      {/* Lessons with Index */}
      <div className={widthFull ? "hidden" : "w-1/3"}>
        <div className="">
          <h1 className="font-bold text-[30px]">Lesson</h1>
          <div className="">
            {course?.content.map((co, index) => {
              return (
                <div className="" key={index}>
                  <ComboboxToUser chapter={co} course={course} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowVideoCourse;
