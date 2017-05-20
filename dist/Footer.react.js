'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActionButton = require('./ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buttonSpaceDefaultProps = {
    buttons: null,
    className: null,
    onOk: null,
    onClose: null,
    buttonClick: null,
    btnClass: null,
    href: null
};

var ButtonsSpace = function (_React$Component) {
    _inherits(ButtonsSpace, _React$Component);

    function ButtonsSpace(props) {
        _classCallCheck(this, ButtonsSpace);

        return _possibleConstructorReturn(this, (ButtonsSpace.__proto__ || Object.getPrototypeOf(ButtonsSpace)).call(this, props));
    }

    _createClass(ButtonsSpace, [{
        key: 'onOk',
        value: function onOk() {
            if (this.props.onOk) {
                return this.props.onOk();
            }
        }
    }, {
        key: 'onClose',
        value: function onClose() {
            if (this.props.onClose) {
                return this.props.onClose();
            }
        }
    }, {
        key: 'buttonClick',
        value: function buttonClick(action) {
            if (this.props.buttonClick) {
                return this.props.buttonClick(action);
            }
        }
    }, {
        key: 'wildClass',
        value: function wildClass(className, base) {
            if (!className) {
                return null;
            }

            if (this.props.wildClasses) {
                return className;
            }

            var finalClass = [],
                classNames = className.split(' ');

            classNames.forEach(function (className) {
                finalClass.push(base + '--' + className);
            });

            return finalClass.join(' ');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (!this.props.buttons) {
                return null;
            }

            var btns = [];

            for (var i in this.props.buttons) {
                if (this.props.buttons.hasOwnProperty(i)) {
                    (function () {
                        var btn = _this2.props.buttons[i];
                        var url = btn.url ? btn.url : null;

                        if (typeof btn === 'string') {
                            if (btn === 'ok') {
                                btns.push(_react2.default.createElement(
                                    _ActionButton2.default,
                                    { className: _this2.props.btnClass + ' ' + _this2.props.btnClass + '--ok', key: i, onClick: function onClick() {
                                            return _this2.onOk();
                                        } },
                                    _this2.props.defaultOk
                                ));
                            } else if (btn === 'cancel') {
                                btns.push(_react2.default.createElement(
                                    _ActionButton2.default,
                                    { className: _this2.props.btnClass + ' ' + _this2.props.btnClass + '--cancel', key: i, onClick: function onClick() {
                                            return _this2.onClose();
                                        } },
                                    _this2.props.defaultCancel
                                ));
                            }
                        } else {
                            var className = _this2.props.btnClass + ' ' + _this2.wildClass(btn.className, _this2.props.btnClass);
                            btns.push(_react2.default.createElement(
                                _ActionButton2.default,
                                { className: className, key: i, url: url, onClick: function onClick() {
                                        return _this2.buttonClick(btn.action);
                                    } },
                                btn.text
                            ));
                        }
                    })();
                }
            }

            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                btns
            );
        }
    }]);

    return ButtonsSpace;
}(_react2.default.Component);

ButtonsSpace.displayName = 'PopupFooterButtons';
ButtonsSpace.defaultProps = buttonSpaceDefaultProps;

var defaultProps = {
    buttons: null,
    className: null,
    wildClasses: false,
    btnClass: null,
    defaultOk: null,
    defaultCancel: null,
    buttonClick: null,
    onOk: null,
    onClose: null
};

var Component = function (_React$Component2) {
    _inherits(Component, _React$Component2);

    function Component(props) {
        _classCallCheck(this, Component);

        return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));
    }

    _createClass(Component, [{
        key: 'render',
        value: function render() {
            if (this.props.buttons) {
                return _react2.default.createElement(
                    'footer',
                    { className: this.props.className },
                    _react2.default.createElement(ButtonsSpace, {
                        buttonClick: this.props.buttonClick,
                        onOk: this.props.onOk,
                        onClose: this.props.onClose,
                        className: this.props.className + '__left-space',
                        wildClasses: this.props.wildClasses,
                        btnClass: this.props.btnClass,
                        defaultOk: this.props.defaultOk,
                        defaultCancel: this.props.defaultCancel,
                        buttons: this.props.buttons.left
                    }),
                    _react2.default.createElement(ButtonsSpace, {
                        buttonClick: this.props.buttonClick,
                        onOk: this.props.onOk,
                        onClose: this.props.onClose,
                        className: this.props.className + '__right-space',
                        wildClasses: this.props.wildClasses,
                        btnClass: this.props.btnClass,
                        defaultOk: this.props.defaultOk,
                        defaultCancel: this.props.defaultCancel,
                        buttons: this.props.buttons.right
                    })
                );
            }

            return null;
        }
    }]);

    return Component;
}(_react2.default.Component);

Component.displayName = 'PopupFooter';
Component.defaultProps = defaultProps;

exports.default = Component;