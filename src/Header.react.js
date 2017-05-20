import React from 'react';

const defaultProps = {
    title: null,
    className: null,
};

class Component extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.title) {
            return (
                <header className={this.props.className}>
                    <h1 className={this.props.className + '__title'}>{this.props.title}</h1>
                </header>
            );
        }

        return null;
    }

}

Component.displayName = 'PopupHeader';
Component.defaultProps = defaultProps;

export default Component;
