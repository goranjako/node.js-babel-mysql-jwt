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

var jwt = require('jsonwebtoken');

var authManager = /*#__PURE__*/function () {
  function authManager() {
    (0, _classCallCheck2["default"])(this, authManager);
  }

  (0, _createClass2["default"])(authManager, [{
    key: "verifyToken",
    value: function () {
      var _verifyToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var authHeader, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return req.headers['authorization'];

              case 3:
                authHeader = _context.sent;
                token = authHeader && authHeader.split(' ')[1];

                if (!(token == null)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  message: "No token provided!"
                }));

              case 7:
                // if there isn't any token
                jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
                  console.log(err);
                  if (err) return res.status(403).json({
                    success: false,
                    msg: 'Unauthorized.'
                  });
                  req.user = user;
                  next(); // pass the execution off to whatever request the client intended
                });
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(401).json({
                  message: "Your token has expired."
                }));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }));

      function verifyToken(_x, _x2, _x3) {
        return _verifyToken.apply(this, arguments);
      }

      return verifyToken;
    }()
  }]);
  return authManager;
}();

var _default = new authManager();

exports["default"] = _default;