import React from 'react';
import PropTypes from 'prop-types';
import ButtonsSpace from './ButtonsSpace.react';

const PopupFooter = (props) => {
    if (!props.buttons) {
        return null;
    }

    return (
        <footer className={props.className}>
            <ButtonsSpace
                buttonClick={props.buttonClick}
                onOk={props.onOk}
                onClose={props.onClose}
                className={`${props.className}__left-space`}
                btnClass={props.btnClass}
                defaultOk={props.defaultOk}
                defaultCancel={props.defaultCancel}
                buttons={props.buttons.left}
            />

            <ButtonsSpace
                buttonClick={props.buttonClick}
                onOk={props.onOk}
                onClose={props.onClose}
                className={`${props.className}__right-space`}
                btnClass={props.btnClass}
                defaultOk={props.defaultOk}
                defaultCancel={props.defaultCancel}
                buttons={props.buttons.right}
            />
        </footer>
    );
};

PopupFooter.propTypes = {
    buttons: PropTypes.shape({
        left: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ])),
        right: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ])),
    }),
    className: PropTypes.string,
    btnClass: PropTypes.string,
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    buttonClick: PropTypes.func,
    defaultOk: PropTypes.string,
    defaultCancel: PropTypes.string,
};

PopupFooter.defaultProps = {
    buttons: null,
    className: null,
    btnClass: null,
    defaultOk: null,
    defaultCancel: null,
    buttonClick: () => {},
    onOk: () => {},
    onClose: () => {},
};

export default PopupFooter;
