import React from "react";

const MenuButton = ({ isMenuOpen, setIsMenuOpen }) => {
  const menuButtonStyles = {
    cursor: "pointer",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "0px 3px 3px 0px",
    top: "10px",
    left: "0px",
    outline: "none",
    fill: "white",
    filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.7))",
    boxShadow: "0px 0px 7px 1px rgba(0, 0, 0, 0.83)",
    transition: "0.5s",
    transform: isMenuOpen ? "translateX(200px)" : "translateX(0px)",
    backgroundColor: "rgba(0, 0, 0, 0.829)",
    WebkitTapHighlightColor: "transparent"
  };

  const barStyles = {
    width: "25px",
    height: "3px",
    backgroundColor: "white",
    margin: "5px 0",
    transition: "0.4s",
    borderRadius: "3px"
  };

  const bar1Styles = {
    transform: isMenuOpen ? "rotate(-45deg)" : "rotate(0deg)"
  };

  const bar2Styles = {
    opacity: isMenuOpen ? "0" : "1"
  };

  const bar3Styles = {
    transform: isMenuOpen ? "rotate(45deg)" : "rotate(0deg)"
  };

  return (
    <div
      className="MenuButton"
      style={menuButtonStyles}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <div>
        <div id="bar1" style={{ ...barStyles, ...bar1Styles }}></div>
        <div id="bar2" style={{ ...barStyles, ...bar2Styles }}></div>
        <div id="bar3" style={{ ...barStyles, ...bar3Styles }}></div>
      </div>
    </div>
  );
};

export default MenuButton;
