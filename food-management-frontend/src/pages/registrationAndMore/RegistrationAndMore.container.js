import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, string, object, func } from "prop-types";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { bindActionCreators } from "redux";

import { getLoggedStatus, getToken } from "../../selectors/user.selectors";
import RegistrationAndMore from "./RegistrationAndMore.component";
import { register } from "./../../actions/user.actions";

class RegistrationAndMoreContainer extends Component {
  static propTypes = {
    history: object,
    loggedStatus: bool,
    dispatch: func,
    register: func,
    loggedStatus: bool,
    token: string
  };

  constructor(props) {
    super(props);
    console.log("reset form");
    //this.props.dispatch(reset("registrationform"));
  }

  componentDidMount() {
    if (this.props.loggedStatus) {
      return this._redirectToHomePage();
    }
  }

  _redirectToHomePage = () => this.props.history.push("/");

  handleSubmit = (values) => {
    //console.log(JSON.stringify(values));
    // console.log("jestem tutaj");
    // console.log(values.login + " " + values.emailSignIn + " " + values.passwordConfirm);
    // toast.error(values.login + " " + values.emailSignIn + " " + values.passwordConfirm);
    return this.props.register(values.login, values.emailSignIn, values.password).then(()=>{
      toast.info("Confirmation email was send.");
    }).catch(err => {
      if (!err.response) {
        toast.warn("Server is unreachable. Check your internet connection.");
      } else {
        toast.error("Invalid registration data.");
      }
    });
  }

  handleSubmitSendEmail = values => {
    console.log("email");
    // return this.props
    //   .loginUser(values.login, values.password)
    //   .then(() => {
    //     if (this.props.loggedStatus && this.props.token) {
    //       this._redirectToHomePage();
    //     }
    //   })
    //   .catch(err => {
    //     if (!err.response) {
    //       toast.warn("Server is unreachable. Check your internet connection.");
    //     } else {
    //       toast.error("Invalid Username or Password");
    //     }
    //   });
  };
  //handleSubmitSignIn, handleSubmitSendEmail

  render() {
    return (
      <RegistrationAndMore
      onSubmit={this.handleSubmit}
      // handleSubmitSignIn={this.handleSubmitSignIn}
      //   handleSubmitSendEmail={this.handleSubmitSendEmail}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedStatus: getLoggedStatus(state),
    token: getToken(state)
  };
};

function mapDispatchToProps(dispatch) {
  return { dispatch, register: bindActionCreators(register, dispatch) };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationAndMoreContainer));
