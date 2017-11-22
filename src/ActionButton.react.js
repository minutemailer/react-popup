import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
    onClick: () => {},
    className: 'btn',
    url: null,
};

const propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    url: PropTypes.string,
};

class Component extends React.Component {
    handleClick() {
        return this.props.onClick();
    }

    render() {
        const { className } = this.props;

        if (this.props.url && this.props.url !== '#') {
            return (<a href={this.props.url} target="_blank" className={className}>{this.props.children}</a>);
        }

        return (
            <button onClick={() => this.handleClick()} className={className}>
                {this.props.children}
            </button>
        );
    }
}

Component.displayName = 'PopupAction';
Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

export default Component;
