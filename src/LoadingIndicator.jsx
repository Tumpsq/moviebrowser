import React from "react";
import { ReactComponent as Loader } from "./Assets/Loader.svg";

const LoadingIndicator = () => {
  return (
    <div className="LoadingContainer">
      <Loader className="LoadingIndicator" />
    </div>
  );
};

export default LoadingIndicator;
