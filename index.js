/**
 * @jsx React.DOM
 */

'use strict';

var React        = require('react'),
    EventEmitter = require('events').EventEmitter,
    assign       = require('object-assign'),
    Header       = require('./components/Header.react'),
    Footer       = require('./components/Footer.react'),
    SHOW_EVENT   = 'show',
    CLOSE_EVENT  = 'close',
    Manager,
    Component;

Manager = assign({}, EventEmitter.prototype, {

	id: 1,

	popups: {},

	queue: [],

	active: null,

	getId: function () {
		return 'id_' + (this.id++);
	},

	addListener: function (event, callback) {
		this.on(event, callback);
	},

	activePopup: function () {
		return this.popups[this.active];
	},

	close: function () {
		if (!this.active) {
			return false;
		}

		var id = this.active;

		this.active = null;

		this.emit(CLOSE_EVENT);

		this.dispatch();

		return id;
	},

	dispatch: function () {
		if (this.active || this.queue.length < 1) {
			return false;
		}

		var popup, id;

		id = this.queue.shift();

		/** Set active */
		this.active = id;

		this.emit(SHOW_EVENT);
	}

});

Component = React.createClass({

	displayName: 'Popup',

	getInitialState: function() {
		return {
			'title'     : null,
			'buttons'   : false,
			'content'   : null,
			'visible'   : false,
			'className' : null,
			'noOverlay' : false,
			'position'  : false
		};
	},

	getDefaultProps: function() {
		return {
			'className'     : 'mm-popup',
			'btnClass'      : 'mm-popup__btn',
			'closeBtn'      : true,
			'closeHtml'     : null,
			'defaultOk'     : 'Ok',
			'defaultCancel' : 'Cancel'
		};
	},

	statics: {

		addShowListener: function (callback) {
			Manager.addListener(SHOW_EVENT, callback);
		},

		addCloseListener: function (callback) {
			Manager.addListener(CLOSE_EVENT, callback);
		},

		register: function (data) {
			var id = Manager.getId();

			Manager.popups[id] = data;

			return id; 
		},

		queue: function (id) {
			if (!Manager.popups.hasOwnProperty(id)) {
				return false;
			}

			/** Add popup to queue */
			Manager.queue.push(id);

			/** Dispatch queue */
			Manager.dispatch();

			return id;
		},

		create: function (data) {
			/** Register popup */
			var id = this.register(data);

			/** Queue popup */
			this.queue(id);

			return id;
		},

		alert: function (text, title, noQueue) {
			var data = {
				title: title,
				content: text,
				buttons: {
					right: ['ok']
				}
			};

			if (noQueue) {
				return this.register(data);
			}

			return this.create(data, noQueue);
		},

		close: function () {
			Manager.close();
		}

	},

	componentDidMount: function() {
		var _this = this, popup;

		Manager.addListener('show', function () {
			popup = Manager.activePopup();

			_this.setState({
				title     : popup.title,
				content   : popup.content,
				buttons   : popup.buttons,
				visible   : true,
				className : popup.className,
				noOverlay : popup.noOverlay,
				position  : popup.position
			});
		});

		Manager.addListener('close', function () {
			_this.setState(_this.getInitialState());
		});
	},

	componentDidUpdate: function () {
		var box = this.refs.box, position;

		if (!box) {
			return;
		}

		box = box.getDOMNode();

		if (!this.state.position) {
			box.style.opacity = 1;
			return false;
		}

		if (typeof this.state.position === 'function') {
			return this.state.position.call(null, box);
		}

		box.style.top     = parseInt(this.state.position.y, 10) + 'px';
		box.style.left    = parseInt(this.state.position.x, 10) + 'px';
		box.style.margin  = 0;
		box.style.opacity = 1;
	},

	_className: function (className) {
		return this.props.className + '__' + className;
	},

	_onClose: function () {
		Manager.close();
	},

	handleButtonClick: function (action) {
		if (typeof action === 'function') {
			return action.call();
		}
	},

	render: function() {
		var className = this.props.className, box, closeBtn, footer, leftBtnsWrapper, leftBtns = [], rightBtnsWrapper, rightBtns = [], i, btn, overlayStyle = {}, boxClass;

		if (this.state.visible) {
			className += ' ' + this.props.className + '--visible';

			if (this.props.closeBtn) {
				closeBtn = <button onClick={this._onClose} className={this.props.className + '__close'}>{this.props.closeHtml}</button>;
			}

			boxClass = this._className('box');

			if (this.state.className) {
				boxClass += ' ' + boxClass + '--' + this.state.className;
			}

			box = (
				<article ref="box" style={{opacity: 0}} className={boxClass}>
					{closeBtn}
					<Header title={this.state.title} className={this._className('box__header')} />

					<div className={this._className('box__body')}>
						{this.state.content}
					</div>

					<Footer
						className={this._className('box__footer')} 
						btnClass={this.props.btnClass} 
						buttonClick={this.handleButtonClick} 
						onClose={this._onClose} 
						onOk={this._onClose}
						defaultOk={this.props.defaultOk}
						defaultCancel={this.props.defaultCancel}
						buttons={this.state.buttons} />
				</article>
			);
		}

		if (this.state.noOverlay) {
			overlayStyle.opacity = 0;
		}

		return (
			<div className={className}>
				<div onClick={this._onClose} style={overlayStyle} className={this._className('overlay')} />
				{box}
			</div>
		);
	}

});

module.exports = Component;