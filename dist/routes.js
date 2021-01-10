"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setRoutes;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./controllers/auth.controller"));

var _auth2 = _interopRequireDefault(require("./middlewere/auth"));

var _verify = _interopRequireDefault(require("./middlewere/verify"));

var _require = require('./middlewere/validation'),
    validateRegistrationBody = _require.validateRegistrationBody,
    validateLoginBody = _require.validateLoginBody,
    validate = _require.validate;

function setRoutes(app) {
  var router = _express["default"].Router();

  router.route('/register').post(validateRegistrationBody(), validate, _verify["default"].checkDuplicateEmail, _auth["default"].register);
  router.route('/login').post(validateLoginBody(), _auth["default"].login);
  router.route('/prikaz').get(_auth2["default"].verifyToken, _auth["default"].getall);
  app.use('/', router);
}