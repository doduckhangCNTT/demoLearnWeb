import { createSlice } from "@reduxjs/toolkit";
import { ICourses } from "../../../utils/Typescript";
import { ICourseType } from "../../types/courseType";

const initialState: ICourses[] = [];

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    createCourse: (state, action: any) => {},

    getCourses: (state, action: ICourseType) => {
      return action.payload;
    },

    updateCourse: (state, action: any) => {},

    deleteCourse: (state, action: any) => {},
  },
});
