'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Popup from './react-popup';
import Scroll from './ScrollManager';

let alertBtn               = document.getElementById('alert'),
    alertWithTitle         = document.getElementById('alertWithTitle'),
    registeredPopupTrigger = document.getElementById('registeredPopupTrigger'),
    customButtons          = document.getElementById('customButtons'),
    position               = document.getElementById('position'),
    prompt                 = document.getElementById('prompt');

/** Render popup */
ReactDom.render(
    <Popup closeHtml="×" />,
    document.getElementById('popupContainer')
);

function refreshPosition() {
    Popup.refreshPosition();
}

Popup.addCloseListener(function () {
    window.removeEventListener('scroll', refreshPosition);
});

/** Alert */
alertBtn.addEventListener('click', function () {
    Popup.alert("This is an example of a normal alert box. Pass some text with additional title or send an ID of an already created popup.");
    Popup.alert("All popups will be queued and when first in line, displayed.");
});

/** Alert with title */
alertWithTitle.addEventListener('click', function () {
    Popup.alert("The alert can also have a title. Isn't it nice?", 'Lorem ipsum');
});

/** Prompt */
prompt.addEventListener('click', function () {
    Popup.prompt('Type your name below', 'What\'s your name?', {
        placeholder: 'Placeholder yo',
        type: 'text'
    }, {
        text: 'Save',
        className: 'success',
        action: function (Box) {
            Popup.alert('You typed: ' + Box.value);
            Box.close();
        }
    });
});

/** Pre-register popup */
let mySpecialPopup = Popup.register({
    title: 'I am special',
    content: 'Since I am special you might need me again later. Save me!',
    buttons: {
        left: ['cancel'],
        right: ['ok']
    }
});

/** Display pre-registered popup */
registeredPopupTrigger.addEventListener('click', function () {
    Popup.queue(mySpecialPopup);
});

Popup.registerPlugin('popover', function (content, target) {
    this.create({
        content: content,
        className: 'popover',
        noOverlay: true,
        position: function (box) {
            var bodyRect      = document.body.getBoundingClientRect(),
                btnRect       = target.getBoundingClientRect(),
                btnOffsetTop  = btnRect.top - bodyRect.top,
                btnOffsetLeft = btnRect.left - bodyRect.left;

            box.style.top  = (btnOffsetTop - box.offsetHeight - 10) - Scroll.get() + 'px';
            box.style.left = (btnOffsetLeft + (target.offsetWidth / 2) - (box.offsetWidth / 2)) + 'px';
            box.style.margin = 0;
            box.style.opacity = 1;
        }
    });
});

/** Positioning */
position.addEventListener('click', function () {
    window.addEventListener('scroll', refreshPosition);
    Popup.plugins.popover('This popup will be displayed right above this button.', this);
});

/** Custom buttons */
customButtons.addEventListener('click', function () {
    Popup.create({
        title: null,
        content: 'This popup uses the create method directly to get more control. This popup demonstrates custom buttons.',
        buttons: {
            left: [{
                text: 'Cancel',
                className: 'danger',
                action: function () {
                    Popup.alert('You pressed the Cancel btn');

                    /** Close this popup. Close will always close the current visible one, if one is visible */
                    Popup.close();
                }
            }],
            right: [{
                text: 'Alt',
                action: function () {
                    Popup.alert('You pressed the Alt btn');

                    /** Close this popup. Close will always close the current visible one, if one is visible */
                    Popup.close();
                }
            }, {
                text: 'Save',
                className: 'success',
                action: function () {
                    Popup.alert('You pressed the Save btn');

                    /** Close this popup. Close will always close the current visible one, if one is visible */
                    Popup.close();
                }
            }]
        }
    });
});