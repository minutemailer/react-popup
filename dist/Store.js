"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var _Constants = _interopRequireDefault(require("./Constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopupStore =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(PopupStore, _EventEmitter);

  function PopupStore(props) {
    var _this;

    _classCallCheck(this, PopupStore);

    _this = _possibleConstructorReturn(this, (PopupStore.__proto__ || Object.getPrototypeOf(PopupStore)).call(this, props));
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
    key: "getId",
    value: function getId() {
      return "id_".concat(this.id++);
    }
    /**
     * Get active popup
     * @returns {*}
     */

  }, {
    key: "activePopup",
    value: function activePopup() {
      return this.popups[this.active];
    }
    /**
     * Close current popup
     */

  }, {
    key: "close",
    value: function close() {
      if (!this.active) {
        return false;
      }

      var id = this.active;
      this.active = null;
      this.emit(_Constants.default.CLOSE, id);
      this.dispatch();
      this.value = null;
      return id;
    }
    /**
     * Dispatch next popup in queue
     */

  }, {
    key: "dispatch",
    value: function dispatch() {
      if (this.active || this.queue.length < 1) {
        return false;
      }

      var id = this.queue.shift();
      /** Set active */

      this.active = id;
      this.emit(_Constants.default.SHOW, id);
      return true;
    }
    /**
     * Refresh popup position
     * @param position
     */

  }, {
    key: "refreshPosition",
    value: function refreshPosition(position) {
      this.emit(_Constants.default.REFRESH, position);
    }
    /**
     * Clear queue
     */

  }, {
    key: "clearQueue",
    value: function clearQueue() {
      this.queue = [];
    }
  }]);

  return PopupStore;
}(_events.EventEmitter);

exports.default = PopupStore;