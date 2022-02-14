"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ActionButton = _interopRequireDefault(require("./ActionButton.react"));

var _Bem = require("./Bem");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PopupFooterButtons = /*#__PURE__*/function (_React$Component) {
  _inherits(PopupFooterButtons, _React$Component);

  var _super = _createSuper(PopupFooterButtons);

  function PopupFooterButtons() {
    _classCallCheck(this, PopupFooterButtons);

    return _super.apply(this, arguments);
  }

  _createClass(PopupFooterButtons, [{
    key: "onOk",
    value: function onOk() {
      return this.props.onOk();
    }
  }, {
    key: "onClose",
    value: function onClose() {
      return this.props.onClose();
    }
  }, {
    key: "buttonClick",
    value: function buttonClick(action) {
      return this.props.buttonClick(action);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      if (!this.props.buttons) {
        return null;
      }

      var btns = [];
      this.props.buttons.forEach(function (btn, i) {
        var url = btn.url ? btn.url : null;
        var key = i;

        if (typeof btn === 'string') {
          if (btn === 'ok') {
            btns.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_ActionButton["default"], {
              className: "".concat(_this.props.btnClass, " ").concat(_this.props.btnClass, "--ok"),
              onClick: function onClick() {
                return _this.onOk();
              },
              children: _this.props.defaultOk
            }, key));
          } else if (btn === 'cancel') {
            btns.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_ActionButton["default"], {
              className: "".concat(_this.props.btnClass, " ").concat(_this.props.btnClass, "--cancel"),
              onClick: function onClick() {
                return _this.onClose();
              },
              children: _this.props.defaultCancel
            }, key));
          }
        } else if ( /*#__PURE__*/_react["default"].isValidElement(btn)) {
          btns.push(btn);
        } else {
          var className = "".concat(_this.props.btnClass, " ").concat((0, _Bem.modifier)(btn.className, _this.props.btnClass));
          var btnComponent = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ActionButton["default"], {
            className: className,
            url: url,
            onClick: function onClick() {
              return _this.buttonClick(btn.action);
            },
            children: btn.text
          }, key);
          btns.push(btnComponent);
        }
      });
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: this.props.className,
        children: btns
      });
    }
  }]);

  return PopupFooterButtons;
}(_react["default"].Component);

exports["default"] = PopupFooterButtons;

_defineProperty(PopupFooterButtons, "defaultProps", {
  buttons: null,
  className: null,
  onOk: function onOk() {},
  onClose: function onClose() {},
  buttonClick: function buttonClick() {},
  btnClass: null,
  defaultOk: null,
  defaultCancel: null
});

PopupFooterButtons.propTypes = {
  buttons: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object])),
  className: _propTypes["default"].string,
  onOk: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  buttonClick: _propTypes["default"].func,
  btnClass: _propTypes["default"].string,
  defaultOk: _propTypes["default"].string,
  defaultCancel: _propTypes["default"].string
};