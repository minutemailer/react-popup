/**
 * @jsx React.DOM
 */

'use strict';

var React                  = require('react'),
    Popup                  = require('../index').Manager,
    PopupComponent         = require('../index').Component,
    alert                  = document.getElementById('alert'),
    alertWithTitle         = document.getElementById('alertWithTitle'),
    registeredAlertTrigger = document.getElementById('registeredAlertTrigger'),
    registeredAlert;

/** React debug */
window.react = React;

/** Render popup */
React.render(
	<PopupComponent closeHtml="×" />,
	document.getElementById('popupContainer')
);

/** Alert */
alert.addEventListener('click', function () {
	Popup.alert("This is an example of a normal alert box. Pass some text with additional title or send an ID of an already created popup.");
	Popup.alert("All popups will be queued and when first in line, displayed.");
});

/** Alert with title */
alertWithTitle.addEventListener('click', function () {
	Popup.alert("The alert can also have a title. Isn't it nice?", 'Lorem ipsum');
});

/** Pre-register alert popup */
registeredAlert = Popup.alert('You can register popups for use later. Set the third parameter to true for no queue. All popup creations will generate an ID, use this ID to display the popup.', null, true);

/** Display pre-registered popup */
registeredAlertTrigger.addEventListener('click', function () {
	Popup.queue(registeredAlert);
});