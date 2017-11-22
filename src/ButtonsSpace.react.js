import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton.react';

export default class ButtonsSpace extends React.Component {
    static displayName = 'PopupFooterButtons';

    static propTypes = {
        buttons: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ])),
        className: PropTypes.string,
        onOk: PropTypes.func,
        onClose: PropTypes.func,
        buttonClick: PropTypes.func,
        btnClass: PropTypes.string,
        wildClasses: PropTypes.bool,
        defaultOk: PropTypes.string,
        defaultCancel: PropTypes.string,
    };

    static defaultProps = {
        buttons: null,
        className: null,
        onOk: () => {},
        onClose: () => {},
        buttonClick: () => {},
        btnClass: null,
        wildClasses: false,
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
            } else {
                const className = `${this.props.btnClass} ${this.wildClass(btn.className, this.props.btnClass)}`;
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
