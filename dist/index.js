'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _Header = require('./Header.react');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./Footer.react');

var _Footer2 = _interopRequireDefault(_Footer);

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var displayName = 'Popup';
var propTypes = {
    className: _propTypes2.default.string.isRequired,
    btnClass: _propTypes2.default.string.isRequired,
    closeBtn: _propTypes2.default.bool,
    closeHtml: _propTypes2.default.string,
    defaultOk: _propTypes2.default.string,
    defaultCancel: _propTypes2.default.string,
    wildClasses: _propTypes2.default.bool,
    closeOnOutsideClick: _propTypes2.default.bool
};

var defaultProps = {
    className: 'mm-popup',
    btnClass: 'mm-popup__btn',
    closeBtn: true,
    closeHtml: null,
    defaultOk: 'Ok',
    defaultCancel: 'Cancel',
    wildClasses: false,
    closeOnOutsideClick: true
};

var initialState = {
    title: null,
    buttons: false,
    content: null,
    visible: false,
    className: null,
    noOverlay: false,
    position: false,
    closeOnOutsideClick: true
};

var Store = new _Store2.default();
var hasClass = function hasClass(element, className) {
    if (element.classList) {
        return !!className && element.classList.contains(className);
    }

    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
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

            Store.popups[id] = _extends({}, initialState, data);

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
            this.setPosition(this.state.position);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}

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
            this.setState(initialState);
        }

        /**
         * On popup show
         * @private
         */

    }, {
        key: 'onShow',
        value: function onShow() {
            var popup = Store.activePopup();

            this.setState({
                title: popup.title,
                content: popup.content,
                buttons: popup.buttons,
                visible: true,
                className: popup.className,
                noOverlay: popup.noOverlay,
                position: popup.position,
                closeOnOutsideClick: popup.closeOnOutsideClick
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

            box.style.top = parseInt(boxPosition.y, 10) + ' px';
            box.style.left = parseInt(boxPosition.x, 10) + ' \'px';
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
            if (this.state.closeOnOutsideClick && hasClass(e.target, this.props.className)) {
                Store.close();
            }
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
            var _this2 = this;

            var className = this.props.className;
            var box = null;
            var overlayStyle = {};

            if (this.state.visible) {
                var closeBtn = null;

                className += ' ' + this.props.className + '--visible';

                if (this.props.closeBtn) {
                    closeBtn = _react2.default.createElement(
                        'button',
                        { onClick: function onClick() {
                                return Store.close();
                            }, className: this.props.className + '__close' },
                        this.props.closeHtml
                    );
                }

                var boxClass = this.className('box');

                if (this.state.className) {
                    boxClass += ' ' + this.wildClass(this.state.className, boxClass);
                }

                box = _react2.default.createElement(
                    'article',
                    { role: 'dialog', ref: function ref(el) {
                            _this2.boxRef = el;
                        }, style: { opacity: 0 }, className: boxClass },
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
                        onClose: function onClose() {
                            return Store.close();
                        },
                        onOk: function onOk() {
                            return Store.close();
                        },
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
                { role: 'presentation', onClick: this.bound.containerClick, className: className, style: overlayStyle },
                box
            );
        }
    }]);

    return Component;
}(_react2.default.Component);

Component.displayName = displayName;
Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

exports.default = Component;