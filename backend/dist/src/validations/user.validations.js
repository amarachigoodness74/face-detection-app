"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.guestImageValidation = exports.imageValidation = void 0;
const express_validator_1 = require("express-validator");
const imageValidation = () => [
    (0, express_validator_1.body)("email").not().isEmpty().trim().escape(),
    (0, express_validator_1.body)("image").not().isEmpty(),
];
exports.imageValidation = imageValidation;
const guestImageValidation = () => [
    (0, express_validator_1.body)("image").not().isEmpty(),
];
exports.guestImageValidation = guestImageValidation;
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
