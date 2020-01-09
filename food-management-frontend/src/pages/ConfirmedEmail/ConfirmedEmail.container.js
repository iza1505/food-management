import React, { Component } from "react";
import { connect } from "react-redux";
import { string, func, object } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";

import { confirmEmail } from "../../actions/user.actions";
import ConfirmedEmail from "./ConfirmedEmail.component";

class ConfirmedEmailContainer extends Component {
  static propTypes = {
    information: string,
    token: string,
    match: object,
    confirmEmail: func
  };

//   constructor(props) {
//     super(props);
//     console.log("jestem tu");
//     const parsed = querySearch.parse(this.props.location.search);
//     this.setState({token: parsed.token});
//     //this.token = this.authority;
//     console.log(parsed.token);
//     console.log(this.props.token);
//     //console.log(this.authority);
    
//   }
state = {
    token: null,
    information: null
  };

  componentDidMount() {
    const parsed = querySearch.parse(this.props.location.search);
    //console.log("path: " + window.location.pathname);
    const url = window.location.pathname + "?token=" + parsed.token;
    this.props.confirmEmail(url).then(() => {
        this.setState({information: "Your account is confirmed."});
    }).catch(err => {
        if (!err.response) {
            this.setState({information: "Server is unreachable. Check your internet connection."});
        } else {
            this.setState({information: "Invalid data."});
        }
      });
    // this.props.fetchDelegationChecklist(this.props.delegationId).then(() => {
    //   this.setState({ delegationChecklist: this.props.delegationChecklist });
    // });
  }

  render() {
    console.log(this.state.token);
    return <ConfirmedEmail information={this.state.information} />;
  }
}

const mapDispatchToProps = {
    confirmEmail
  };

export default withRouter(connect(null, mapDispatchToProps)(ConfirmedEmailContainer));

