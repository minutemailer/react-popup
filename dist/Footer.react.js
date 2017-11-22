'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ButtonsSpace = require('./ButtonsSpace.react');

var _ButtonsSpace2 = _interopRequireDefault(_ButtonsSpace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function Component(props) {
    if (!props.buttons) {
        return null;
    }

    return _react2.default.createElement(
        'footer',
        { className: props.className },
        _react2.default.createElement(_ButtonsSpace2.default, {
            buttonClick: props.buttonClick,
            onOk: props.onOk,
            onClose: props.onClose,
            className: props.className + '__left-space',
            wildClasses: props.wildClasses,
            btnClass: props.btnClass,
            defaultOk: props.defaultOk,
            defaultCancel: props.defaultCancel,
            buttons: props.buttons.left
        }),
        _react2.default.createElement(_ButtonsSpace2.default, {
            buttonClick: props.buttonClick,
            onOk: props.onOk,
            onClose: props.onClose,
            className: props.className + '__right-space',
            wildClasses: props.wildClasses,
            btnClass: props.btnClass,
            defaultOk: props.defaultOk,
            defaultCancel: props.defaultCancel,
            buttons: props.buttons.right
        })
    );
};

Component.displayName = 'PopupFooter';
Component.propTypes = {
    buttons: _propTypes2.default.shape({
        left: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])),
        right: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]))
    }),
    className: _propTypes2.default.string,
    wildClasses: _propTypes2.default.bool,
    btnClass: _propTypes2.default.string,
    onOk: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    buttonClick: _propTypes2.default.func,
    defaultOk: _propTypes2.default.string,
    defaultCancel: _propTypes2.default.string
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

exports.default = Component;