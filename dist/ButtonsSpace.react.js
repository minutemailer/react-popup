"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ActionButton = _interopRequireDefault(require("./ActionButton.react"));

var _Bem = require("./Bem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopupFooterButtons =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PopupFooterButtons, _React$Component);

  function PopupFooterButtons() {
    _classCallCheck(this, PopupFooterButtons);

    return _possibleConstructorReturn(this, (PopupFooterButtons.__proto__ || Object.getPrototypeOf(PopupFooterButtons)).apply(this, arguments));
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
            btns.push(_react.default.createElement(_ActionButton.default, {
              className: "".concat(_this.props.btnClass, " ").concat(_this.props.btnClass, "--ok"),
              key: key,
              onClick: function onClick() {
                return _this.onOk();
              }
            }, _this.props.defaultOk));
          } else if (btn === 'cancel') {
            btns.push(_react.default.createElement(_ActionButton.default, {
              className: "".concat(_this.props.btnClass, " ").concat(_this.props.btnClass, "--cancel"),
              key: key,
              onClick: function onClick() {
                return _this.onClose();
              }
            }, _this.props.defaultCancel));
          }
        } else {
          var className = "".concat(_this.props.btnClass, " ").concat((0, _Bem.modifier)(btn.className, _this.props.btnClass));

          var btnComponent = _react.default.createElement(_ActionButton.default, {
            className: className,
            key: key,
            url: url,
            onClick: function onClick() {
              return _this.buttonClick(btn.action);
            }
          }, btn.text);

          btns.push(btnComponent);
        }
      });
      return _react.default.createElement("div", {
        className: this.props.className
      }, btns);
    }
  }]);

  return PopupFooterButtons;
}(_react.default.Component);

exports.default = PopupFooterButtons;
Object.defineProperty(PopupFooterButtons, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    buttons: null,
    className: null,
    onOk: function onOk() {},
    onClose: function onClose() {},
    buttonClick: function buttonClick() {},
    btnClass: null,
    defaultOk: null,
    defaultCancel: null
  }
});
PopupFooterButtons.propTypes = {
  buttons: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])),
  className: _propTypes.default.string,
  onOk: _propTypes.default.func,
  onClose: _propTypes.default.func,
  buttonClick: _propTypes.default.func,
  btnClass: _propTypes.default.string,
  defaultOk: _propTypes.default.string,
  defaultCancel: _propTypes.default.string
};