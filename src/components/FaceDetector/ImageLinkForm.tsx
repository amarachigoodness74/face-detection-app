import React, { useState } from "react";
import { useUserContext } from "../../state/UserContext";

import Styles from "./FaceDetector.module.css";

const ImageLinkForm = () => {
  const { userData, updateUser } = useUserContext();
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const getModelData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/image`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userData.user.email,
            image: userData.imageUrl,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Process failed");
      }

      const data = await response.json();
      console.log("======= res", data);
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    }
  };

  const onButtonSubmit = () => {
    updateUser({
      imageUrl: url,
    });
    getModelData();
  };

  return (
    <React.Fragment>
      <div className={Styles.ImageLinkForm}>
        <input
          type="tex"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={onButtonSubmit}>Detect</button>
      </div>
      <p>Detect face area from a human picture. Give it a try...</p>
    </React.Fragment>
  );
};

export default ImageLinkForm;
