import React from 'react';
import PropTypes from 'prop-types';

class PopupAction extends React.Component {
    static defaultProps = {
        onClick: () => {},
        className: 'btn',
        url: null,
    };

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

PopupAction.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    url: PropTypes.string,
};

export default PopupAction;
