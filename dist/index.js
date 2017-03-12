'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _events = require('events');

var _Header = require('./Header.react');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./Footer.react');

var _Footer2 = _interopRequireDefault(_Footer);

var _Input = require('./Input.react');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHOW_EVENT = 'show';
var CLOSE_EVENT = 'close';
var REFRESH_EVENT = 'refresh_position';

var _props = {};
var _initialState = {};

var Manager = _extends({}, _events.EventEmitter.prototype, {

    id: 1,

    popups: {},

    queue: [],

    active: null,

    value: null,

    getId: function getId() {
        return 'id_' + this.id++;
    },

    activePopup: function activePopup() {
        return this.popups[this.active];
    },

    close: function close() {
        if (!this.active) {
            return false;
        }

        var id = this.active;
        this.active = null;

        this.emit(CLOSE_EVENT);
        this.dispatch();

        this.value = null;

        return id;
    },

    dispatch: function dispatch() {
        if (this.active || this.queue.length < 1) {
            return false;
        }

        var id = this.queue.shift();

        /** Set active */
        this.active = id;

        this.emit(SHOW_EVENT);
    },

    refreshPosition: function refreshPosition(position) {
        this.emit(REFRESH_EVENT, position);
    },

    clearQueue: function clearQueue() {
        this.queue = [];
    }

});

var Component = _react2.default.createClass({

    displayName: 'Popup',

    getInitialState: function getInitialState() {
        var state = {
            'title': null,
            'buttons': false,
            'content': null,
            'visible': false,
            'className': null,
            'noOverlay': false,
            'position': false,
            'wildClasses': false
        };

        _initialState = state;

        return state;
    },

    getDefaultProps: function getDefaultProps() {
        return {
            'className': 'mm-popup',
            'btnClass': 'mm-popup__btn',
            'inputClass': 'mm-popup__input',
            'closeBtn': true,
            'closeHtml': null,
            'defaultOk': 'Ok',
            'defaultCancel': 'Cancel'
        };
    },

    statics: {

        plugins: {},

        addShowListener: function addShowListener(callback) {
            Manager.on(SHOW_EVENT, callback);
        },

        removeShowListener: function removeShowListener(callback) {
            Manager.removeListener(SHOW_EVENT, callback);
        },

        addCloseListener: function addCloseListener(callback) {
            Manager.on(CLOSE_EVENT, callback);
        },

        removeCloseListener: function removeCloseListener(callback) {
            Manager.removeListener(CLOSE_EVENT, callback);
        },

        register: function register(data) {
            var id = Manager.getId();

            data = _extends({}, _initialState, data);

            Manager.popups[id] = data;

            return id;
        },

        queue: function queue(id) {
            if (!Manager.popups.hasOwnProperty(id)) {
                return false;
            }

            /** Add popup to queue */
            Manager.queue.push(id);

            /** Dispatch queue */
            Manager.dispatch();

            return id;
        },

        create: function create(data) {
            /** Register popup */
            var id = this.register(data);

            /** Queue popup */
            this.queue(id);

            return id;
        },

        alert: function alert(text, title, noQueue) {
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

            return this.create(data);
        },

        prompt: function prompt(title, text, inputAttributes, okBtn, noQueue) {
            if (!okBtn) {
                okBtn = 'ok';
            }

            inputAttributes || (inputAttributes = {
                value: '',
                placeholder: '',
                type: 'text'
            });

            Manager.value = inputAttributes.value;

            function onChange(value) {
                Manager.value = value;
            }

            if (text) {
                text = _react2.default.createElement(
                    'p',
                    null,
                    text
                );
            }

            var content = _react2.default.createElement(
                'div',
                null,
                text,
                _react2.default.createElement(_Input2.default, { value: inputAttributes.value, placeholder: inputAttributes.placeholder, type: inputAttributes.type, className: _props.inputClass, onChange: onChange })
            );

            var data = {
                title: title,
                content: content,
                buttons: {
                    left: ['cancel'],
                    right: [okBtn]
                }
            };

            if (noQueue) {
                return this.register(data);
            }

            return this.create(data);
        },

        close: function close() {
            Manager.close();
        },

        getValue: function getValue() {
            return Manager.value;
        },

        registerPlugin: function registerPlugin(name, callback) {
            this.plugins[name] = callback.bind(this);
        },

        refreshPosition: function refreshPosition(position) {
            return Manager.refreshPosition(position);
        },

        clearQueue: function clearQueue() {
            return Manager.clearQueue();
        }

    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        Manager.on(SHOW_EVENT, function () {
            var popup = Manager.activePopup();

            _this.setState({
                title: popup.title,
                content: popup.content,
                buttons: popup.buttons,
                visible: true,
                className: popup.className,
                noOverlay: popup.noOverlay,
                position: popup.position
            });
        });

        _props = this.props;

        Manager.on(CLOSE_EVENT, function () {
            _this.setState(_this.getInitialState());
        });

        Manager.on(REFRESH_EVENT, function (position) {
            _this.setPosition(position);
        });
    },

    componentDidUpdate: function componentDidUpdate() {
        this.setPosition(this.state.position);
    },

    setPosition: function setPosition(position) {
        var box = this.refs.box;

        if (!box) {
            return;
        }

        if (!position) {
            position = this.state.position;
        }

        if (!position) {
            box.style.opacity = 1;
            box.style.top = null;
            box.style.left = null;
            box.style.margin = null;

            return false;
        }

        if (typeof position === 'function') {
            return position.call(null, box);
        }

        box.style.top = parseInt(position.y, 10) + 'px';
        box.style.left = parseInt(position.x, 10) + 'px';
        box.style.margin = 0;
        box.style.opacity = 1;
    },

    hasClass: function hasClass(element, className) {
        if (element.classList) {
            return !!className && element.classList.contains(className);
        }

        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    },

    className: function className(_className) {
        return this.props.className + '__' + _className;
    },

    wildClass: function wildClass(className, base) {
        if (!className) {
            return null;
        }

        if (this.props.wildClasses) {
            return className;
        }

        var finalClass = [];
        var classNames = className.split(' ');

        classNames.forEach(function (className) {
            finalClass.push(base + '--' + className);
        });

        return finalClass.join(' ');
    },

    onClose: function onClose() {
        Manager.close();
    },

    handleButtonClick: function handleButtonClick(action) {
        if (typeof action === 'function') {
            return action.call(this, Manager);
        }
    },

    containerClick: function containerClick(e) {
        if (this.hasClass(e.target, this.props.className)) {
            this.onClose();
        }
    },

    render: function render() {
        var className = this.props.className;
        var box = null;
        var overlayStyle = {};

        if (this.state.visible) {
            var closeBtn = null;

            className += ' ' + this.props.className + '--visible';

            if (this.props.closeBtn) {
                closeBtn = _react2.default.createElement(
                    'button',
                    { onClick: this.onClose, className: this.props.className + '__close' },
                    this.props.closeHtml
                );
            }

            var boxClass = this.className('box');

            if (this.state.className) {
                boxClass += ' ' + this.wildClass(this.state.className, boxClass);
            }

            box = _react2.default.createElement(
                'article',
                { ref: 'box', style: { opacity: 0 }, className: boxClass },
                closeBtn,
                _react2.default.createElement(_Header2.default, { title: this.state.title, className: this.className('box__header') }),
                _react2.default.createElement(
                    'div',
                    { className: this.className('box__body') },
                    this.state.content
                ),
                _react2.default.createElement(_Footer2.default, {
                    className: this.className('box__footer'),
                    wildClasses: this.props.wildClasses,
                    btnClass: this.props.btnClass,
                    buttonClick: this.handleButtonClick,
                    onClose: this.onClose,
                    onOk: this.onClose,
                    defaultOk: this.props.defaultOk,
                    defaultCancel: this.props.defaultCancel,
                    buttons: this.state.buttons })
            );
        }

        if (this.state.noOverlay) {
            overlayStyle.background = 'transparent';
        }

        return _react2.default.createElement(
            'div',
            { onClick: this.containerClick, className: className, style: overlayStyle },
            box
        );
    }

});

exports.default = Component;