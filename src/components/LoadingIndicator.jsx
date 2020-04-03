import React from "react";
import { ReactComponent as Loader } from "../assets/Loader.svg";

const LoadingIndicator = () => {
  return (
    <div className="LoadingContainer">
      <Loader className="LoadingIndicator" />
    </div>
  );
};

export default LoadingIndicator;
