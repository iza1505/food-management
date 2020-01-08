import React, { Component } from "react";
import { connect } from "react-redux";
import { string } from "prop-types";

import { getLogin } from "../../selectors/user.selectors";
import Home from "./Home.component";

class HomeContainer extends Component {
  static propTypes = {
    login: string
  };

  render() {
    return <Home login={this.props.login} />;
  }
}

const mapStateToProps = state => ({
    login: getLogin(state)
  });

export default connect(mapStateToProps)(HomeContainer);
