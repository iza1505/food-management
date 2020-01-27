import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, func, string } from "prop-types";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { reset } from "redux-form";

import ResetPasswordModalForm from "./ResetPasswordModalForm.component";
import { sendResetPasswordMail } from "../../../actions/user.actions";
import { getFetchingUser, getError } from "../../../selectors/user.selectors";

export class ResetPasswordModalFormContainer extends Component {
  static propTypes = {
    dispatch: func,
    error: string,
    fetching: bool,
    sendResetPasswordMail: func
  };

  handleSubmit = values => {
    return this.props
      .sendResetPasswordMail(values.login, values.email)
      .then(() => {
        this.props.dispatch(reset("resetPasswordModalForm"));
        toast.info("Email zmieniający hasło został wysłany.");
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(
            "Serwer jest nieosiągalny. Sprawdź swoje połączenie z internetem."
          );
        } else {
          toast.error(this.props.error);
        }
      });
  };

  render() {
    return (
      <ResetPasswordModalForm
        onSubmit={this.handleSubmit}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  fetching: getFetchingUser(state),
  error: getError(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    sendResetPasswordMail: bindActionCreators(sendResetPasswordMail, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordModalFormContainer);
