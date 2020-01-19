import React, { Component } from "react";
import _ from "lodash";

class MySelect extends Component {
  constructor(props) {
    super(props);

    //console.log("Propsy: " + JSON.stringify(props));
    this.state = {
      value: props.input.value
    };
  }
  state = {
    value: null,
    options: []
  };

  handleChange(e) {
    //console.log("data: " + document.getElementById(data).value);
    //let val = e.target.value;
    //console.log(e);
    //console.log("e " + JSON.parse(e.target.value.rgragraga));
    // console.log("to json: " + JSON.stringify(e.target.selectedIndex));
    this.setState({
      value: this.props.options[e.target.selectedIndex].value
    });
  }

  render() {
    //console.log("props input: " + JSON.stringify(this.state.value));
    //console.log(JSON.stringify(this.props.options));
    return (
      <div>
        <select
          {...this.props.input}
          //defaultValue={this.props.input.value}
          style={{ position: "relative" }}
          type={this.props.type}
          className={this.props.className}
          //name={this.props.input.name}
          //key={this.props.input.name}
          onChange={e => this.handleChange(e)}
          //value="1"
          //value={this.props.input.value}
        >
          {this.props.options.map((elem, index) => (
            <option
              value={this.state.value}
              key={index + this.props.input.name}
              selected="selected"
            >
              {elem.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default MySelect;
