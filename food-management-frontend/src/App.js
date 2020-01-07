import React, { Component } from "react";
import { toast } from "react-toastify";
import "./App.css";
import Router from "../src/Router/Router.hoc";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

import "react-toastify/dist/ReactToastify.css";
import "./pages/styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

toast.configure({ position: toast.POSITION.BOTTOM_RIGHT });

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
