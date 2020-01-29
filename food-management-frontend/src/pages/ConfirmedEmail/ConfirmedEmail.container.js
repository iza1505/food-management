import React, { Component } from "react";
import { connect } from "react-redux";
import { string, func } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { withTranslation } from "react-i18next";

import { confirmAccount } from "../../actions/user.actions";
import { getError } from "../../selectors/user.selectors";
import ConfirmedEmail from "./ConfirmedEmail.component";

class ConfirmedEmailContainer extends Component {
  static propTypes = {
    confirmAccount: func,
    error: string,
    t: func
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
        this.setState({
          information: this.props.t("toastInfo.accountHasBeenConfirmed")
        });
      })
      .catch(err => {
        if (!err.response) {
          this.setState({
            information: this.props.t("toastInfo.unreachableServer")
          });
        } else {
          this.setState({ information: this.props.t(this.props.error) });
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

export default withTranslation("common")(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ConfirmedEmailContainer)
  )
);
