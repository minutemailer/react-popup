"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ButtonsSpace = _interopRequireDefault(require("./ButtonsSpace.react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function Component(props) {
  if (!props.buttons) {
    return null;
  }

  return _react.default.createElement("footer", {
    className: props.className
  }, _react.default.createElement(_ButtonsSpace.default, {
    buttonClick: props.buttonClick,
    onOk: props.onOk,
    onClose: props.onClose,
    className: "".concat(props.className, "__left-space"),
    wildClasses: props.wildClasses,
    btnClass: props.btnClass,
    defaultOk: props.defaultOk,
    defaultCancel: props.defaultCancel,
    buttons: props.buttons.left
  }), _react.default.createElement(_ButtonsSpace.default, {
    buttonClick: props.buttonClick,
    onOk: props.onOk,
    onClose: props.onClose,
    className: "".concat(props.className, "__right-space"),
    wildClasses: props.wildClasses,
    btnClass: props.btnClass,
    defaultOk: props.defaultOk,
    defaultCancel: props.defaultCancel,
    buttons: props.buttons.right
  }));
};

Component.displayName = 'PopupFooter';
Component.propTypes = {
  buttons: _propTypes.default.shape({
    left: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])),
    right: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]))
  }),
  className: _propTypes.default.string,
  wildClasses: _propTypes.default.bool,
  btnClass: _propTypes.default.string,
  onOk: _propTypes.default.func,
  onClose: _propTypes.default.func,
  buttonClick: _propTypes.default.func,
  defaultOk: _propTypes.default.string,
  defaultCancel: _propTypes.default.string
};
Component.defaultProps = {
  buttons: null,
  className: null,
  wildClasses: false,
  btnClass: null,
  defaultOk: null,
  defaultCancel: null,
  buttonClick: function buttonClick() {},
  onOk: function onOk() {},
  onClose: function onClose() {}
};
var _default = Component;
exports.default = _default;