import React, { useRef, useEffect, useState } from "react";
import { Props } from "../../types/regions";

import Styles from "./FaceDetector.module.css";

const FaceDetection: React.FC<Props> = ({ imageUrl, regions }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const drawBoxes = () => {
      const image = imageRef.current;
      const canvas = canvasRef.current;

      if (image && canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size to match the image
        canvas.width = image.width;
        canvas.height = image.height;

        // Clear any previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw bounding boxes for each face
        regions.forEach((region) => {
          const { top_row, left_col, bottom_row, right_col } =
            region.region_info.bounding_box;

          // Calculate absolute coordinates
          const x = left_col * image.width;
          const y = top_row * image.height;
          const width = (right_col - left_col) * image.width;
          const height = (bottom_row - top_row) * image.height;

          // Draw rectangle
          ctx.strokeStyle = "#00FF00";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);
        });
      }
    };

    if (isImageLoaded) {
      drawBoxes();
    }
  }, [isImageLoaded, regions]);

  return (
    <div className={Styles.ImagePreview}>
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Detected faces"
        onLoad={() => setIsImageLoaded(true)}
        style={{ display: "block" }}
      />
      <canvas ref={canvasRef} className={Styles.BoundingBox} />
    </div>
  );
};

export default FaceDetection;
