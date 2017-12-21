import { EventEmitter } from 'events';
import Constants from './Constants';

export default class PopupStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.id = 1;
        this.popups = {};
        this.queue = [];
        this.active = null;
        this.plugins = {};
    }

    /**
     * Get popup ID
     */
    getId() {
        return `id_${this.id++}`;
    }

    /**
     * Get active popup
     * @returns {*}
     */
    activePopup() {
        return this.popups[this.active];
    }

    /**
     * Close current popup
     */
    close() {
        if (!this.active) {
            return false;
        }

        const id = this.active;
        this.active = null;

        this.emit(Constants.CLOSE);
        this.dispatch();

        this.value = null;

        return id;
    }

    /**
     * Dispatch next popup in queue
     */
    dispatch() {
        if (this.active || this.queue.length < 1) {
            return false;
        }

        const id = this.queue.shift();

        /** Set active */
        this.active = id;

        this.emit(Constants.SHOW, id);

        return true;
    }

    /**
     * Refresh popup position
     * @param position
     */
    refreshPosition(position) {
        this.emit(Constants.REFRESH, position);
    }

    /**
     * Clear queue
     */
    clearQueue() {
        this.queue = [];
    }
}
