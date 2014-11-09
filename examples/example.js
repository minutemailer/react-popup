/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react'),
    Popup = require('../index').Manager,
    PopupComponent = require('../index').Component,
    alert = document.getElementById('alert');

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