'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = _react2.default.createClass({

	displayName: 'PopupAction',

	propTypes: {
		children: _react2.default.PropTypes.node.isRequired
	},

	getInitialProps: function getInitialProps() {
		return {
			onClick: function onClick() {},
			className: 'btn',
			url: null
		};
	},

	handleClick: function handleClick() {
		return this.props.onClick();
	},

	render: function render() {
		var className = this.props.className,
		    url = false;

		if (this.props.url) {
			if (this.props.url !== '#') {
				url = true;
			}

			if (!url) {
				return _react2.default.createElement(
					'a',
					{ target: '_blank', className: className },
					this.props.children
				);
			}

			return _react2.default.createElement(
				'a',
				{ href: this.props.url, target: '_blank', className: className },
				this.props.children
			);
		}

		return _react2.default.createElement(
			'button',
			{ onClick: this.handleClick, className: className },
			this.props.children
		);
	}

});

exports.default = Component;