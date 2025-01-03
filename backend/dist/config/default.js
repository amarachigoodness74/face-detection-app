"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
exports.default = {
    environment: {
        clarifai: process.env.CLARIFAI_API || '',
        port: Number(String(process.env.PORT)) || 1337,
    },
    dbConfig: {
        url: process.env.DBURL || "",
        saltWorkFactor: Number(String(process.env.SALTWORKFACTOR)) || 10,
    },
};
