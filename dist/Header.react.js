"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopupHeader = function PopupHeader(props) {
  if (!props.title) {
    return null;
  }

  return _react.default.createElement("header", {
    className: props.className
  }, _react.default.createElement("h1", {
    className: "".concat(props.className, "__title")
  }, props.title));
};

PopupHeader.defaultProps = {
  title: null,
  className: null
};
PopupHeader.propTypes = {
  title: _propTypes.default.string,
  className: _propTypes.default.string
};
var _default = PopupHeader;
exports.default = _default;