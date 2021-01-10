"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult,
    buildCheckFunction = _require.buildCheckFunction;

var validateRegistrationBody = function validateRegistrationBody() {
  return [body('fullName').exists().withMessage('name field is required').isLength({
    min: 3
  }).withMessage('name must be greater than 3 letters'), body('email').exists().withMessage('email field is required').isEmail().withMessage('Email is invalid'), body('password').exists().withMessage('password field is required').isLength({
    min: 8,
    max: 12
  }).withMessage('password must be in between 8 to 12 characters long')];
};

var validateLoginBody = function validateLoginBody() {
  return [body('email').exists().withMessage('email field is required').isEmail().withMessage('Email is invalid'), body('password').exists().withMessage('password field is required').isLength({
    min: 8,
    max: 12
  }).withMessage('password must be in between 8 to 12 characters long')];
};

var validate = function validate(req, res, next) {
  var errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  var extractedErrors = [];
  errors.array().map(function (err) {
    return extractedErrors.push((0, _defineProperty2["default"])({}, err.param, err.msg));
  });
  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  validateRegistrationBody: validateRegistrationBody,
  validateLoginBody: validateLoginBody,
  validate: validate
};