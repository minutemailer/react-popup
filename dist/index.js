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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var displayName = 'Popup';
var propTypes = {
    'className': _react2.default.PropTypes.string.isRequired,
    'btnClass': _react2.default.PropTypes.string.isRequired,
    'inputClass': _react2.default.PropTypes.string.isRequired,
    'closeBtn': _react2.default.PropTypes.bool,
    'closeHtml': _react2.default.PropTypes.string,
    'defaultOk': _react2.default.PropTypes.string,
    'defaultCancel': _react2.default.PropTypes.string,
    'wildClasses': _react2.default.PropTypes.bool,
    'closeOnOutsideClick': _react2.default.PropTypes.bool
};

var defaultProps = {
    'className': 'mm-popup',
    'btnClass': 'mm-popup__btn',
    'inputClass': 'mm-popup__input',
    'closeBtn': true,
    'closeHtml': null,
    'defaultOk': 'Ok',
    'defaultCancel': 'Cancel',
    'wildClasses': false,
    'closeOnOutsideClick': true
};

var initialState = {
    'title': null,
    'buttons': false,
    'content': null,
    'visible': false,
    'className': null,
    'noOverlay': false,
    'position': false,
    'closeOnOutsideClick': true
};

var Store = new _Store2.default();

var Component = function (_React$Component) {
    _inherits(Component, _React$Component);

    function Component(props) {
        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this, props));

        initialState.closeOnOutsideClick = _this.props.closeOnOutsideClick;

        _this.state = initialState;

        _this.onShow = function () {
            return _this._onShow();
        };
        _this.onClose = function () {
            return _this._onClose();
        };
        _this.onRefresh = function (position) {
            return _this._onRefresh(position);
        };

        _this.handleCloseEvent = function () {
            return _this._handleCloseEvent();
        };
        _this.containerClick = function (e) {
            return _this._containerClick(e);
        };
        _this.handleButtonClick = function (action) {
            return _this._handleButtonClick(action);
        };
        return _this;
    }

    _createClass(Component, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            Store.on(_Constants2.default.SHOW, this.onShow);
            Store.on(_Constants2.default.CLOSE, this.onClose);
            Store.on(_Constants2.default.REFRESH, this.onRefresh);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.setPosition(this.state.position);
        }

        /**
         * On popup show
         * @private
         */

    }, {
        key: '_onShow',
        value: function _onShow() {
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

        /**
         * On popup close
         * @private
         */

    }, {
        key: '_onClose',
        value: function _onClose() {
            this.setState(initialState);
        }

        /**
         * Handle close triggered inside component
         * @private
         */

    }, {
        key: '_handleCloseEvent',
        value: function _handleCloseEvent() {
            Store.close();
        }

        /**
         * Handle button clicks
         * @param action
         * @returns {*}
         * @private
         */

    }, {
        key: '_handleButtonClick',
        value: function _handleButtonClick(action) {
            if (typeof action === 'function') {
                return action.call(this, Store);
            }
        }

        /**
         * Handle container click
         * @param e
         * @private
         */

    }, {
        key: '_containerClick',
        value: function _containerClick(e) {
            if (this.state.closeOnOutsideClick && this.hasClass(e.target, this.props.className)) {
                this.handleCloseEvent();
            }
        }

        /**
         * Refresh popup position
         * @param position
         * @private
         */

    }, {
        key: '_onRefresh',
        value: function _onRefresh(position) {
            this.setPosition(position);
        }
    }, {
        key: 'setPosition',
        value: function setPosition(position) {
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
        }
    }, {
        key: 'hasClass',
        value: function hasClass(element, className) {
            if (element.classList) {
                return !!className && element.classList.contains(className);
            }

            return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
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

            classNames.forEach(function (className) {
                finalClass.push(base + '--' + className);
            });

            return finalClass.join(' ');
        }
    }, {
        key: 'render',
        value: function render() {
            var className = this.props.className;
            var box = null;
            var overlayStyle = {};

            if (this.state.visible) {
                var closeBtn = null;

                className += ' ' + this.props.className + '--visible';

                if (this.props.closeBtn) {
                    closeBtn = _react2.default.createElement(
                        'button',
                        { onClick: this.handleCloseEvent, className: this.props.className + '__close' },
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
                        onClose: this.handleCloseEvent,
                        onOk: this.handleCloseEvent,
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
    }], [{
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

            data = _extends({}, initialState, data);

            Store.popups[id] = data;

            return id;
        }
    }, {
        key: 'queue',
        value: function queue(id) {
            if (!Store.popups.hasOwnProperty(id)) {
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
        value: function create(data) {
            /** Register popup */
            var id = this.register(data);

            /** Queue popup */
            this.queue(id);

            return id;
        }
    }, {
        key: 'alert',
        value: function alert(text, title, noQueue) {
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

    return Component;
}(_react2.default.Component);

Component.displayName = displayName;
Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

exports.default = Component;