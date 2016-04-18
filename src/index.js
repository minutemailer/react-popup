'use strict';

import React from 'react';
import events from 'events';
import Header from './Header.react';
import Footer from './Footer.react';
import Input from './Input.react';

var EventEmitter  = events.EventEmitter,
    SHOW_EVENT    = 'show',
    CLOSE_EVENT   = 'close',
    _props        = {},
    _initialState = {},
    Manager,
    Component;

Manager = Object.assign({}, EventEmitter.prototype, {

    id: 1,

    popups: {},

    queue: [],

    active: null,

    value: null,

    getId: function () {
        return 'id_' + (this.id++);
    },

    activePopup: function () {
        return this.popups[this.active];
    },

    close: function () {
        if (!this.active) {
            return false;
        }

        var id      = this.active;
        this.active = null;

        this.emit(CLOSE_EVENT);
        this.dispatch();

        this.value = null;

        return id;
    },

    dispatch: function () {
        if (this.active || this.queue.length < 1) {
            return false;
        }

        var id = this.queue.shift();

        /** Set active */
        this.active = id;

        this.emit(SHOW_EVENT);
    }

});

Component = React.createClass({

    displayName: 'Popup',

    getInitialState: function() {
        var state = {
            'title'       : null,
            'buttons'     : false,
            'content'     : null,
            'visible'     : false,
            'className'   : null,
            'noOverlay'   : false,
            'position'    : false,
            'wildClasses' : false
        };

        _initialState = state;

        return state;
    },

    getDefaultProps: function() {
        return {
            'className'     : 'mm-popup',
            'btnClass'      : 'mm-popup__btn',
            'inputClass'    : 'mm-popup__input',
            'closeBtn'      : true,
            'closeHtml'     : null,
            'defaultOk'     : 'Ok',
            'defaultCancel' : 'Cancel'
        };
    },

    statics: {

        plugins: {},

        addShowListener: function (callback) {
            Manager.on(SHOW_EVENT, callback);
        },

        removeShowListener: function (callback) {
            Manager.removeListener(SHOW_EVENT, callback);
        },

        addCloseListener: function (callback) {
            Manager.on(CLOSE_EVENT, callback);
        },

        removeCloseListener: function (callback) {
            Manager.removeListener(CLOSE_EVENT, callback);
        },

        register: function (data) {
            var id = Manager.getId();

            data = Object.assign({}, _initialState, data);

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

            return this.create(data);
        },

        prompt: function (title, text, inputAttributes, okBtn, noQueue) {
            if (!okBtn) {
                okBtn = 'ok';
            }
            
            inputAttributes || (inputAttributes = {
                value: '',
                placeholder: '',
                type: 'text'
            });

            function onChange(value) {
                Manager.value = value;
            }

            var content, data;

            if (text) {
                text = <p>{text}</p>;
            }

            content = (
                <div>
                    {text}
                    <Input value={inputAttributes.value} placeholder={inputAttributes.placeholder} type={inputAttributes.type} className={_props.inputClass} onChange={onChange} />
                </div>
            );

            var data = {
                title: title,
                content:content,
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

        close: function () {
            Manager.close();
        },

        getValue: function () {
            return Manager.value;
        },

        registerPlugin: function (name, callback) {
            this.plugins[name] = callback.bind(this);
        },

    },

    componentDidMount: function() {
        var _this = this, popup;

        Manager.on(SHOW_EVENT, function () {
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

        _props = this.props;

        Manager.on(CLOSE_EVENT, function () {
            _this.setState(_this.getInitialState());
        });
    },

    componentDidUpdate: function () {
        var box = this.refs.box;

        if (!box) {
            return;
        }

        if (!this.state.position) {
            box.style.opacity = 1;
            box.style.top     = null;
            box.style.left    = null;
            box.style.margin  = null;

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
    
    hasClass: function (element, className) {
        if (element.classList) {
          return !!className && element.classList.contains(className);
        }
        
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    },

    className: function (className) {
        return this.props.className + '__' + className;
    },

    wildClass: function (className, base) {
        if (!className) {
            return null;
        }

        if (this.props.wildClasses) {
            return className;
        }

        var finalClass = [],
            classNames = className.split(' ');

        classNames.forEach(function (className) {
            finalClass.push(base + '--' + className);
        });

        return finalClass.join(' ');
    },

    onClose: function () {
        Manager.close();
    },

    handleButtonClick: function (action) {
        if (typeof action === 'function') {
            return action.call(this, Manager);
        }
    },
    
    containerClick: function (e) {
        if (this.hasClass(e.target, this.props.className)) {
            this.onClose();
        }
    },

    render: function() {
        var className = this.props.className, box, closeBtn, overlayStyle = {}, boxClass;

        if (this.state.visible) {
            className += ' ' + this.props.className + '--visible';

            if (this.props.closeBtn) {
                closeBtn = <button onClick={this.onClose} className={this.props.className + '__close'}>{this.props.closeHtml}</button>;
            }

            boxClass = this.className('box');

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
                        onClose={this.onClose} 
                        onOk={this.onClose}
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

});

export default Component;