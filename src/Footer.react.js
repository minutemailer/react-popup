'use strict';

import React from 'react';
import ActionButton from './ActionButton';

const buttonSpaceDefaultProps = {
	buttons: null,
	className: null,
	onOk: null,
	onClose: null,
	buttonClick: null,
	btnClass: null,
	href: null
};

class ButtonsSpace extends React.Component {

	constructor(props) {
		super(props);
	}

    onOk() {
        if (this.props.onOk) {
            return this.props.onOk();
        }
    }

    onClose() {
        if (this.props.onClose) {
            return this.props.onClose();
        }
    }

    buttonClick(action) {
		if (this.props.buttonClick) {
            return this.props.buttonClick(action);
        }
    }

    wildClass(className, base) {
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
    }

    render() {
        if (!this.props.buttons) {
            return null;
        }

        let btns = [];

        for (let i in this.props.buttons) {
            if (this.props.buttons.hasOwnProperty(i)) {
                let btn = this.props.buttons[i];
                let url = (btn.url) ? btn.url : null;

                if (typeof btn === 'string') {
                    if (btn === 'ok') {
                        btns.push(<ActionButton className={this.props.btnClass + ' ' + this.props.btnClass + '--ok'} key={i} onClick={() => this.onOk()}>{this.props.defaultOk}</ActionButton>);
                    } else if (btn === 'cancel') {
                        btns.push(<ActionButton className={this.props.btnClass + ' ' + this.props.btnClass + '--cancel'} key={i} onClick={() => this.onClose()}>{this.props.defaultCancel}</ActionButton>);
                    }
                } else {
                    let className = this.props.btnClass + ' ' + this.wildClass(btn.className, this.props.btnClass);
                    btns.push(<ActionButton className={className} key={i} url={url} onClick={() => this.buttonClick(btn.action)}>{btn.text}</ActionButton>);
                }
            }
        }

        return (
            <div className={this.props.className}>
                {btns}
            </div>
        );
    }

}

ButtonsSpace.displayName = 'PopupFooterButtons';
ButtonsSpace.defaultProps = buttonSpaceDefaultProps;

const defaultProps = {
	buttons: null,
	className: null,
	wildClasses: false,
	btnClass: null,
	defaultOk: null,
	defaultCancel: null,
	buttonClick: null,
	onOk: null,
	onClose: null
};

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

    render() {
        if (this.props.buttons) {
            return (
                <footer className={this.props.className}>
                    <ButtonsSpace
                        buttonClick={this.props.buttonClick}
                        onOk={this.props.onOk}
                        onClose={this.props.onClose}
                        className={this.props.className + '__left-space'}
                        wildClasses={this.props.wildClasses}
                        btnClass={this.props.btnClass}
                        defaultOk={this.props.defaultOk}
                        defaultCancel={this.props.defaultCancel}
                        buttons={this.props.buttons.left}
					/>

                    <ButtonsSpace
                        buttonClick={this.props.buttonClick}
                        onOk={this.props.onOk}
                        onClose={this.props.onClose}
                        className={this.props.className + '__right-space'}
                        wildClasses={this.props.wildClasses}
                        btnClass={this.props.btnClass}
                        defaultOk={this.props.defaultOk}
                        defaultCancel={this.props.defaultCancel}
                        buttons={this.props.buttons.right}
					/>
                </footer>
            );
        }

        return null;
    }

}

Component.displayName = 'PopupFooter';
Component.defaultProps = defaultProps;

export default Component;
