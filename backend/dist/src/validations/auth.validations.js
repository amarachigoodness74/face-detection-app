"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.signinValidation = exports.signupValidation = void 0;
const express_validator_1 = require("express-validator");
const signupValidation = () => [
    (0, express_validator_1.body)("name").not().isEmpty().trim().escape(),
    (0, express_validator_1.body)("email").isEmail().normalizeEmail(),
    (0, express_validator_1.body)("password").isLength({ min: 5 }).isStrongPassword(),
];
exports.signupValidation = signupValidation;
const signinValidation = () => [
    (0, express_validator_1.body)("email").isEmail().normalizeEmail(),
    (0, express_validator_1.body)("password").not().isEmpty().trim().escape(),
];
exports.signinValidation = signinValidation;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    res.status(422).json({
        status: "error",
        errors: errors.array(),
    });
};
exports.validate = validate;
