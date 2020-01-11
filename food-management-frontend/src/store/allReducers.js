import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

 import userReducer from "../reducers/user.reducer";
 import { ACTIONS } from "../actions/user.actions";

const allReducers = combineReducers({
  form: formReducer,
  user: userReducer
});

const rootReducer = (state, action) => {
  if(action.type === ACTIONS.LOGOUT_USER){
    state = undefined;
  }
      

  return allReducers(state, action);
};

export default rootReducer;
