'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopupStore = function (_EventEmitter) {
    _inherits(PopupStore, _EventEmitter);

    function PopupStore(props) {
        _classCallCheck(this, PopupStore);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PopupStore).call(this, props));

        _this.id = 1;
        _this.popups = {};
        _this.queue = [];
        _this.active = null;
        _this.plugins = {};
        return _this;
    }

    /**
     * Get popup ID
     */


    _createClass(PopupStore, [{
        key: 'getId',
        value: function getId() {
            return 'id_' + this.id++;
        }

        /**
         * Get active popup
         * @returns {*}
         */

    }, {
        key: 'activePopup',
        value: function activePopup() {
            return this.popups[this.active];
        }

        /**
         * Close current popup
         */

    }, {
        key: 'close',
        value: function close() {
            if (!this.active) {
                return false;
            }

            var id = this.active;
            this.active = null;

            this.emit(_Constants2.default.CLOSE);
            this.dispatch();

            this.value = null;

            return id;
        }

        /**
         * Dispatch next popup in queue
         */

    }, {
        key: 'dispatch',
        value: function dispatch() {
            if (this.active || this.queue.length < 1) {
                return false;
            }

            var id = this.queue.shift();

            /** Set active */
            this.active = id;

            this.emit(_Constants2.default.SHOW);
        }

        /**
         * Refresh popup position
         * @param position
         */

    }, {
        key: 'refreshPosition',
        value: function refreshPosition(position) {
            this.emit(_Constants2.default.REFRESH, position);
        }

        /**
         * Clear queue
         */

    }, {
        key: 'clearQueue',
        value: function clearQueue() {
            this.queue = [];
        }
    }]);

    return PopupStore;
}(_events.EventEmitter);

exports.default = PopupStore;