import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompactParam from "../../../components/CompactParam";
import LazyLoadingImg from "../../../components/LazyLoadingImg/LazyLoadingImg";
import categoryAction from "../../../redux/action/categoryAction";
import courseAction from "../../../redux/action/course/courseAction";
import { alertSlice } from "../../../redux/reducers/alertSlice";
import {
  authSelector,
  categorySelector,
} from "../../../redux/selector/selectors";
import {
  FormSubmit,
  IChapter,
  ICourses,
  InputChangedEvent,
} from "../../../utils/Typescript";

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
    courses: [] as IChapter[],
  };

  const categoriesCourse = ["FrontEnd", "BackEnd", "Devops"];

  const [course, setCourse] = useState<ICourses>(initialState);
  const [isPaidCourse, setIsPaidCourse] = useState(false);
  const [chooseTypeVideoUpload, setChooseTypeVideoUpload] = useState(false);

  const { categories } = useSelector(categorySelector);
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    categoryAction.getCategory(dispatch);
  }, [dispatch]);

  const handleChangeInput_paidCourse = (e: InputChangedEvent) => {
    setIsPaidCourse(!isPaidCourse);
    const { name, value } = e.target;

    setCourse({ ...course, [name]: value });
  };

  useEffect(() => {
    if (course.format === "free") {
      console.log("OK");
      setCourse({ ...course, price: 0, oldPrice: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.format]);

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

  const handleSubmitCourse = (e: FormSubmit) => {
    e.preventDefault();
    if (!authUser.access_token) {
      return dispatch(
        alertSlice.actions.alertAdd({ error: "Invalid access token" })
      );
    }
    courseAction.createCourse(course, authUser.access_token, dispatch);
  };

  return (
    <div className="flex gap-2">
      <div className=" w-2/3 flex flex-col gap-2">
        {/* Create Course */}
        <div className=" border-2 p-2">
          <h1 className="font-bold text-[30px]">Create Course</h1>
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
                  onChange={handleChangeInput_CourseName}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="p-2 border-2 rounded-lg hover:bg-sky-500 hover:text-white transition font-bold"
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
                />
              </div>

              {/* Choose Chapter */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Choose Chapter: </h1>

                <select className="w-[300px] border-2" name="quickTest">
                  <option value="">Choose a Choose Chapter</option>
                  {categoriesCourse?.map((category, index) => (
                    <option key={index} value={""} className="">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description Lesson */}
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-[20px]">Description Lesson: </h1>
                <textarea
                  className="w-full h-[100px] border-2 outline-none p-2 rounded-lg"
                  name=""
                  id=""
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
                        placeholder="Eg: https://www.youtube.com/embed/nameVideo"
                      />
                    </div>
                  </div>
                ) : (
                  <input type="file" className="" />
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="p-2 border-2 rounded-lg hover:bg-sky-500 hover:text-white transition font-bold"
                >
                  Create Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Course  */}
      <div className="w-1/3">
        <div className="">
          <h1 className="font-bold text-[30px]">Preview Course</h1>
          <div className="border-2 rounded-lg p-2 mt-3">
            <div className="">
              {typeof course.thumbnail.url === "string" ? (
                <LazyLoadingImg
                  url={course.thumbnail.url}
                  alt=""
                  className="w-full"
                />
              ) : (
                <LazyLoadingImg
                  url={URL.createObjectURL(course.thumbnail.url as Blob)}
                  alt=""
                  className="w-full"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="">
                <h1 className="font-bold text-[20px]">{course.name}</h1>
                <CompactParam param={course.description} quantitySlice={100} />
              </div>
              {course.price === 0 && course.oldPrice === 0 ? (
                ""
              ) : (
                <div className="flex gap-2 items-center">
                  <small>{course.oldPrice}đ</small>
                  <div className="text-[20px] text-sky-500 font-bold">
                    {course.price}đ
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 border-2 p-2">
          <h1 className="font-bold text-[30px]">Lessons</h1>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
