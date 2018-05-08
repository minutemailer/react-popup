import React from 'react';
import PropTypes from 'prop-types';

const PopupHeader = (props) => {
    if (!props.title) {
        return null;
    }

    return (
        <header className={props.className}>
            <h1 className={`${props.className}__title`}>{props.title}</h1>
        </header>
    );
};

PopupHeader.defaultProps = {
    title: null,
    className: null,
};

PopupHeader.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
};

export default PopupHeader;
