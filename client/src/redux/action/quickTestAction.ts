import { checkTokenExp } from "../../utils/CheckTokenExp";
import { getApi, patchApi, postApi } from "../../utils/FetchData";
import { AppDispatch, IQuickTest } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { quickTestSlice } from "../reducers/quickTest/quickTestSlice";
import { idQuickTestSlice } from "../reducers/quickTest/IdQuickTestNow";
import { quickTestNowSelector } from "../selector/selectors";
import { useSelector } from "react-redux";

const quickTestAction = {
  createQuickTest: async (
    quickTest: IQuickTest,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      // Upload img
      let formData = new FormData();
      formData.append("file", quickTest.image.url);
      const resImg = await postApi("upload", formData, access_token);
      const data = { public_id: resImg.data.public_id, url: resImg.data.url };

      const newQuickTest = { ...quickTest, image: data };
      const res = await postApi("quickTest", newQuickTest, access_token);
      // console.log("Create QuickTest: ", res.data);

      // Cập nhật id hiện tại của quick test
      const id_TestNow = res.data.newQuickTest._id;
      dispatch(
        idQuickTestSlice.actions.createIdQuickTestNow({ id: id_TestNow })
      );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getQuickTests: async (token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const resQuickTests = await getApi("quickTests", access_token);
      console.log("Quick Tests: ", resQuickTests);
      if (resQuickTests.data) {
        dispatch(quickTestSlice.actions.createQuickTests(resQuickTests.data));
      }

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getQuickTest: async (
    quickTest: IQuickTest,
    token: string,
    dispatch: AppDispatch
  ) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateQuickTest: async (
    quickTest: IQuickTest,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      // console.log("Quick test: ", quickTest);

      const res = await patchApi(
        `quickTest/${quickTest?.idQuickTest}`,
        { quickTest },
        access_token
      );
      // console.log("Res Update test: ", res.data);

      dispatch(
        quickTestSlice.actions.updateQuestionQuickTest({
          idQuickTest: quickTest.idQuickTest,
          quickTest,
        })
      );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteQuickTest: async (
    quickTest: IQuickTest,
    token: string,
    dispatch: AppDispatch
  ) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default quickTestAction;
