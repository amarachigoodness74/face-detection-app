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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_validations_1 = require("../validations/auth.validations");
const logger_1 = __importDefault(require("../utils/logger"));
const router = (0, express_1.Router)();
// Register a new user
router.post("/signup", (0, auth_validations_1.signupValidation)(), auth_validations_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists." });
        }
        const newUser = new user_model_1.default({ name, email, password });
        const savedUser = yield newUser.save();
        const _a = savedUser.toObject(), { _id, password: _ } = _a, userWithoutSensitiveData = __rest(_a, ["_id", "password"]);
        res.status(201).json(userWithoutSensitiveData);
    }
    catch (error) {
        logger_1.default.info(error.message || error);
        res.status(500).json({ error: error.message });
    }
}));
// Login user
router.post("/signin", (0, auth_validations_1.signinValidation)(), auth_validations_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required." });
        }
        // Check if user exists
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found." });
        }
        else {
            // Verify password
            const isMatch = yield user.comparePassword(password);
            if (!isMatch) {
                res.status(401).json({ message: "Invalid credentials." });
            }
            const _a = user.toObject(), { _id, password: _ } = _a, userWithoutSensitiveData = __rest(_a, ["_id", "password"]);
            res.status(201).json(userWithoutSensitiveData);
        }
    }
    catch (error) {
        logger_1.default.info(error.message || error);
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
