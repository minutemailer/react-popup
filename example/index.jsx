import React from 'react';
import { render } from 'react-dom';
import Popup from '../src';
import '../style.css';

render(
    <Popup />,
    document.querySelector('#root'),
);

Popup.create({
    title: 'Hello World!',
    content: (
        <div>
            It takes more than just a good looking body. You've got to have the heart and soul to go with it.
        </div>
    ),
    className: 'alert',
    buttons: {
        left: ['cancel'],
        right: [{
            text: 'Ok!',
            className: 'success',
            action: Popup.close
        }]
    },
});
