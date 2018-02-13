import React from 'react';
import { render } from 'react-dom';
import Popup from '../src';
import '../style.css';

render(
    <Popup />,
    document.querySelector('#root'),
);

Popup.create({
    title: 'test',
    content: (
        <div>
            Hello world!
        </div>
    ),
    className: 'alert',
    buttons: {
        right: [
            {
                text: 'Cancel',
                className: 'danger',
                action: Popup.close,
            },
        ],
    },
});
