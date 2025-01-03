"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = __importDefault(require("config"));
const user_model_1 = __importDefault(require("../models/user.model"));
const user_validations_1 = require("../validations/user.validations");
const logger_1 = __importDefault(require("../utils/logger"));
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const router = (0, express_1.Router)();
// Clarifai API setup
const clarifaiAPI = config_1.default.get("environment.clarifai");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${clarifaiAPI}`);
const getCoordinates = (res, image) => __awaiter(void 0, void 0, void 0, function* () {
    stub.PostModelOutputs({
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
    }, metadata, (err, response) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            logger_1.default.info(err.message || err);
            return res.status(500).json({ error: "unable to get entries" });
        }
        if (response.status.code !== 10000) {
            return res.status(500).json({ error: "unable to get entries" });
        }
        const regions = yield response.outputs[0].data.regions;
        return res.status(201).json(regions);
    }));
});
router.post("/guest-image", (0, user_validations_1.guestImageValidation)(), user_validations_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image } = req.body;
    try {
        if (!image) {
            res.status(400).json({ message: "Invalid route." });
        }
        yield getCoordinates(res, image);
    }
    catch (error) {
        logger_1.default.info(error.message || error);
        res.status(500).json({ error: "unable to get entries" });
    }
}));
router.post("/image", (0, user_validations_1.imageValidation)(), user_validations_1.validate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, image } = req.body;
    try {
        if (!email || !image) {
            res.status(400).json({ message: "Invalid route." });
        }
        // Check if user exists
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found." });
        }
        else {
            yield getCoordinates(res, image);
        }
    }
    catch (error) {
        logger_1.default.info(error.message || error);
        res.status(500).json({ error: "unable to get entries" });
    }
}));
exports.default = router;
