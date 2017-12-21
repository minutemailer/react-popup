import React from 'react';
import PropTypes from 'prop-types';
import key from 'keymaster';
import PopupStore from './Store';
import Header from './Header.react';
import Footer from './Footer.react';
import Constants from './Constants';

const defaultKeyFilter = key.filter;

const Store = new PopupStore();
const hasClass = (element, className) => {
    if (element.classList) {
        return !!className && element.classList.contains(className);
    }

    return (` ${element.className} `).indexOf(` ${className} `) > -1;
};

const handleClose = () => {
    key.deleteScope('react-popup');
    key.filter = defaultKeyFilter;

    Store.close();
};

const initialState = {
    id: null,
    title: null,
    buttons: null,
    content: null,
    visible: false,
    className: null,
    noOverlay: false,
    position: false,
    closeOnOutsideClick: true,
};

class Component extends React.Component {
    static displayName = 'Popup';

    static propTypes = {
        className: PropTypes.string,
        btnClass: PropTypes.string,
        closeBtn: PropTypes.bool,
        closeHtml: PropTypes.node,
        defaultOk: PropTypes.string,
        defaultOkKey: PropTypes.string,
        defaultCancel: PropTypes.string,
        defaultCancelKey: PropTypes.string,
        wildClasses: PropTypes.bool,
        closeOnOutsideClick: PropTypes.bool,
        escToClose: PropTypes.bool,
    };

    static defaultProps = {
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
        escToClose: true,
    };

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

        Store.popups[id] = Object.assign({}, initialState, data);

        return id;
    }

    static queue(id) {
        if (!Object.prototype.hasOwnProperty.call(Store.popups, id)) {
            return false;
        }

        /** Add popup to queue */
        Store.queue.push(id);

        /** Dispatch queue */
        Store.dispatch();

        return id;
    }

    static create(data, bringToFront) {
        /** Register popup */
        const id = this.register(data);

        /** Queue popup */
        if (bringToFront === true) {
            const currentlyActive = Store.active;

            Store.active = null;
            this.queue(id);
            this.queue(currentlyActive);
            Store.dispatch();
        } else {
            this.queue(id);
        }

        return id;
    }

    static alert(text, title, bringToFront) {
        const data = {
            title,
            content: text,
            buttons: {
                right: ['ok'],
            },
        };

        return this.create(data, bringToFront);
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

    constructor(props) {
        super(props);

        initialState.closeOnOutsideClick = this.props.closeOnOutsideClick;

        this.state = initialState;

        this.bound = {
            onShow: this.onShow.bind(this),
            onClose: this.onClose.bind(this),
            onRefresh: this.onRefresh.bind(this),
            containerClick: this.containerClick.bind(this),
            handleButtonClick: this.handleButtonClick.bind(this),
        };

        this.boxRef = null;

        this.defaultKeyBindings = {
            ok: this.props.defaultOkKey,
            cancel: this.props.defaultCancelKey,
        };
    }

    componentDidMount() {
        Store.on(Constants.SHOW, this.bound.onShow);
        Store.on(Constants.CLOSE, this.bound.onClose);
        Store.on(Constants.REFRESH, this.bound.onRefresh);
    }

    componentDidUpdate() {
        if (this.boxRef) {
            this.boxRef.focus();
        }

        this.setPosition(this.state.position);
    }

    componentWillUnmount() {
        key.deleteScope('react-popup');
        key.filter = defaultKeyFilter;
    }

    /**
     * Refresh popup position
     * @param position
     * @private
     */
    onRefresh(position) {
        this.setPosition(position);
    }

    /**
     * On popup close
     * @private
     */
    onClose() {
        key.deleteScope('react-popup');
        key.filter = defaultKeyFilter;

        this.setState(initialState);
    }

    /**
     * On popup show
     * @private
     */
    onShow(id) {
        key.deleteScope('react-popup');

        key.filter = () => { return true };

        const popup = Store.activePopup();

        if (popup.buttons && !Object.prototype.hasOwnProperty.call(popup.buttons, 'left')) {
            popup.buttons.left = [];
        }

        if (popup.buttons && !Object.prototype.hasOwnProperty.call(popup.buttons, 'right')) {
            popup.buttons.right = [];
        }

        this.setState({
            id,
            title: popup.title,
            content: popup.content,
            buttons: popup.buttons,
            visible: true,
            className: popup.className,
            noOverlay: popup.noOverlay,
            position: popup.position,
            closeOnOutsideClick: popup.closeOnOutsideClick,
        }, () => {
            key.setScope('react-popup');

            if (this.props.escToClose) {
                key('esc', 'react-popup', this.handleKeyEvent.bind(this, 'cancel', this.state.id));
            }

            if (this.state.buttons) {
                if (this.state.buttons.left.length) {
                    this.state.buttons.left.forEach(button => this.bindKeyEvents(button));
                }

                if (this.state.buttons.right.length) {
                    this.state.buttons.right.forEach(button => this.bindKeyEvents(button));
                }
            }
        });
    }

    setPosition(position) {
        const box = this.boxRef;
        let boxPosition = position;

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

        box.style.top = `${parseInt(boxPosition.y, 10)}px`;
        box.style.left = `${parseInt(boxPosition.x, 10)}px`;
        box.style.margin = 0;
        box.style.opacity = 1;
    }

    /**
     * Handle container click
     * @param e
     * @private
     */
    containerClick(e) {
        if (this.state.closeOnOutsideClick) {
            handleClose();
        }
    }

    bindKeyEvents(button) {
        let code = null;

        if (typeof button === 'string') {
            code = this.defaultKeyBindings[button];
        } else if (Object.prototype.hasOwnProperty.call(button, 'key')) {
            code = button.key;
        }

        if (this.props.escToClose && code === 'esc') {
            return;
        }

        if (code) {
            key(code, 'react-popup', this.handleKeyEvent.bind(this, button, this.state.id));
        }
    }

    handleKeyEvent(button, id, e) {
        const excludeTags = ['INPUT', 'TEXTAREA', 'BUTTON'];

        if (this.state.id !== id || (button.key === 'enter' && excludeTags.indexOf(e.target.tagName) >= 0)) {
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
    handleButtonClick(action) {
        if (typeof action === 'function') {
            return action.call(this, Store);
        }

        return null;
    }

    className(className) {
        return `${this.props.className}__${className}`;
    }

    wildClass(className, base) {
        if (!className) {
            return null;
        }

        if (this.props.wildClasses) {
            return className;
        }

        const finalClass = [];
        const classNames = className.split(' ');

        classNames.forEach((singleClass) => {
            finalClass.push(`${base}--${singleClass}`);
        });

        return finalClass.join(' ');
    }

    render() {
        let { className } = this.props;
        let box = null;
        const overlayStyle = {};

        if (this.state.visible) {
            let closeBtn = null;

            className += ` ${this.props.className}--visible`;

            if (this.props.closeBtn) {
                closeBtn = <button onClick={handleClose} className={`${this.props.className}__close`}>{this.props.closeHtml}</button>;
            }

            let boxClass = this.className('box');

            if (this.state.className) {
                boxClass += ` ${this.wildClass(this.state.className, boxClass)}`;
            }

            box = (
                <article role="dialog" tabIndex="-1" ref={(el) => { this.boxRef = el; }} style={{ opacity: 0, outline: 'none' }} className={boxClass}>
                    {closeBtn}
                    <Header title={this.state.title} className={this.className('box__header')} />

                    <div className={this.className('box__body')}>
                        {this.state.content}
                    </div>

                    <Footer
                        className={this.className('box__footer')}
                        wildClasses={this.props.wildClasses}
                        btnClass={this.props.btnClass}
                        buttonClick={this.bound.handleButtonClick}
                        onClose={handleClose}
                        onOk={handleClose}
                        defaultOk={this.props.defaultOk}
                        defaultCancel={this.props.defaultCancel}
                        buttons={this.state.buttons}
                    />
                </article>
            );
        }

        if (this.state.noOverlay) {
            overlayStyle.background = 'transparent';
        }

        return (
            <div className={className}>
                <div role="presentation" onClick={this.bound.containerClick} className={this.className('overlay')} style={overlayStyle} />
                {box}
            </div>
        );
    }
}

export default Component;
