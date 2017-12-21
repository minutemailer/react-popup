'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _keymaster = require('keymaster');

var _keymaster2 = _interopRequireDefault(_keymaster);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _Header = require('./Header.react');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./Footer.react');

var _Footer2 = _interopRequireDefault(_Footer);

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultKeyFilter = _keymaster2.default.filter;

var Store = new _Store2.default();
var hasClass = function hasClass(element, className) {
    if (element.classList) {
        return !!className && element.classList.contains(className);
    }

    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
};

var handleClose = function handleClose() {
    _keymaster2.default.deleteScope('react-popup');
    _keymaster2.default.filter = defaultKeyFilter;

    Store.close();
};

var initialState = {
    id: null,
    title: null,
    buttons: null,
    content: null,
    visible: false,
    className: null,
    noOverlay: false,
    position: false,
    closeOnOutsideClick: true
};

var Component = function (_React$Component) {
    _inherits(Component, _React$Component);

    _createClass(Component, null, [{
        key: 'addShowListener',
        value: function addShowListener(callback) {
            Store.on(_Constants2.default.SHOW, callback);
        }
    }, {
        key: 'removeShowListener',
        value: function removeShowListener(callback) {
            Store.removeListener(_Constants2.default.SHOW, callback);
        }
    }, {
        key: 'addCloseListener',
        value: function addCloseListener(callback) {
            Store.on(_Constants2.default.CLOSE, callback);
        }
    }, {
        key: 'removeCloseListener',
        value: function removeCloseListener(callback) {
            Store.removeListener(_Constants2.default.CLOSE, callback);
        }
    }, {
        key: 'register',
        value: function register(data) {
            var id = Store.getId();

            Store.popups[id] = Object.assign({}, initialState, data);

            return id;
        }
    }, {
        key: 'queue',
        value: function queue(id) {
            if (!Object.prototype.hasOwnProperty.call(Store.popups, id)) {
                return false;
            }

            /** Add popup to queue */
            Store.queue.push(id);

            /** Dispatch queue */
            Store.dispatch();

            return id;
        }
    }, {
        key: 'create',
        value: function create(data, bringToFront) {
            /** Register popup */
            var id = this.register(data);

            /** Queue popup */
            if (bringToFront === true) {
                var currentlyActive = Store.active;

                Store.active = null;
                this.queue(id);
                this.queue(currentlyActive);
                Store.dispatch();
            } else {
                this.queue(id);
            }

            return id;
        }
    }, {
        key: 'alert',
        value: function alert(text, title, bringToFront) {
            var data = {
                title: title,
                content: text,
                buttons: {
                    right: ['ok']
                }
            };

            return this.create(data, bringToFront);
        }
    }, {
        key: 'close',
        value: function close() {
            Store.close();
        }
    }, {
        key: 'registerPlugin',
        value: function registerPlugin(name, callback) {
            Store.plugins[name] = callback.bind(this);
        }
    }, {
        key: 'plugins',
        value: function plugins() {
            return Store.plugins;
        }
    }, {
        key: 'refreshPosition',
        value: function refreshPosition(position) {
            return Store.refreshPosition(position);
        }
    }, {
        key: 'clearQueue',
        value: function clearQueue() {
            return Store.clearQueue();
        }
    }]);

    function Component(props) {
        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

        initialState.closeOnOutsideClick = _this.props.closeOnOutsideClick;

        _this.state = initialState;

        _this.bound = {
            onShow: _this.onShow.bind(_this),
            onClose: _this.onClose.bind(_this),
            onRefresh: _this.onRefresh.bind(_this),
            containerClick: _this.containerClick.bind(_this),
            handleButtonClick: _this.handleButtonClick.bind(_this)
        };

        _this.boxRef = null;

        _this.defaultKeyBindings = {
            ok: _this.props.defaultOkKey,
            cancel: _this.props.defaultCancelKey
        };
        return _this;
    }

    _createClass(Component, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            Store.on(_Constants2.default.SHOW, this.bound.onShow);
            Store.on(_Constants2.default.CLOSE, this.bound.onClose);
            Store.on(_Constants2.default.REFRESH, this.bound.onRefresh);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.boxRef) {
                this.boxRef.focus();
            }

            this.setPosition(this.state.position);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _keymaster2.default.deleteScope('react-popup');
            _keymaster2.default.filter = defaultKeyFilter;
        }

        /**
         * Refresh popup position
         * @param position
         * @private
         */

    }, {
        key: 'onRefresh',
        value: function onRefresh(position) {
            this.setPosition(position);
        }

        /**
         * On popup close
         * @private
         */

    }, {
        key: 'onClose',
        value: function onClose() {
            _keymaster2.default.deleteScope('react-popup');
            _keymaster2.default.filter = defaultKeyFilter;

            this.setState(initialState);
        }

        /**
         * On popup show
         * @private
         */

    }, {
        key: 'onShow',
        value: function onShow(id) {
            var _this2 = this;

            _keymaster2.default.deleteScope('react-popup');

            _keymaster2.default.filter = function () {
                return true;
            };

            var popup = Store.activePopup();

            if (popup.buttons && !Object.prototype.hasOwnProperty.call(popup.buttons, 'left')) {
                popup.buttons.left = [];
            }

            if (popup.buttons && !Object.prototype.hasOwnProperty.call(popup.buttons, 'right')) {
                popup.buttons.right = [];
            }

            this.setState({
                id: id,
                title: popup.title,
                content: popup.content,
                buttons: popup.buttons,
                visible: true,
                className: popup.className,
                noOverlay: popup.noOverlay,
                position: popup.position,
                closeOnOutsideClick: popup.closeOnOutsideClick
            }, function () {
                _keymaster2.default.setScope('react-popup');

                if (_this2.props.escToClose) {
                    (0, _keymaster2.default)('esc', 'react-popup', _this2.handleKeyEvent.bind(_this2, 'cancel', _this2.state.id));
                }

                if (_this2.state.buttons) {
                    if (_this2.state.buttons.left.length) {
                        _this2.state.buttons.left.forEach(function (button) {
                            return _this2.bindKeyEvents(button);
                        });
                    }

                    if (_this2.state.buttons.right.length) {
                        _this2.state.buttons.right.forEach(function (button) {
                            return _this2.bindKeyEvents(button);
                        });
                    }
                }
            });
        }
    }, {
        key: 'setPosition',
        value: function setPosition(position) {
            var box = this.boxRef;
            var boxPosition = position;

            if (!box) {
                return;
            }

            if (!boxPosition) {
                boxPosition = this.state.position;
            }

            if (!boxPosition) {
                box.style.opacity = 1;
                box.style.top = null;
                box.style.left = null;
                box.style.margin = null;

                return;
            }

            if (typeof boxPosition === 'function') {
                boxPosition.call(null, box);

                return;
            }

            console.log(boxPosition);

            box.style.top = parseInt(boxPosition.y, 10) + 'px';
            box.style.left = parseInt(boxPosition.x, 10) + 'px';
            box.style.margin = 0;
            box.style.opacity = 1;
        }

        /**
         * Handle container click
         * @param e
         * @private
         */

    }, {
        key: 'containerClick',
        value: function containerClick(e) {
            if (this.state.closeOnOutsideClick) {
                handleClose();
            }
        }
    }, {
        key: 'bindKeyEvents',
        value: function bindKeyEvents(button) {
            var code = null;

            if (typeof button === 'string') {
                code = this.defaultKeyBindings[button];
            } else if (Object.prototype.hasOwnProperty.call(button, 'key')) {
                code = button.key;
            }

            if (this.props.escToClose && code === 'esc') {
                return;
            }

            if (code) {
                (0, _keymaster2.default)(code, 'react-popup', this.handleKeyEvent.bind(this, button, this.state.id));
            }
        }
    }, {
        key: 'handleKeyEvent',
        value: function handleKeyEvent(button, id, e) {
            var excludeTags = ['INPUT', 'TEXTAREA', 'BUTTON'];

            if (this.state.id !== id || button.key === 'enter' && excludeTags.indexOf(e.target.tagName) >= 0) {
                return true;
            }

            if (typeof button === 'string') {
                handleClose();
            } else if (Object.prototype.hasOwnProperty.call(button, 'action')) {
                this.handleButtonClick(button.action);
            }

            return false;
        }

        /**
         * Handle button clicks
         * @param action
         * @returns {*}
         * @private
         */

    }, {
        key: 'handleButtonClick',
        value: function handleButtonClick(action) {
            if (typeof action === 'function') {
                return action.call(this, Store);
            }

            return null;
        }
    }, {
        key: 'className',
        value: function className(_className) {
            return this.props.className + '__' + _className;
        }
    }, {
        key: 'wildClass',
        value: function wildClass(className, base) {
            if (!className) {
                return null;
            }

            if (this.props.wildClasses) {
                return className;
            }

            var finalClass = [];
            var classNames = className.split(' ');

            classNames.forEach(function (singleClass) {
                finalClass.push(base + '--' + singleClass);
            });

            return finalClass.join(' ');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var className = this.props.className;

            var box = null;
            var overlayStyle = {};

            if (this.state.visible) {
                var closeBtn = null;

                className += ' ' + this.props.className + '--visible';

                if (this.props.closeBtn) {
                    closeBtn = _react2.default.createElement(
                        'button',
                        { onClick: handleClose, className: this.props.className + '__close' },
                        this.props.closeHtml
                    );
                }

                var boxClass = this.className('box');

                if (this.state.className) {
                    boxClass += ' ' + this.wildClass(this.state.className, boxClass);
                }

                box = _react2.default.createElement(
                    'article',
                    { role: 'dialog', tabIndex: '-1', ref: function ref(el) {
                            _this3.boxRef = el;
                        }, style: { opacity: 0, outline: 'none' }, className: boxClass },
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
                        buttonClick: this.bound.handleButtonClick,
                        onClose: handleClose,
                        onOk: handleClose,
                        defaultOk: this.props.defaultOk,
                        defaultCancel: this.props.defaultCancel,
                        buttons: this.state.buttons
                    })
                );
            }

            if (this.state.noOverlay) {
                overlayStyle.background = 'transparent';
            }

            return _react2.default.createElement(
                'div',
                { className: className },
                _react2.default.createElement('div', { role: 'presentation', onClick: this.bound.containerClick, className: this.className('overlay'), style: overlayStyle }),
                box
            );
        }
    }]);

    return Component;
}(_react2.default.Component);

Component.displayName = 'Popup';
Component.propTypes = {
    className: _propTypes2.default.string,
    btnClass: _propTypes2.default.string,
    closeBtn: _propTypes2.default.bool,
    closeHtml: _propTypes2.default.node,
    defaultOk: _propTypes2.default.string,
    defaultOkKey: _propTypes2.default.string,
    defaultCancel: _propTypes2.default.string,
    defaultCancelKey: _propTypes2.default.string,
    wildClasses: _propTypes2.default.bool,
    closeOnOutsideClick: _propTypes2.default.bool,
    escToClose: _propTypes2.default.bool
};
Component.defaultProps = {
    className: 'mm-popup',
    btnClass: 'mm-popup__btn',
    closeBtn: true,
    closeHtml: null,
    defaultOk: 'Ok',
    defaultOkKey: 'enter',
    defaultCancel: 'Cancel',
    defaultCancelKey: 'esc',
    wildClasses: false,
    closeOnOutsideClick: true,
    escToClose: true
};
exports.default = Component;