import { FETCH_USER } from "../actions/types";
//forma reducera, ima argumente state(sa default vrijednosti) i action
export default function (state = null, action) {
  // ako jos nije pokusao logirati se state ce biti null, ako je uspjesno logiran biti ce user model, inace je false
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
