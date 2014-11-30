/**
 * @jsx React.DOM
 */

'use strict';

var React        = require('react'),
    ActionButton = require('./ActionButton.react'),
    ButtonsSpace,
    Component;

ButtonsSpace = React.createClass({

	displayName: 'PopupFooterButtons',

	getInitialProps: function () {
		return {
			buttons: null,
			className: null,
			onOk: null,
			onClose: null,
			buttonClick: null,
			btnClass: null
		};
	},

	_onOk: function () {
		if (this.props.onOk) {
			return this.props.onOk();
		}
	},

	_onClose: function () {
		if (this.props.onClose) {
			return this.props.onClose();
		}
	},

	buttonClick: function (action) {
		if (this.props.buttonClick) {
			return this.props.buttonClick(action);
		}
	},

	render: function () {
		if (!this.props.buttons) {
			return null;
		}

		var i, btns = [], btn;

		for (i = 0; i < this.props.buttons.length; i++) {
			btn = this.props.buttons[i];

			if (typeof btn === 'string') {
				if (btn === 'ok') {
					btns.push(<ActionButton className={this.props.btnClass + ' ' + this.props.btnClass + '--ok'} key={i} onClick={this._onOk}>{this.props.defaultOk}</ActionButton>);
				} else if (btn === 'cancel') {
					btns.push(<ActionButton className={this.props.btnClass + ' ' + this.props.btnClass + '--cancel'} key={i} onClick={this._onClose}>{this.props.defaultCancel}</ActionButton>);
				}
			} else {
				btns.push(<ActionButton className={this.props.btnClass + ' ' + btn.className} key={i} onClick={this.buttonClick.bind(this, btn.action)}>{btn.text}</ActionButton>);
			}
		}

		return (
			<div className={this.props.className}>
				{btns}
			</div>
		);
	}

});

Component = React.createClass({

	displayName: 'PopupFooter',

	getInitialProps: function () {
		return {
			buttons: null,
			className: null,
			btnClass: null,
			defaultOk: null,
			defaultCancel: null,
			buttonClick: null,
			onOk: null,
			onClose: null
		};
	},

	render: function () {
		if (this.props.buttons) {
			return (
				<footer className={this.props.className}>
					<ButtonsSpace
						buttonClick={this.props.buttonClick}
						onOk={this.props.onOk}
						onClose={this.props.onClose}
						className={this.props.className + '__left-space'}
						btnClass={this.props.btnClass}
						defaultOk={this.props.defaultOk}
						defaultCancel={this.props.defaultCancel}
						buttons={this.props.buttons.left} />

					<ButtonsSpace
						buttonClick={this.props.buttonClick}
						onOk={this.props.onOk}
						onClose={this.props.onClose}
						className={this.props.className + '__right-space'}
						btnClass={this.props.btnClass}
						defaultOk={this.props.defaultOk}
						defaultCancel={this.props.defaultCancel}
						buttons={this.props.buttons.right} />
				</footer>
			);
		}

		return null;
	}

});

module.exports = Component;