import React, { Component } from "react";
import { connect } from "react-redux";
import { string, func } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";

import { confirmAccount } from "../../actions/user.actions";
import { getError } from "../../selectors/user.selectors";
import ConfirmedEmail from "./ConfirmedEmail.component";

class ConfirmedEmailContainer extends Component {
  static propTypes = {
    confirmAccount: func,
    error: string
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
        this.setState({ information: "Twoje konto zostało potwierdzone." });
      })
      .catch(err => {
        if (!err.response) {
          this.setState({
            information:
              "Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem."
          });
        } else {
          this.setState({ information: this.props.error });
        }
      });
  }

  render() {
    return <ConfirmedEmail information={this.state.information} />;
  }
}

const mapStateToProps = state => ({
  error: getError(state)
});

const mapDispatchToProps = {
  confirmAccount
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConfirmedEmailContainer)
);
