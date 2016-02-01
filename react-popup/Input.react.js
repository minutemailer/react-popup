'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = _react2.default.createClass({

	displayName: 'PopupInput',

	getInitialState: function getInitialState() {
		return {
			value: this.props.value
		};
	},

	getInitialProps: function getInitialProps() {
		return {
			className: 'input',
			value: '',
			placeholder: '',
			type: 'text',
			onChange: function onChange() {}
		};
	},

	componentDidMount: function componentDidMount() {
		_reactDom2.default.findDOMNode(this).focus();
	},

	handleChange: function handleChange(event) {
		this.setState({ value: event.target.value });
		this.props.onChange(event.target.value);
	},

	render: function render() {
		var className = this.props.className;

		return _react2.default.createElement('input', { value: this.state.value, className: className, placeholder: this.props.placeholder, type: this.props.type, onChange: this.handleChange });
	}

});

exports.default = Component;