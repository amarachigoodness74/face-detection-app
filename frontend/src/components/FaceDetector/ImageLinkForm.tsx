import React, { useState } from "react";
import { useUserContext } from "../../state/UserContext";

import Styles from "./FaceDetector.module.css";
import FaceDetection from "./FaceDetection";
import getModelData from "../../utils/getData";

const ImageLinkForm = ({ isPublic = false }) => {
  const { userData, updateUser } = useUserContext();
  const [imageUrl, setImageUrl] = useState("");
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [boxData, setBoxData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateURL = () => {
    try {
      const imagePattern = /\.(jpeg|jpg|png)$/i;
      return (
        imagePattern.test(imageUrl) &&
        !imageUrl.startsWith("data:") &&
        !imageUrl.startsWith("blob:")
      );
    } catch (err) {
      return false;
    }
  };

  const resizeImage = (url: string, newWidth: number) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Prevents CORS issues
    img.src = url;

    img.onload = () => {
      const aspectRatio = img.height / img.width; // Calculate aspect ratio
      const newHeight = newWidth * aspectRatio; // Auto-calculate height

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = newWidth;
      canvas.height = newHeight;

      if (ctx) ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Convert to Base64 and update state
      const resizedDataUrl = canvas.toDataURL("image/jpeg");
      setResizedImage(resizedDataUrl);
    };
  };

  const onButtonSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setBoxData(null);
    setResizedImage(null);
    if (validateURL()) {
      resizeImage(imageUrl, 500);
      updateUser({
        imageUrl,
      });
      const data = await getModelData(
        isPublic,
        userData.user.email || "",
        userData.imageUrl || imageUrl
      );
      if (data.error) {
        setIsSubmitting(false);
        setError("Process failed");
      } else {
        setBoxData(data);
      }
    } else {
      setIsSubmitting(false);
      setError("Please enter a valid image url(.jpeg|jpg|png");
    }
  };

  return (
    <React.Fragment>
      {error && <div className={Styles.Error}>{error}</div>}
      <div className={Styles.ImageLinkForm}>
        <input
          required
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={onButtonSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Detect"}
        </button>
      </div>
      {resizedImage && !boxData && (
        <div className={Styles.ImagePreview}>
          <img
            src={resizedImage}
            alt="Detected faces"
            style={{ display: "block" }}
          />
        </div>
      )}
      {resizedImage && boxData && (
        <FaceDetection
          imageUrl={resizedImage}
          regions={boxData}
          setIsSubmitting={setIsSubmitting}
        />
      )}
    </React.Fragment>
  );
};

export default ImageLinkForm;
