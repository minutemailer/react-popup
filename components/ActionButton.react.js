/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react'),
    Component;

Component = React.createClass({

	displayName: 'PopupAction',

	propTypes: {
		children: React.PropTypes.renderable.isRequired
	},

	getInitialProps: function () {
		return {
			onClick: function () {},
			className: 'btn'
		};
	},

	handleClick: function () {
		return this.props.onClick();
	},

	render: function () {
		var className = this.props.className;

		return (
			<button onClick={this.handleClick} className={className}>
				{this.props.children}
			</button>
		);
	}

});

module.exports = Component;