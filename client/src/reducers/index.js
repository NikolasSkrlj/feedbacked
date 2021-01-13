import { combineReducers } from "redux";
import authReducer from "./authReducer";

//ova funkcija kombinira sve reducere
//objekt koji se proslijedjuje sadrzi keys koji predstavljaju keyseve u state objektu
export default combineReducers({
  auth: authReducer,
});
