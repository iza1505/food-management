import React, { Component } from "react";
import { connect } from "react-redux";
import { array, func, object, number } from "prop-types";
import { withRouter } from "react-router-dom";
import querySearch from "query-string";
import { toast } from "react-toastify";
import _ from "lodash";

import {
  getPageCount,
  getRecipesHeaders,
  getCurrentPage
} from "../../../selectors/recipeHeaders.selectors";

import { getHeaders } from "../../../actions/recipeHeaders.actions";
import HeadersUser from "./HeadersUser.component";

class HeadersUserContainer extends Component {
  static propTypes = {
    getHeaders: func,
    history: object,
    pageCount: number,
    recipeHeaders: array,
    currentPage: number
  };

  state = {
    elementsOnPage: 10,
    elementsOnPageOptions: [1, 2, 5, 20],
    //currentPage: 1,
    sortBy: null,
    sortByOptions: [
      { label: "Title", value: "title" },
      { label: "Missing ingredient amout", value: "missingIngredientsAmount" },
      {label: "Cookable %", value: "percentageToCook"}
    ],
    ascendingSort: null,
    possibleMissingIngredientsAmount: -1,
    paginationElem: []
  };

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
        url = url + "&sortBy=" + parsed.sortBy;
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
        window.location.pathname +
        "?elementsOnPage=" +
        parsed.elementsOnPage +
        "&possibleMissingIngredientsAmount=" +
        parsed.possibleMissingIngredientsAmount;

      if (parsed.sortBy) {
        url = url + "&sortBy=" + parsed.sortBy;
      }

      if (parsed.ascendingSort) {
        url = url + "&ascendingSort=" + parsed.ascendingSort;
      }

      if (parsed.currentPage) {
        url = url + "&currentPage=" + parsed.currentPage;
      } else {
        url = url + "&currentPage=1";
      }

      this.props.getHeaders(url).then(()=> {
        this.createPagination();
      })
      .catch(err => {
        if (!err.response) {
          toast.warn("Server is unreachable. Check your internet connection.");
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

  render() {
    return (
      <HeadersUser
        pageCount={this.props.pageCount}
        recipeHeaders={this.props.recipeHeaders}
        elementsOnPage={this.state.elementsOnPage}
        currentPage={this.props.currentPage}
        sortBy={this.state.sortBy}
        ascendingSort={this.state.ascendingSort}
        possibleMissingIngredientsAmount={
          this.state.possibleMissingIngredientsAmount
        }
        handlePagination={this.handlePagination}
        paginationElem={this.state.paginationElem}
        handlePrevious={this.handlePrevious}
        elementsOnPageOptions={this.state.elementsOnPageOptions}
        sortByOptions={this.state.sortByOptions}
      />
    );
  }
}

const mapDispatchToProps = {
  getHeaders
};

const mapStateToProps = state => ({
  pageCount: getPageCount(state),
  recipeHeaders: getRecipesHeaders(state),
  currentPage: getCurrentPage(state)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeadersUserContainer)
);
