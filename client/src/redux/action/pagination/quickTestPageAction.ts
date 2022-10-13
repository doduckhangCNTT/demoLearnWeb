import ListsSorted from "../../../hooks/useSorted";
import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { getApi } from "../../../utils/FetchData";
import { AppDispatch, ICategory, IQuickTest } from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { quickTestsPageSlice } from "../../reducers/pagination/quickTestPageSlice";

interface IGetQuickTestsPage {
  page: number | 1;
  sort: string;
  limit: number;
}

const quickTestPageAction = {
  getQuickTestsPage: async (
    data: IGetQuickTestsPage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const { page, limit } = data;
      const res = await getApi(
        `quickTestsPage?page=${page}&limit=${limit}`,
        access_token
      );
      const { quickTestsPage, totalCount } = res.data;

      // If on path url have option sort is --> trang tiep theo cung muon sap xep nhu vay
      if (data.sort) {
        const value = data.sort;
        let items = [] as IQuickTest[] | undefined;

        if (value === "category") {
          items = ListsSorted<IQuickTest>(quickTestsPage, value, "name");
        } else {
          items = ListsSorted<IQuickTest>(quickTestsPage, value);
        }

        dispatch(
          quickTestsPageSlice.actions.createQuickTestPage({
            data: items,
            totalCount,
          })
        );
      } else {
        dispatch(
          quickTestsPageSlice.actions.createQuickTestPage({
            data: quickTestsPage,
            totalCount,
          })
        );
      }

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default quickTestPageAction;
