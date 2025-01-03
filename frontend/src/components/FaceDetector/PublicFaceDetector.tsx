import React from "react";
import Logo from "../Logo";
import { useUserContext } from "../../state/UserContext";
import Styles from "./FaceDetector.module.css";
import ImageLinkForm from "./ImageLinkForm";

function PublicFaceDetector() {
  const { userData } = useUserContext();
  const { name } = userData.user;
  return (
    <div className={Styles.FaceDetectorWrapper}>
      <Logo />
      <div className={Styles.Rank}>
        <div className={Styles.RankDetails}>
          {`You are viewing this page as a ${name}`}
        </div>
      </div>
      <ImageLinkForm isPublic />
    </div>
  );
}

export default PublicFaceDetector;
