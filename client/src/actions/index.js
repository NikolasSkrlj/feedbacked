import axios from "axios";
import { FETCH_USER } from "./types";

// s action creatorima mozemo lako reusati akcije, i koristiti redux thunk za asinkrone operacije
export const fetchUser = () => async (dispatch) => {
  //ovo omogucuje redux thunk; ako vracamo funkciju umjesto objekta kao action, omoguciti ce pristup dispatch funkciji tako da
  // mozemo manualno pozvati je kada trebamo

  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  //ovaj request ce updateati userove kredite i poslati nazad usera
  const res = await axios.post("/api/stripe", token); // ovdje cemo poslati updatean user instance nazad tako da mozemo opet iskoristit fetch user action

  dispatch({ type: FETCH_USER, payload: res.data });
};
