'use strict';

import React from 'react';
import PopupStore from './Store';
import Header from './Header.react';
import Footer from './Footer.react';
import Constants from './Constants';

const displayName = 'Popup';
const propTypes = {
    'className'           : React.PropTypes.string.isRequired,
    'btnClass'            : React.PropTypes.string.isRequired,
    'inputClass'          : React.PropTypes.string.isRequired,
    'closeBtn'            : React.PropTypes.bool,
    'closeHtml'           : React.PropTypes.string,
    'defaultOk'           : React.PropTypes.string,
    'defaultCancel'       : React.PropTypes.string,
    'wildClasses'         : React.PropTypes.bool,
    'closeOnOutsideClick' : React.PropTypes.bool
};

const defaultProps = {
    'className'           : 'mm-popup',
    'btnClass'            : 'mm-popup__btn',
    'inputClass'          : 'mm-popup__input',
    'closeBtn'            : true,
    'closeHtml'           : null,
    'defaultOk'           : 'Ok',
    'defaultCancel'       : 'Cancel',
    'wildClasses'         : false,
    'closeOnOutsideClick' : true
};

let initialState = {
    'title'               : null,
    'buttons'             : false,
    'content'             : null,
    'visible'             : false,
    'className'           : null,
    'noOverlay'           : false,
    'position'            : false,
    'closeOnOutsideClick' : true
};

const Store = new PopupStore();

class Component extends React.Component {

    constructor(props) {
        super(props);

        initialState.closeOnOutsideClick = this.props.closeOnOutsideClick;

        this.state = initialState;

        this.onShow = () => this._onShow();
        this.onClose = () => this._onClose();
        this.onRefresh = (position) => this._onRefresh(position);

        this.handleCloseEvent = () => this._handleCloseEvent();
        this.containerClick = (e) => this._containerClick(e);
        this.handleButtonClick = (action) => this._handleButtonClick(action);
    }

    componentDidMount() {
        Store.on(Constants.SHOW, this.onShow);
        Store.on(Constants.CLOSE, this.onClose);
        Store.on(Constants.REFRESH, this.onRefresh);
    }

    componentWillUnmount() {
    }

    componentDidUpdate() {
        this.setPosition(this.state.position);
    }

    /**
     * On popup show
     * @private
     */
    _onShow() {
        const popup = Store.activePopup();

        this.setState({
            title               : popup.title,
            content             : popup.content,
            buttons             : popup.buttons,
            visible             : true,
            className           : popup.className,
            noOverlay           : popup.noOverlay,
            position            : popup.position,
            closeOnOutsideClick : popup.closeOnOutsideClick
        });
    }

    /**
     * On popup close
     * @private
     */
    _onClose() {
        this.setState(initialState);
    }

    /**
     * Handle close triggered inside component
     * @private
     */
    _handleCloseEvent() {
        Store.close();
    }

    /**
     * Handle button clicks
     * @param action
     * @returns {*}
     * @private
     */
    _handleButtonClick(action) {
        if (typeof action === 'function') {
            return action.call(this, Store);
        }
    }

    /**
     * Handle container click
     * @param e
     * @private
     */
    _containerClick(e) {
        if (this.state.closeOnOutsideClick && this.hasClass(e.target, this.props.className)) {
            this.handleCloseEvent();
        }
    }

    /**
     * Refresh popup position
     * @param position
     * @private
     */
    _onRefresh(position) {
        this.setPosition(position)
    }

    setPosition(position) {
        let box = this.refs.box;

        if (!box) {
            return;
        }

        if (!position) {
            position = this.state.position;
        }

        if (!position) {
            box.style.opacity = 1;
            box.style.top     = null;
            box.style.left    = null;
            box.style.margin  = null;

            return false;
        }

        if (typeof position === 'function') {
            return position.call(null, box);
        }

        box.style.top     = parseInt(position.y, 10) + 'px';
        box.style.left    = parseInt(position.x, 10) + 'px';
        box.style.margin  = 0;
        box.style.opacity = 1;
    }

    hasClass(element, className) {
        if (element.classList) {
            return !!className && element.classList.contains(className);
        }

        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    className(className) {
        return this.props.className + '__' + className;
    }

    wildClass(className, base) {
        if (!className) {
            return null;
        }

        if (this.props.wildClasses) {
            return className;
        }

        let finalClass = [];
        const classNames = className.split(' ');

        classNames.forEach(function (className) {
            finalClass.push(base + '--' + className);
        });

        return finalClass.join(' ');
    }

    static addShowListener(callback) {
        Store.on(Constants.SHOW, callback);
    }

    static removeShowListener(callback) {
        Store.removeListener(Constants.SHOW, callback);
    }

    static addCloseListener(callback) {
        Store.on(Constants.CLOSE, callback);
    }

    static removeCloseListener(callback) {
        Store.removeListener(Constants.CLOSE, callback);
    }

    static register(data) {
        const id = Store.getId();

        data = Object.assign({}, initialState, data);

        Store.popups[id] = data;

        return id;
    }

    static queue(id) {
        if (!Store.popups.hasOwnProperty(id)) {
            return false;
        }

        /** Add popup to queue */
        Store.queue.push(id);

        /** Dispatch queue */
        Store.dispatch();

        return id;
    }

    static create(data) {
        /** Register popup */
        const id = this.register(data);

        /** Queue popup */
        this.queue(id);

        return id;
    }

    static alert(text, title, noQueue) {
        const data = {
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

    static close() {
        Store.close();
    }

    static registerPlugin(name, callback) {
        Store.plugins[name] = callback.bind(this);
    }

    static plugins() {
        return Store.plugins;
    }

    static refreshPosition(position) {
        return Store.refreshPosition(position);
    }

    static clearQueue() {
        return Store.clearQueue();
    }

    render() {
        let className = this.props.className;
        let box = null;
        let overlayStyle = {};

        if (this.state.visible) {
            let closeBtn = null;

            className += ' ' + this.props.className + '--visible';

            if (this.props.closeBtn) {
                closeBtn = <button onClick={this.handleCloseEvent} className={this.props.className + '__close'}>{this.props.closeHtml}</button>;
            }

            let boxClass = this.className('box');

            if (this.state.className) {
                boxClass += ' ' + this.wildClass(this.state.className, boxClass);
            }

            box = (
                <article ref="box" style={{opacity: 0}} className={boxClass}>
                    {closeBtn}
                    <Header title={this.state.title} className={this.className('box__header')} />

                    <div className={this.className('box__body')}>
                        {this.state.content}
                    </div>

                    <Footer
                        className={this.className('box__footer')}
                        wildClasses={this.props.wildClasses}
                        btnClass={this.props.btnClass}
                        buttonClick={this.handleButtonClick}
                        onClose={this.handleCloseEvent}
                        onOk={this.handleCloseEvent}
                        defaultOk={this.props.defaultOk}
                        defaultCancel={this.props.defaultCancel}
                        buttons={this.state.buttons} />
                </article>
            );
        }

        if (this.state.noOverlay) {
            overlayStyle.background = 'transparent';
        }

        return (
            <div onClick={this.containerClick} className={className} style={overlayStyle}>
                {box}
            </div>
        );
    }

}

Component.displayName = displayName;
Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

export default Component;