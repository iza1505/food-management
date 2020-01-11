import React, { Component } from "react";
import { connect } from "react-redux";
import { string, func, object } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";

import { confirmAccount } from "../../actions/user.actions";
import ConfirmedEmail from "./ConfirmedEmail.component";

class ConfirmedEmailContainer extends Component {
  static propTypes = {
    information: string,
    token: string,
    confirmAccount: func
  };

  state = {
    token: null,
    information: null
  };

  componentDidMount() {
    const parsed = querySearch.parse(this.props.location.search);
    const url = window.location.pathname + "?token=" + parsed.token;
    this.props
      .confirmAccount(url)
      .then(() => {
        this.setState({ information: "Your account is confirmed." });
      })
      .catch(err => {
        if (!err.response) {
          this.setState({
            information:
              "Server is unreachable. Check your internet connection."
          });
        } else {
          this.setState({ information: "Invalid data." });
        }
      });
    // this.props.fetchDelegationChecklist(this.props.delegationId).then(() => {
    //   this.setState({ delegationChecklist: this.props.delegationChecklist });
    // });
  }

  render() {
    return <ConfirmedEmail information={this.state.information} />;
  }
}

const mapDispatchToProps = {
  confirmAccount
};

export default withRouter(
  connect(null, mapDispatchToProps)(ConfirmedEmailContainer)
);
