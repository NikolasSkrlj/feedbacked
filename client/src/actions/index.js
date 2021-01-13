import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  //ovo omogucuje redux thunk; ako vracamo funkciju umjesto objekta kao action, omoguciti ce pristup dispatch funkciji tako da
  // mozemo manualno pozvati je kada trebamo

  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
