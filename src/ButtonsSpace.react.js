import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton.react';
import { modifier } from './Bem';

export default class PopupFooterButtons extends React.Component {
    static defaultProps = {
        buttons: null,
        className: null,
        onOk: () => {},
        onClose: () => {},
        buttonClick: () => {},
        btnClass: null,
        defaultOk: null,
        defaultCancel: null,
    };

    onOk() {
        return this.props.onOk();
    }

    onClose() {
        return this.props.onClose();
    }

    buttonClick(action) {
        return this.props.buttonClick(action);
    }

    render() {
        if (!this.props.buttons) {
            return null;
        }

        const btns = [];

        this.props.buttons.forEach((btn, i) => {
            const url = (btn.url) ? btn.url : null;
            const key = i;

            if (typeof btn === 'string') {
                if (btn === 'ok') {
                    btns.push(<ActionButton className={`${this.props.btnClass} ${this.props.btnClass}--ok`} key={key} onClick={() => this.onOk()}>{this.props.defaultOk}</ActionButton>);
                } else if (btn === 'cancel') {
                    btns.push(<ActionButton className={`${this.props.btnClass} ${this.props.btnClass}--cancel`} key={key} onClick={() => this.onClose()}>{this.props.defaultCancel}</ActionButton>);
                }
            } else if (React.isValidElement(btn)) {
                btns.push(btn);
            } else {
                const className = `${this.props.btnClass} ${modifier(btn.className, this.props.btnClass)}`;
                const btnComponent = (
                    <ActionButton
                        className={className}
                        key={key}
                        url={url}
                        onClick={() => this.buttonClick(btn.action)}
                    >
                        {btn.text}
                    </ActionButton>
                );

                btns.push(btnComponent);
            }
        });

        return (
            <div className={this.props.className}>
                {btns}
            </div>
        );
    }
}

PopupFooterButtons.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ])),
    className: PropTypes.string,
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    buttonClick: PropTypes.func,
    btnClass: PropTypes.string,
    defaultOk: PropTypes.string,
    defaultCancel: PropTypes.string,
};
