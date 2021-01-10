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

var ValidationRules = /*#__PURE__*/function () {
  function ValidationRules() {
    (0, _classCallCheck2["default"])(this, ValidationRules);
  }

  (0, _createClass2["default"])(ValidationRules, [{
    key: "checkDuplicateFullName",
    value: function () {
      var _checkDuplicateFullName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    fullName: req.body.fullName
                  }
                });

              case 3:
                user = _context.sent;

                if (!user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.json({
                  success: false,
                  msg: 'fullName already exists! '
                }));

              case 6:
                return _context.abrupt("return", next());

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json(_context.t0));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      function checkDuplicateFullName(_x, _x2, _x3) {
        return _checkDuplicateFullName.apply(this, arguments);
      }

      return checkDuplicateFullName;
    }()
  }, {
    key: "checkDuplicateEmail",
    value: function () {
      var _checkDuplicateEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    email: req.body.email
                  }
                });

              case 3:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  success: false,
                  msg: 'Email already exists! '
                }));

              case 6:
                return _context2.abrupt("return", next());

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json(_context2.t0));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function checkDuplicateEmail(_x4, _x5, _x6) {
        return _checkDuplicateEmail.apply(this, arguments);
      }

      return checkDuplicateEmail;
    }()
  }]);
  return ValidationRules;
}();

var _default = new ValidationRules();

exports["default"] = _default;