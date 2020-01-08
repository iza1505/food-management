import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

// import accommodationsReducer from "../reducers/accommodations.reducer";
// import checklistsReducer from "../reducers/checklists.reducer";
// import checklistTemplateReducer from "../reducers/checklistTemplate.reducer";
// import countriesReducer from "../reducers/countries.reducer";
// import countryReducer from "../reducers/country.reducer";
// import delegationChecklistReducer from "../reducers/delegationChecklist.reducer";
// import delegationsReducer from "../reducers/delegations.reducer";
// import expensesReducer from "../reducers/expenses.reducer";
// import reportReducer from "../reducers/report.reducer";
// import flightsReducer from "../reducers/flights.reducer";
// import themeReducer from "../reducers/theme.reducer";
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
