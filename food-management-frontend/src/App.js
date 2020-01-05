import React, { Component } from "react";
import {toast} from "react-toastify";
import logo from "./logo.svg";
import "./App.css";
import Router from "../src/Router/Router.hoc";

toast.configure({ position: toast.POSITION.BOTTOM_RIGHT });

class App extends Component {
  render() {
    return <Router />;
  }
}


export default App;
