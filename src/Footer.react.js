import React from 'react';
import PropTypes from 'prop-types';
import ButtonsSpace from './ButtonsSpace.react';

const Component = (props) => {
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
                wildClasses={props.wildClasses}
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
                wildClasses={props.wildClasses}
                btnClass={props.btnClass}
                defaultOk={props.defaultOk}
                defaultCancel={props.defaultCancel}
                buttons={props.buttons.right}
            />
        </footer>
    );
};

Component.displayName = 'PopupFooter';
Component.propTypes = {
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
    wildClasses: PropTypes.bool,
    btnClass: PropTypes.string,
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    buttonClick: PropTypes.func,
    defaultOk: PropTypes.string,
    defaultCancel: PropTypes.string,
};
Component.defaultProps = {
    buttons: null,
    className: null,
    wildClasses: false,
    btnClass: null,
    defaultOk: null,
    defaultCancel: null,
    buttonClick: () => {},
    onOk: () => {},
    onClose: () => {},
};

export default Component;
