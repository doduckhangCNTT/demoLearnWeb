import { AppDispatch } from "./Typescript";
import jwt_decode from "jwt-decode";
import actionAuth from "../redux/action/actionAuth";
import { getApi } from "./FetchData";

interface IDecode {
  exp: number;
  iat: number;
  id: string;
}

export const checkTokenExp = async (token: string, dispatch: AppDispatch) => {
  // console.log("Token: ", token);
  const decode: IDecode = jwt_decode(token);
  // console.log("Decode: ", decode);

  if (decode.exp >= Date.now() / 1000) return;
  const res = await getApi("refresh_token");
  // await actionAuth.refreshAction(dispatch);
  console.log("ACCESS_TOKEN: ", res.data);

  return res.data.access_token;
};
