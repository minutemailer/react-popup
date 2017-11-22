import React from 'react';
import PropTypes from 'prop-types';

const Component = (props) => {
    if (!props.title) {
        return null;
    }

    return (
        <header className={props.className}>
            <h1 className={`${props.className}__title`}>{props.title}</h1>
        </header>
    );
};

Component.displayName = 'PopupHeader';
Component.defaultProps = {
    title: null,
    className: null,
};
Component.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
};

export default Component;
