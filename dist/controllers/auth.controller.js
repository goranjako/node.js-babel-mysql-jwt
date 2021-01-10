"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("../../db/models/"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

require('dotenv').config();

var Auth = /*#__PURE__*/function () {
  function Auth() {
    (0, _classCallCheck2["default"])(this, Auth);
  }

  (0, _createClass2["default"])(Auth, [{
    key: "register",
    value: function () {
      var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var newUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(!req.body.email || !req.body.password)) {
                  _context.next = 5;
                  break;
                }

                res.json({
                  success: false,
                  msg: 'Please pass email and password.'
                });
                _context.next = 8;
                break;

              case 5:
                newUser = {
                  fullName: req.body.fullName,
                  email: req.body.email,
                  password: req.body.password
                };
                _context.next = 8;
                return _models["default"].User.create(newUser).then(function (data) {
                  return res.json({
                    success: true,
                    msg: 'Successful created new user.'
                  });
                });

              case 8:
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                res.json({
                  success: false,
                  msg: _context.t0
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }));

      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body, email, password, error, query, user, token;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, email = _req$body.email, password = _req$body.password;

                if (!(!email || email === undefined || !password || password === undefined)) {
                  _context2.next = 5;
                  break;
                }

                error = new Error("Invalid email OR password input");
                throw error;

              case 5:
                query = {
                  where: {
                    email: email
                  }
                };
                _context2.next = 8;
                return _models["default"].User.findOne(query);

              case 8:
                user = _context2.sent;

                if (user) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  success: false,
                  msg: 'Authentication failed. User not found.'
                }));

              case 11:
                if (!_bcryptNodejs["default"].compareSync(password, user.password)) {
                  _context2.next = 14;
                  break;
                }

                token = _jsonwebtoken["default"].sign(user.toJSON(), process.env.SECRET_KEY, {
                  expiresIn: '10m'
                });
                return _context2.abrupt("return", res.status(200).json({
                  success: true,
                  token: token
                }));

              case 14:
                return _context2.abrupt("return", res.status(401).json({
                  msg: 'Unauthorized'
                }));

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](0);
                res.status(401).send({
                  success: false,
                  msg: 'Authentication failed. Wrong password.'
                });

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 17]]);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "getall",
    value: function () {
      var _getall = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var users;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models["default"].User.findAll();

              case 3:
                users = _context3.sent;
                return _context3.abrupt("return", res.status(200).json({
                  users: users
                }));

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.error("UsersController.getAll error: ", {
                  error: _context3.t0
                });
                return _context3.abrupt("return", processError(_context3.t0, req, res));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function getall(_x5, _x6) {
        return _getall.apply(this, arguments);
      }

      return getall;
    }()
  }]);
  return Auth;
}();

;

var _default = new Auth();

exports["default"] = _default;