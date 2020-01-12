import React from "react";
import { array, bool, number, object, string, oneOfType } from "prop-types";

import styles from "./LabelWithData.module.scss";

const LabelWithData = ({ label, children, loading = false }) => {
  return (
    <div style={{alignItems: "center"}}>
      <div className="row">
        <div className="col-sm-1  ">
          <label className={styles["label-bold"]} htmlFor="row-content">
            {label}
          </label>
        </div>
        <div name="row-content">
          {loading ? (
            <div />
          ) : (
            <span className={styles["label-data"]}>{children}</span>
          )}
        </div>
      </div>
    </div>
  );
};

LabelWithData.propTypes = {
  children: oneOfType([array, object, string, number]),
  label: string.isRequired,
  loading: bool
};

export default LabelWithData;
