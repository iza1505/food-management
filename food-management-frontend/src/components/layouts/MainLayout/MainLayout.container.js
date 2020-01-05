import React, { Component } from "react";
import { connect } from "react-redux";
import { array, bool, object, oneOfType, string } from "prop-types";

import MainLayout from "./MainLayout.component";

export class MainLayoutContainer extends Component {
  static propTypes = {
    buttons: oneOfType([array, object]),
    buttonsHide: bool,
    children: object.isRequired,
    fullContent: bool,
    hideTitle: bool,
    title: string
  };

  constructor(props) {
    super(props);

    this._setDocumentTitle(this.props.title);
  }

  componentDidUpdate = () => {
    if (this.docTitle !== this.props.title) {
      this._setDocumentTitle(this.props.title);
    }
  };

  _setDocumentTitle = title => {
    this.docTitle = title;
    document.title = this.docTitle ? this.docTitle + " | Delegation Assistant" : "Delegation Assistant";
  };

  render() {
    return (
      <MainLayout
        title={this.props.title}
        hideTitle={this.props.hideTitle}
        buttonsHide={this.props.buttonsHide}
        buttons={this.props.buttons}
        fullContent={this.props.fullContent}
      >
        {this.props.children}
      </MainLayout>
    );
  }
}

export default connect(
  null,
  null
)(MainLayoutContainer);
