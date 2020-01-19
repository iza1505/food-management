import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func, object, number, string } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import _ from "lodash";

import {
  getPageCount,
  getRecipesHeaders,
  getCurrentPage
} from "../../../selectors/recipeHeaders.selectors";

import { getRole } from "../../../selectors/user.selectors";

import {
  getHeaders,
  resetHeaders,
  resetCurrentPageOnSubmit
} from "../../../actions/recipeHeaders.actions";
import HeadersAuthor from "./HeadersAuthor.component";

class HeadersAuthorContainer extends Component {
  static propTypes = {
    currentPage: number,
    getHeaders: func,
    history: object,
    pageCount: number,
    recipeHeaders: array,
    resetHeaders: func,
    resetCurrentPageOnSubmit: func
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
        newPage;

      if (parsed.sortBy) {
        const str = parsed.sortBy.replace(/"/g, "");
        console.log(str);
        url = url + "&sortBy=" + str;
      }

      if (parsed.ascendingSort) {
        url = url + "&ascendingSort=" + parsed.ascendingSort;
      }
      this.props.history.push(url);
    }
  };

  componentDidMount() {
    const parsed = querySearch.parse(this.props.location.search);
    if (!_.isEmpty(parsed)) {
      let url =
        window.location.pathname + "?elementsOnPage=" + parsed.elementsOnPage;

      if (parsed.sortBy) {
        const str = parsed.sortBy.replace(/"/g, "");
        console.log(str);
        url = url + "&sortBy=" + str;
      }

      if (parsed.ascendingSort) {
        url = url + "&ascendingSort=" + parsed.ascendingSort;
      }

      if (parsed.currentPage) {
        url = url + "&currentPage=" + parsed.currentPage;
      } else {
        url = url + "&currentPage=1";
      }

      this.props
        .getHeaders(url)
        .then(() => {
          this.createPagination();
        })
        .catch(err => {
          if (!err.response) {
            toast.warn(
              "Server is unreachable. Check your internet connection."
            );
          } else {
            toast.error("Can't get recipes headers.");
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
      <HeadersAuthor
        pageCount={this.props.pageCount}
        recipeHeaders={this.props.recipeHeaders}
        currentPage={this.props.currentPage}
        handlePagination={this.handlePagination}
        paginationElem={this.state.paginationElem}
        handleClick={this.handleClick}
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
  currentPage: getCurrentPage(state)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeadersAuthorContainer)
);
