'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function Component(props) {
    if (!props.title) {
        return null;
    }

    return _react2.default.createElement(
        'header',
        { className: props.className },
        _react2.default.createElement(
            'h1',
            { className: props.className + '__title' },
            props.title
        )
    );
};

Component.displayName = 'PopupHeader';
Component.defaultProps = {
    title: null,
    className: null
};
Component.propTypes = {
    title: _propTypes2.default.string,
    className: _propTypes2.default.string
};

exports.default = Component;