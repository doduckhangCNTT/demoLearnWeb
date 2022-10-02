import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import categoryAction from "../../../redux/action/categoryAction";
import courseAction from "../../../redux/action/course/courseAction";
import { alertSlice } from "../../../redux/reducers/alertSlice";
import { chooseLessonSlice } from "../../../redux/reducers/course/chooseLessonSlice";
import { courseNowSlice } from "../../../redux/reducers/course/courseNowSlice";
import { courseSlice } from "../../../redux/reducers/course/courseSlice";
import {
  authSelector,
  categorySelector,
  chooseLessonSelector,
  courseNowSelector,
  courseSelector,
} from "../../../redux/selector/selectors";
import { getApi, patchApi } from "../../../utils/FetchData";
import {
  FormSubmit,
  IChapter,
  ICourses,
  ILesson,
  InputChangedEvent,
} from "../../../utils/Typescript";
import PreviewCourse from "./PreviewCourse";

const CreateCourse = () => {
  const initialState = {
    name: "",
    thumbnail: {
      public_id: "",
      url: "",
    },
    description: "",
    accessModifier: "private",
    category: "",
    videoIntro: "",
    format: "free",
    price: 0,
    oldPrice: 0,
    // courses: [{ name: "", lessons: [{ name: "", url: "", description: "" }] }],
    content: [] as IChapter[],
  };

  const initialStateLesson = {
    name: "",
    url: "",
    description: "",
  };

  const [course, setCourse] = useState<ICourses>(initialState);
  const [lesson, setLesson] = useState<ILesson>(initialStateLesson);

  const [isPaidCourse, setIsPaidCourse] = useState(false);
  const [chooseTypeVideoUpload, setChooseTypeVideoUpload] = useState(false);
  const [chapter, setChapter] = useState<IChapter>();

  const { categories } = useSelector(categorySelector);
  const { authUser } = useSelector(authSelector);
  const { courses } = useSelector(courseSelector);
  const { courseNow } = useSelector(courseNowSelector);
  const { chooseLesson } = useSelector(chooseLessonSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    categoryAction.getCategory(dispatch);
  }, [dispatch]);

  const handleGetCourse = useCallback(async () => {
    if (courseNow.courseId) {
      const res = await getApi(
        `course/${courseNow.courseId}`,
        authUser.access_token
      );

      // Cap nhat ngay lap tuc cac lesson tren store ra ben ngoai = cach lay gia tren store
      courses.forEach((course) => {
        // Kiem tra course muon tim kiem co tren store hay ko
        if (course._id === res.data._id) {
          setCourse(course);
        }
      });
    }
  }, [authUser.access_token, courseNow.courseId, courses]);

  const handleGetCourses = useCallback(() => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }
    courseAction.getCourses(authUser.access_token, dispatch);
  }, [authUser.access_token, dispatch]);

  useEffect(() => {
    handleGetCourse();
  }, [handleGetCourse]);

  useEffect(() => {
    if (course.format === "free") {
      setCourse({ ...course, price: 0, oldPrice: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.format]);

  useEffect(() => {
    handleGetCourses();
  }, [handleGetCourses]);

  useEffect(() => {
    if (chooseLesson._id) {
      setLesson(chooseLesson);
    }
  }, [chooseLesson]);

  const handleChangeInput_paidCourse = (e: InputChangedEvent) => {
    setIsPaidCourse(!isPaidCourse);
    const { name, value } = e.target;

    setCourse({ ...course, [name]: value });
  };

  const handleChangeInput_uploadVideo = () => {
    setChooseTypeVideoUpload(!chooseTypeVideoUpload);
  };

  const handleChangeInput = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleChangeInput_CourseName = (e: InputChangedEvent) => {
    const { value } = e.target;

    // setCourse({ ...course, courses: { ...course.courses, name: value } });
  };

  const handleChangeInputFile = (e: InputChangedEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setCourse({ ...course, thumbnail: { public_id: "", url: file } });
    }
  };

  // -------------------- Handle Course --------------------------
  const handleCourseNow = (e: InputChangedEvent) => {
    const { value } = e.target;
    dispatch(courseNowSlice.actions.getCourseIdNow({ courseId: value }));
  };

  const handleSubmitCourse = (e: FormSubmit) => {
    e.preventDefault();
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid access token" })
      );
    }
    courseAction.createCourse(course, authUser.access_token, dispatch);
  };

  // -------------------- Handle Chapter --------------------------
  const handleGetChapter = useCallback(async () => {
    if (courseNow.chapterId) {
      const res = await getApi(
        `course/${courseNow.courseId}/chapter/${courseNow.chapterId}`,
        authUser.access_token
      );
      // setCourse(res.data);
      console.log("Res: ", res.data);
      setChapter(res.data);
    }
  }, [authUser.access_token, courseNow.chapterId, courseNow.courseId]);

  useEffect(() => {
    handleGetChapter();
  }, [handleGetChapter]);

  const handleChapterNow = (e: InputChangedEvent) => {
    const { value } = e.target;
    dispatch(courseNowSlice.actions.getChapterIdNow({ chapterId: value }));
  };

  const handleChangeInput_Chapter = (e: InputChangedEvent) => {
    const { value } = e.target;
    setChapter({ name: value, lessons: [] });
  };

  const handleCreateChapter = async () => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }

    if (chapter) {
      const res = await patchApi(
        `chapter/course/${courseNow.courseId}`,
        chapter,
        authUser.access_token
      );

      console.log("Res: ", res.data);

      dispatch(
        courseSlice.actions.createChapterOfCourse({
          courseId: courseNow.courseId,
          content: res.data.content,
        })
      );

      dispatch(
        courseNowSlice.actions.getChapterIdNow({
          chapterId: res.data.content[res.data.content.length - 1]._id,
        })
      );

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    }
  };

  const handleAddLesson = () => {
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
      );
    }

    courseAction.createLesson(
      { lesson, courseNow },
      authUser.access_token,
      dispatch
    );
  };

  const handleUpdateLesson = () => {
    const initialStateLesson = {
      name: "",
      url: "",
      description: "",
    };

    let course = {} as ICourses;

    courses.forEach((item) => {
      if (item._id === courseNow.courseId) {
        return (course = item);
      }
    });

    console.log("Course: ", course);
    // course.content.forEach(c => {
    //   if(c.lessons)
    // })

    setLesson(initialStateLesson);
    dispatch(chooseLessonSlice.actions.getLesson({} as ILesson));
    dispatch(courseNowSlice.actions.getChapterIdNow({ chapterId: "" }));
  };

  const handleChangeInput_Lesson = (e: InputChangedEvent) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });
  };

  return (
    <div className="flex gap-2">
      <div className=" w-2/3 flex flex-col gap-2">
        {/* Create Course */}
        <div className=" border-2 p-2">
          <div className="flex justify-between">
            <h1 className="font-bold text-[30px]">Create Course</h1>
            <select
              className="w-[300px] border-2"
              name="category"
              onChange={handleCourseNow}
            >
              <option value="">Choose a Course</option>
              {courses?.map((course, index) => (
                <option key={index} value={course._id} className="">
                  {course.name} - {course._id?.slice(0, 10)}...
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={handleSubmitCourse} action="">
            <div className="flex flex-col gap-3">
              {/* Name Course */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Name Course: </h1>
                <input
                  className="border-2 outline-none p-2 w-full rounded-lg"
                  type="text"
                  placeholder="Eg: Reactjs, JavaScript ..."
                  name="name"
                  value={course.name}
                  onChange={handleChangeInput}
                />
              </div>

              {/* Image */}
              <div className="">
                <h1 className="font-bold text-[20px]">Image Course: </h1>
                <input
                  type="file"
                  className=""
                  onChange={handleChangeInputFile}
                />
              </div>

              {/* Description Course */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Description Course: </h1>
                <textarea
                  className="w-full h-[100px] border-2 outline-none p-2 rounded-lg"
                  name="description"
                  id=""
                  value={course.description}
                  onChange={handleChangeInput}
                ></textarea>
              </div>

              {/* Access Modifier */}
              <div className="flex gap-2 items-center">
                <h1 className="font-bold text-[20px]">
                  Access Modifier Course:{" "}
                </h1>
                <div className="flex gap-3">
                  <div className="">
                    <input
                      type="radio"
                      id="public"
                      name="accessModifier"
                      className="mr-2"
                      onChange={handleChangeInput}
                      value="public"
                    />
                    <label htmlFor="public">Public</label>
                  </div>
                  <div className="">
                    <input
                      type="radio"
                      id="private"
                      name="accessModifier"
                      defaultChecked
                      className="mr-2"
                      value="private"
                      onChange={handleChangeInput}
                    />
                    <label htmlFor="private">Private</label>
                  </div>
                </div>
              </div>

              {/* Category Course */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Category Course: </h1>

                <select
                  className="w-[300px] border-2"
                  name="category"
                  onChange={handleChangeInput}
                >
                  <option value="">Choose a category Course</option>
                  {categories?.map((category, index) => (
                    <option key={index} value={category._id} className="">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Video Introduce */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">
                  Video Introduce Course:
                </h1>
                <input
                  className="border-2 outline-none p-2 w-full rounded-lg"
                  type="text"
                  placeholder="Eg: https://www.youtube.com/embed/nameVideo"
                  name="videoIntro"
                  value={course.videoIntro}
                  onChange={handleChangeInput}
                />
              </div>

              {/* Paid Course || Course no paid */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <h1 className="font-bold text-[20px]">Course format: </h1>
                  <div className="flex gap-3">
                    <div className="">
                      <input
                        type="radio"
                        id="paid"
                        name="format"
                        className="mr-2"
                        onChange={handleChangeInput_paidCourse}
                        value="paid"
                      />
                      <label htmlFor="paid">Paid Course</label>
                    </div>
                    <div className="">
                      <input
                        type="radio"
                        id="free"
                        name="format"
                        defaultChecked
                        className="mr-2"
                        onChange={handleChangeInput_paidCourse}
                        value="free"
                      />
                      <label htmlFor="free">Free Course</label>
                    </div>
                  </div>
                </div>

                {isPaidCourse ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <h1 className="font-bold text-[20px]">Price: </h1>
                      <input
                        className="border-2 outline-none w-[100px] rounded-lg"
                        type="text"
                        name="price"
                        value={course.price}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="flex gap-2">
                      <h1 className="font-bold text-[20px]">Old Price: </h1>
                      <input
                        className="border-2 outline-none w-[100px] rounded-lg"
                        type="text"
                        name="oldPrice"
                        value={course.oldPrice}
                        onChange={handleChangeInput}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="p-2 border-2 rounded-lg hover:bg-sky-500 hover:text-white transition font-bold"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>

        {/* Chapter && Lesson */}
        <div className="border-2 p-2">
          <h1 className="font-bold text-[30px]">Create Chapter and Lessons</h1>
          <div className="">
            {/* Chapter Course */}
            <div className="">
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Name Chapter: </h1>
                <input
                  className="border-2 outline-none p-2 w-full rounded-lg"
                  type="text"
                  placeholder="Eg: Reactjs, JavaScript ..."
                  name="name"
                  value={chapter?.name ? chapter.name : ""}
                  onChange={handleChangeInput_Chapter}
                />
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="
                    p-2 border-2 font-bold
                    hover:bg-sky-500 hover:text-white 
                    rounded-lg transition 
                    "
                  onClick={handleCreateChapter}
                >
                  Create Chapter
                </button>
              </div>
            </div>

            {/* Lesson */}
            <div className="flex flex-col gap-2">
              {/* Lesson Name */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Lesson Name: </h1>
                <input
                  className="border-2 outline-none p-2 w-full rounded-lg"
                  type="text"
                  name="name"
                  value={lesson.name}
                  onChange={handleChangeInput_Lesson}
                />
              </div>

              {/* Choose Chapter */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Choose Chapter: </h1>

                <select
                  className="w-[300px] border-2"
                  name="category"
                  onChange={handleChapterNow}
                >
                  <option value="">Choose a Chapter</option>
                  {course.content?.map((c, index) => (
                    <option key={index} value={c._id} className="">
                      {c.name} - {c._id?.slice(0, 10)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Description Lesson */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Description Lesson: </h1>
                <textarea
                  className="w-full h-[100px] border-2 outline-none p-2 rounded-lg"
                  name="description"
                  id=""
                  value={lesson.description}
                  onChange={handleChangeInput_Lesson}
                ></textarea>
              </div>

              {/* Path Video or upload Video */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <h1 className="font-bold text-[20px]">
                    Choose Type Upload Video:{" "}
                  </h1>
                  <div className="flex gap-3">
                    <div className="">
                      <input
                        type="radio"
                        id="linkYoutube"
                        name="uploadVideo"
                        className="mr-2"
                        onChange={handleChangeInput_uploadVideo}
                      />
                      <label htmlFor="linkYoutube">Link Youtube</label>
                    </div>
                    <div className="">
                      <input
                        type="radio"
                        id="uploadOnComputer"
                        name="uploadVideo"
                        defaultChecked
                        className="mr-2"
                        onChange={handleChangeInput_uploadVideo}
                      />
                      <label htmlFor="uploadOnComputer">
                        Upload on computer
                      </label>
                    </div>
                  </div>
                </div>

                {chooseTypeVideoUpload ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold text-[20px]">Link Video: </h1>
                      <input
                        className="border-2 outline-none w-full rounded-lg"
                        type="text"
                        name="url"
                        value={lesson.url as string}
                        placeholder="Eg: https://www.youtube.com/embed/nameVideo"
                        onChange={handleChangeInput_Lesson}
                      />
                    </div>
                  </div>
                ) : (
                  <input type="file" className="" />
                )}
              </div>

              <div className="flex justify-end">
                {chooseLesson._id ? (
                  <button
                    onClick={handleUpdateLesson}
                    className="p-2 border-2 rounded-lg hover:bg-sky-500 hover:text-white transition font-bold"
                  >
                    Update Lesson
                  </button>
                ) : (
                  <button
                    onClick={handleAddLesson}
                    className="p-2 border-2 rounded-lg hover:bg-sky-500 hover:text-white transition font-bold"
                  >
                    Create Lesson
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Course  */}
      <div className="w-1/3">
        <PreviewCourse course={course} />
      </div>
    </div>
  );
};

export default CreateCourse;
