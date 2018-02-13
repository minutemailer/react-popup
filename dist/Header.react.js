"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function Component(props) {
  if (!props.title) {
    return null;
  }

  return _react.default.createElement("header", {
    className: props.className
  }, _react.default.createElement("h1", {
    className: "".concat(props.className, "__title")
  }, props.title));
};

Component.displayName = 'PopupHeader';
Component.defaultProps = {
  title: null,
  className: null
};
Component.propTypes = {
  title: _propTypes.default.string,
  className: _propTypes.default.string
};
var _default = Component;
exports.default = _default;