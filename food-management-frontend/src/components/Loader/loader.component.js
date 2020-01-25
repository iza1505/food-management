import React from "react";
import { bool } from "prop-types";
import Loader from "react-loader-spinner";

const renderLoader = ({ visible }) => {
  return (
    <div>
      <Loader type="ThreeDots" height={80} width={40} visible={visible} />
    </div>
  );
};

renderLoader.propTypes = {
  visible: bool
};

export default renderLoader;
