import React, { Component } from "react";
import _ from "lodash";

class MySelect extends Component {
  constructor(props) {
    super(props);

    //console.log("Propsy: " + JSON.stringify(props));
    this.state = {
      value: this.props.input.value,
      options: this.props.options
    };
  }
  state = {
    value: this.props.input.value,
    options: []
  };

  handleChange(e) {
    console.log("target: " + e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    console.log("state " + this.state.value);
    return (
      <div>
        <select
          {...this.props.input}
          style={{ position: "relative" }}
          type={this.props.type}
          className={this.props.className}
          onChange={e => this.handleChange(e)}
          value={this.state.value}
          //defaultValue={this.state.value}
        >
          {/* {this.props.options.map((elem, index) => (
            <option
              value={this.state.value}
              key={index + this.props.input.name}
              //selected="selected"
            >
              {elem.label}
            </option>
          ))} */}
          {this.props.options.map((elem, index) =>
            _.isEqual(elem.value, this.props.input.value) ? (
              <option value={elem.value} key={index} selected="selected">
                {elem.label}
              </option>
            ) : (
              <option value={JSON.stringify(elem.value)} key={index}>
                {elem.label}
              </option>
            )
          )}
        </select>
      </div>
    );
  }
}

export default MySelect;
