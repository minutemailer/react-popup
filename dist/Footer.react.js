"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ButtonsSpace = _interopRequireDefault(require("./ButtonsSpace.react"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PopupFooter = function PopupFooter(props) {
  if (!props.buttons) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("footer", {
    className: props.className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonsSpace["default"], {
      buttonClick: props.buttonClick,
      onOk: props.onOk,
      onClose: props.onClose,
      className: "".concat(props.className, "__left-space"),
      btnClass: props.btnClass,
      defaultOk: props.defaultOk,
      defaultCancel: props.defaultCancel,
      buttons: props.buttons.left
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonsSpace["default"], {
      buttonClick: props.buttonClick,
      onOk: props.onOk,
      onClose: props.onClose,
      className: "".concat(props.className, "__right-space"),
      btnClass: props.btnClass,
      defaultOk: props.defaultOk,
      defaultCancel: props.defaultCancel,
      buttons: props.buttons.right
    })]
  });
};

PopupFooter.propTypes = {
  buttons: _propTypes["default"].shape({
    left: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object])),
    right: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]))
  }),
  className: _propTypes["default"].string,
  btnClass: _propTypes["default"].string,
  onOk: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  buttonClick: _propTypes["default"].func,
  defaultOk: _propTypes["default"].string,
  defaultCancel: _propTypes["default"].string
};
PopupFooter.defaultProps = {
  buttons: null,
  className: null,
  btnClass: null,
  defaultOk: null,
  defaultCancel: null,
  buttonClick: function buttonClick() {},
  onOk: function onOk() {},
  onClose: function onClose() {}
};
var _default = PopupFooter;
exports["default"] = _default;