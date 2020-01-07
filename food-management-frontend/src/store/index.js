import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import { RequestActionMiddleware } from "../middleware";
import rootReducer from "./allReducers";
//import allReducers from "./allReducers";
import persistConfiguration from "./persistConfiguration";

const persistedReducer = persistReducer(persistConfiguration, rootReducer);
const enhancers = applyMiddleware(thunk, RequestActionMiddleware);

export const store = createStore(persistedReducer, enhancers);
export const persistor = persistStore(store);
