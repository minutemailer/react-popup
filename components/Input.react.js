/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react'),
    Component;

Component = React.createClass({

	displayName: 'PopupInput',

	getInitialState: function () {
		return {
			value: this.props.value
		};
	},

	getInitialProps: function () {
		return {
			className   : 'input',
			value       : '',
			placeholder : '',
			type        : 'text',
			onChange    : function () {}
		};
	},

	componentDidMount: function () {
		this.getDOMNode().focus();
	},

	handleChange: function (event) {
		this.setState({value: event.target.value});
		this.props.onChange(event.target.value);
	},

	render: function () {
		var className = this.props.className;

		return (
			<input value={this.state.value} className={className} placeholder={this.props.placeholder} type={this.props.type} onChange={this.handleChange} />
		);
	}

});

module.exports = Component;