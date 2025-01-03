import { Router, Request, Response, NextFunction } from "express";
import config from "config";
import User from "../models/user.model";
import {
  guestImageValidation,
  imageValidation,
  validate,
} from "../validations/user.validations";
import logger from "../utils/logger";

const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const router = Router();

// Clarifai API setup
const clarifaiAPI = config.get("environment.clarifai") as string;
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${clarifaiAPI}`);

const getCoordinates = async (res: Response, image: string) => {
  stub.PostModelOutputs(
    {
      model_id: "face-detection",
      user_app_id: {
        user_id: "clarifai",
        app_id: "main",
      },
      version_id: "6dc7e46bc9124c5c8824be4822abe105",
      inputs: [
        {
          data: {
            image: {
              url: image,
              // base64: imageBytes,
              allow_duplicate_url: true,
            },
          },
        },
      ],
    },
    metadata,
    async (err: any, response: any) => {
      if (err) {
        logger.info(err.message || err);
        return res.status(500).json({ error: "unable to get entries" });
      }

      if (response.status.code !== 10000) {
        return res.status(500).json({ error: "unable to get entries" });
      }

      const regions = await response.outputs[0].data.regions;
      return res.status(201).json(regions);
    }
  );
};

router.post(
  "/guest-image",
  guestImageValidation(),
  validate,
  async (req: Request, res: Response) => {
    const { image } = req.body;
    try {
      if (!image) {
        res.status(400).json({ message: "Invalid route." });
      }
      await getCoordinates(res, image);
    } catch (error: any) {
      logger.info(error.message || error);
      res.status(500).json({ error: "unable to get entries" });
    }
  }
);

router.post(
  "/image",
  imageValidation(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, image } = req.body;
    try {
      if (!email || !image) {
        res.status(400).json({ message: "Invalid route." });
      }

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "User not found." });
      } else {
        await getCoordinates(res, image);
      }
    } catch (error: any) {
      logger.info(error.message || error);
      res.status(500).json({ error: "unable to get entries" });
    }
  }
);

export default router;
