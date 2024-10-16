import React from "react";
import { useUserContext } from "../../state/UserContext";
import Styles from "./FaceDetector.module.css";

const FaceRecognition = () => {
  const { userData } = useUserContext();

  

  return userData.imageUrl ? (
    <div className={Styles.ImagePreview}>
      <img id="inputimage" alt="URL Preview" src={userData.imageUrl} />
      {/* <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}
    </div>
  ) : null;
};

export default FaceRecognition;
