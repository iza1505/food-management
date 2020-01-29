import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, func, object, number, string } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import _ from "lodash";
import { withTranslation } from "react-i18next";

import {
  getPageCount,
  getRecipesHeaders,
  getCurrentPage,
  getFetchingHeaders
} from "../../../selectors/recipeHeaders.selectors";

import { getRole } from "../../../selectors/user.selectors";

import {
  getHeaders,
  resetHeaders,
  resetCurrentPageOnSubmit
} from "../../../actions/recipeHeaders.actions";
import HeadersUser from "./HeadersUser.component";
import { userRoles } from "../../../configuration/roles";

//import { Toast } from "../../../components/Toast/Toast";

class HeadersUserContainer extends Component {
  static propTypes = {
    currentPage: number,
    fetching: bool,
    getHeaders: func,
    history: object,
    pageCount: number,
    recipeHeaders: array,
    resetCurrentPageOnSubmit: func,
    resetHeaders: func,
    userRole: string,
    t: func
  };

  state = {
    paginationElem: []
  };

  constructor(props) {
    super(props);
    this.props.resetHeaders();
  }

  reloadData = newPage => {
    const parsed = querySearch.parse(this.props.location.search);
    if (!_.isEmpty(parsed)) {
      let url =
        window.location.pathname +
        "?elementsOnPage=" +
        parsed.elementsOnPage +
        "&currentPage=" +
        newPage +
        "&possibleMissingIngredientsAmount=" +
        parsed.possibleMissingIngredientsAmount;

      if (parsed.sortBy) {
        url = url + "&sortBy=" + parsed.sortBy.replace(/"/g, "");
      }

      if (parsed.ascendingSort) {
        url = url + "&ascendingSort=" + parsed.ascendingSort;
      }
      this.props.history.push(url);
    }
  };

  componentDidMount() {
    //console.log("did mount " + JSON.stringify(this.props));
    const parsed = querySearch.parse(this.props.location.search);
    if (!_.isEmpty(parsed)) {
      let url =
        window.location.pathname + "?elementsOnPage=" + parsed.elementsOnPage;

      if (parsed.sortBy) {
        url = url + "&sortBy=" + parsed.sortBy.replace(/"/g, "");
      }

      if (parsed.ascendingSort) {
        url = url + "&ascendingSort=" + parsed.ascendingSort;
      }

      if (parsed.currentPage) {
        url = url + "&currentPage=" + parsed.currentPage;
      } else {
        url = url + "&currentPage=1";
      }

      if (this.props.userRole === userRoles.user) {
        url =
          url +
          "&possibleMissingIngredientsAmount=" +
          parsed.possibleMissingIngredientsAmount;
      }

      this.props
        .getHeaders(url)
        .then(() => {
          this.createPagination();
        })
        .catch(err => {
          if (!err.response) {
            toast.warn(this.props.t("toastInfo.unreachableServer"));
          } else {
            toast.error(this.props.t("toastInfo.cantDownloadRecipes"));
          }
        });
    }
  }

  createPagination() {
    let tempPagiElems = [];
    for (
      let i = this.props.currentPage - 10;
      i < Number(this.props.currentPage) + 10;
      i++
    ) {
      if (i > 0 && i <= Number(this.props.pageCount)) {
        tempPagiElems.push(i);
      }
    }
    this.setState({ paginationElem: tempPagiElems });
  }

  handlePagination = page => {
    this.reloadData(page);
  };

  handleClick = e => {
    if (e.target.name === "submit_button") {
      this.props.resetCurrentPageOnSubmit();
    }
  };

  render() {
    return (
      <HeadersUser
        pageCount={this.props.pageCount}
        recipeHeaders={this.props.recipeHeaders}
        currentPage={this.props.currentPage}
        handlePagination={this.handlePagination}
        paginationElem={this.state.paginationElem}
        userRole={this.props.userRole}
        handleClick={this.handleClick}
        fetching={this.props.fetching}
      />
    );
  }
}

const mapDispatchToProps = {
  getHeaders,
  resetHeaders,
  resetCurrentPageOnSubmit
};

const mapStateToProps = state => ({
  pageCount: getPageCount(state),
  recipeHeaders: getRecipesHeaders(state),
  currentPage: getCurrentPage(state),
  userRole: getRole(state),
  fetching: getFetchingHeaders(state)
});

export default withTranslation("common")(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(HeadersUserContainer))
);
