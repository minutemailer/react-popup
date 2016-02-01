'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = _react2.default.createClass({

	displayName: 'PopupHeader',

	getInitialProps: function getInitialProps() {
		return {
			title: null,
			className: null
		};
	},

	render: function render() {
		if (this.props.title) {
			return _react2.default.createElement(
				'header',
				{ className: this.props.className },
				_react2.default.createElement(
					'h1',
					{ className: this.props.className + '__title' },
					this.props.title
				)
			);
		}

		return null;
	}

});

exports.default = Component;