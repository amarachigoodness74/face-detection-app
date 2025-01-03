import React from "react";
import Logo from "../Logo";
import Rank from "./Rank";
import ImageLinkForm from "./ImageLinkForm";
import Styles from "./FaceDetector.module.css";

function FaceDetector() {
  return (
    <div className={Styles.FaceDetectorWrapper}>
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default FaceDetector;
