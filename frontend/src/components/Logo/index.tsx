import React from "react";
import brain from "../../assets/brain.png";
import "./Logo.module.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <div className="Tilt-inner pa3">
        <img style={{ paddingTop: "5px" }} alt="logo" src={brain} />
      </div>
    </div>
  );
};

export default Logo;
