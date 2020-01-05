import React, { Component } from "react";
import {toast} from "react-toastify";
import logo from "./logo.svg";
import "./App.css";

toast.configure({ position: toast.POSITION.BOTTOM_RIGHT });

// class App extends Component {
//   render() {
//     return <Router />;
//   }
// }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
