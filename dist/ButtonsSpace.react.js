"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ActionButton = require("./ActionButton.react");

var _ActionButton2 = _interopRequireDefault(_ActionButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonsSpace =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ButtonsSpace, _React$Component);

  function ButtonsSpace() {
    _classCallCheck(this, ButtonsSpace);

    return _possibleConstructorReturn(this, (ButtonsSpace.__proto__ || Object.getPrototypeOf(ButtonsSpace)).apply(this, arguments));
  }

  _createClass(ButtonsSpace, [{
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
    key: "wildClass",
    value: function wildClass(className, base) {
      if (!className) {
        return null;
      }

      if (this.props.wildClasses) {
        return className;
      }

      var finalClass = [];
      var classNames = className.split(' ');
      classNames.forEach(function (singleClass) {
        finalClass.push("".concat(base, "--").concat(singleClass));
      });
      return finalClass.join(' ');
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
            btns.push(_react2.default.createElement(_ActionButton2.default, {
              className: "".concat(_this.props.btnClass, " ").concat(_this.props.btnClass, "--ok"),
              key: key,
              onClick: function onClick() {
                return _this.onOk();
              }
            }, _this.props.defaultOk));
          } else if (btn === 'cancel') {
            btns.push(_react2.default.createElement(_ActionButton2.default, {
              className: "".concat(_this.props.btnClass, " ").concat(_this.props.btnClass, "--cancel"),
              key: key,
              onClick: function onClick() {
                return _this.onClose();
              }
            }, _this.props.defaultCancel));
          }
        } else {
          var className = "".concat(_this.props.btnClass, " ").concat(_this.wildClass(btn.className, _this.props.btnClass));

          var btnComponent = _react2.default.createElement(_ActionButton2.default, {
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
      return _react2.default.createElement("div", {
        className: this.props.className
      }, btns);
    }
  }]);

  return ButtonsSpace;
}(_react2.default.Component);

Object.defineProperty(ButtonsSpace, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'PopupFooterButtons'
});
exports.default = ButtonsSpace;
ButtonsSpace.propTypes = {
  buttons: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])),
  className: _propTypes2.default.string,
  onOk: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  buttonClick: _propTypes2.default.func,
  btnClass: _propTypes2.default.string,
  wildClasses: _propTypes2.default.bool,
  defaultOk: _propTypes2.default.string,
  defaultCancel: _propTypes2.default.string
};
ButtonsSpace.defaultProps = {
  buttons: null,
  className: null,
  onOk: function onOk() {},
  onClose: function onClose() {},
  buttonClick: function buttonClick() {},
  btnClass: null,
  wildClasses: false,
  defaultOk: null,
  defaultCancel: null
};