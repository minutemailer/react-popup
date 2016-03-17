'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActionButton = require('./ActionButton.react');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonsSpace = void 0,
    Component = void 0;

ButtonsSpace = _react2.default.createClass({

	displayName: 'PopupFooterButtons',

	getInitialProps: function getInitialProps() {
		return {
			buttons: null,
			className: null,
			onOk: null,
			onClose: null,
			buttonClick: null,
			btnClass: null,
			href: null
		};
	},

	onOk: function onOk() {
		if (this.props.onOk) {
			return this.props.onOk();
		}
	},

	onClose: function onClose() {
		if (this.props.onClose) {
			return this.props.onClose();
		}
	},

	buttonClick: function buttonClick(action) {
		if (this.props.buttonClick) {
			return this.props.buttonClick(action);
		}
	},

	wildClass: function wildClass(className, base) {
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
	},

	render: function render() {
		if (!this.props.buttons) {
			return null;
		}

		var i,
		    btns = [],
		    btn,
		    className,
		    url;

		for (i = 0; i < this.props.buttons.length; i++) {
			btn = this.props.buttons[i];
			url = btn.url ? btn.url : null;

			if (typeof btn === 'string') {
				if (btn === 'ok') {
					btns.push(_react2.default.createElement(
						_ActionButton2.default,
						{ className: this.props.btnClass + ' ' + this.props.btnClass + '--ok', key: i, onClick: this.onOk },
						this.props.defaultOk
					));
				} else if (btn === 'cancel') {
					btns.push(_react2.default.createElement(
						_ActionButton2.default,
						{ className: this.props.btnClass + ' ' + this.props.btnClass + '--cancel', key: i, onClick: this.onClose },
						this.props.defaultCancel
					));
				}
			} else {
				className = this.props.btnClass + ' ' + this.wildClass(btn.className, this.props.btnClass);
				btns.push(_react2.default.createElement(
					_ActionButton2.default,
					{ className: className, key: i, url: url, onClick: this.buttonClick.bind(this, btn.action) },
					btn.text
				));
			}
		}

		return _react2.default.createElement(
			'div',
			{ className: this.props.className },
			btns
		);
	}

});

Component = _react2.default.createClass({

	displayName: 'PopupFooter',

	getInitialProps: function getInitialProps() {
		return {
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
	},

	render: function render() {
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
					buttons: this.props.buttons.left }),
				_react2.default.createElement(ButtonsSpace, {
					buttonClick: this.props.buttonClick,
					onOk: this.props.onOk,
					onClose: this.props.onClose,
					className: this.props.className + '__right-space',
					wildClasses: this.props.wildClasses,
					btnClass: this.props.btnClass,
					defaultOk: this.props.defaultOk,
					defaultCancel: this.props.defaultCancel,
					buttons: this.props.buttons.right })
			);
		}

		return null;
	}

});

exports.default = Component;