import React, { Component } from "react";
import { connect } from "react-redux";
import { func, string, bool } from "prop-types";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";

import RegistrationModalForm from "./RegistrationModalForm.component";
import { register } from "../../../actions/user.actions";
import {
  getRole,
  getFetchingUser,
  getError,
  getLogin
} from "../../../selectors/user.selectors";

export class RegistrationModalFormContainer extends Component {
  static propTypes = {
    dispatch: func,
    error: string,
    fetching: bool,
    register: func,
    t: func,
    userLogin: string,
    userRole: string
  };

  handleSubmit = values => {
    let role;

    if (values.role) {
      role = values.role.replace(/"/g, "");
    } else {
      role = null;
    }
    return this.props
      .register(
        values.login,
        values.email,
        values.password1,
        role,
        this.props.userLogin
      )
      .then(() => {
        this.props.dispatch(reset("registrationModalForm"));
        toast.info(this.props.t("toastInfo.confirmationEmailSend"));
      })
      .catch(err => {
        if (!err.response) {
          toast.warn(this.props.t("toastInfo.unreachableServer"));
        } else {
          toast.error(this.props.t(this.props.error));
        }
      });
  };

  render() {
    return (
      <RegistrationModalForm
        onSubmit={this.handleSubmit}
        userRole={this.props.userRole}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  userRole: getRole(state),
  fetching: getFetchingUser(state),
  error: getError(state),
  userLogin: getLogin(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    register: bindActionCreators(register, dispatch)
  };
}

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProps)(RegistrationModalFormContainer)
);
