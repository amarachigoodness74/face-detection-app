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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("../utils/logger"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbURL = config_1.default.get("dbConfig.url");
    try {
        yield mongoose_1.default.connect(dbURL);
        logger_1.default.info("MongoDB connected...");
    }
    catch (error) {
        logger_1.default.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
});
exports.default = connectDB;
