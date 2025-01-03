import React, { useState } from "react";
import { useUserContext } from "../../state/UserContext";

import Styles from "./FaceDetector.module.css";
import FaceDetection from "./FaceDetection";
import getModelData from "../../utils/getData";

const ImageLinkForm = ({ isPublic = false }) => {
  const { userData, updateUser } = useUserContext();
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [boxData, setBoxData] = useState<any | null>(null);

  const validateURL = () => {
    try {
      new URL(imageUrl);
      return true;
    } catch (err) {
      return false;
    }
  };

  const onButtonSubmit = async () => {
    if (validateURL()) {
      updateUser({
        imageUrl,
      });
      const data = await getModelData(
        isPublic,
        userData.user.email || "",
        userData.imageUrl || imageUrl
      );
      if (data.error) {
        setError("Process failed");
      } else {
        setBoxData(data);
      }
    } else {
      setError("Please enter a valid image url");
    }
  };

  return (
    <React.Fragment>
      {error && <div className={Styles.Error}>{error}</div>}
      <div className={Styles.ImageLinkForm}>
        <input
          type="text"
          required
          placeholder="URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={onButtonSubmit}>Detect</button>
      </div>
      {boxData && (
        <FaceDetection imageUrl={userData.imageUrl} regions={boxData} />
      )}
    </React.Fragment>
  );
};

export default ImageLinkForm;