"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PopupHeader = function PopupHeader(props) {
  if (!props.title) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("header", {
    className: props.className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      className: "".concat(props.className, "__title"),
      children: props.title
    })
  });
};

PopupHeader.defaultProps = {
  title: null,
  className: null
};
PopupHeader.propTypes = {
  title: _propTypes["default"].string,
  className: _propTypes["default"].string
};
var _default = PopupHeader;
exports["default"] = _default;