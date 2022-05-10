import { patchApi } from "../../utils/FetchData";
import { AppDispatch, IPayloadResetPass } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { checkTokenExp } from "../../utils/CheckTokenExp";
import { checkPassword } from "../../utils/Valid";

const userAction = {
  resetPassword: async (
    payload: IPayloadResetPass,
    token: string,
    dispatch: AppDispatch
  ) => {
    const { password, cf_password } = payload;
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    const checkPass_Cf = checkPassword(password, cf_password);

    if (checkPass_Cf)
      dispatch(alertSlice.actions.alertAdd({ error: checkPass_Cf }));

    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const res = await patchApi("reset_password", { password }, access_token);
      console.log("Res: ", res);
      if (!res.data.success) {
        return dispatch(alertSlice.actions.alertAdd({ error: res.data.msg }));
      }
      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default userAction;
