[![npm](https://img.shields.io/npm/v/react-popup.svg?maxAge=2592000)](https://www.npmjs.com/package/react-popup) [![npm](https://img.shields.io/npm/dt/react-popup.svg?maxAge=2592000)](https://www.npmjs.com/package/react-popup)  [![npm](https://img.shields.io/npm/l/react-popup.svg?maxAge=2592000)](https://www.npmjs.com/package/react-popup)

React popup component
===========

Simple and powerful react popup component. Part of [Minutemailer.com](https://minutemailer.com) - Marketing Simplified

[Demo](http://minutemailer.github.io/react-popup/)

## Breaking changes in v0.7.0
The helper method `Popup.prompt` has been removed. With the new plugin system, it made more sense to have the prompt as a plugin. Please refer to the demo page for an example of how you can implement it the recommended way.

## Install

For now this component is only available as a CommonJS module. Install it with npm (`npm install react-popup --save`). The module exports a react component with static methods. Here's a simple example:

```js
import React from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

ReactDom.render(
    <Popup />,
    document.getElementById('popupContainer')
);
```

## Configuration

You configure the popup by passing properties to the component. Available options are:

```jsx
<Popup
    className="mm-popup"
    btnClass="mm-popup__btn"
    closeBtn={true}
    closeHtml={null}
    defaultOk="Ok"
    defaultCancel="Cancel"
    wildClasses={false}
    closeOnOutsideClick={true} />
```

Above are defaults and for the popup to work you don't have to change anything. If `wildClasses` is set to `false` all classes will be added as BEM style modifiers. If set to `true` you have complete freedom and the class will be displayed exactly as you defined it. Look at this example:

```js
Popup.create({
    className: 'prompt'
});
```

The above popup would have the class `mm-popup__box--prompt` if `wildClasses` is false and if true, it would just be `prompt`. The same goes for button classes.

## Usage

Using the popup is very simple. Only one popup can be visible at the same time and if a popup is created when another is visible, it will be added to the queue. When a popup closes, the next popup in the queue will be display. To get started, here's a simple example:

```js
Popup.alert('Hello, look at me');
```

The code above will display a popup with the text "Hello, look at me" and an "Ok" button that closes the popup. The `alert` method is just an alias for this:

```js
Popup.create({
    title: null,
    content: 'Hello, look at me',
    className: 'alert',
    buttons: {
        right: ['ok']
    }
});
```

### Popup options

To create a popup, you have two methods you can use: `create` and `register`. The `create` method automatically puts the new popup in the queue and the `register` method just creates a popup for later use. All popup creations return an ID. More on how to use the ID further down. Now, all available options are:

```js
{
    title: null, // or string
    content: 'text', // or a react component (to set html you have to use a component, the string will be escaped)
    buttons: {
        left: [{}, ...],
        right: [{}, ...]
    },
    className: null, // or string
    noOverlay: true, // hide overlay layer (default is false, overlay visible)
    position: {x: 0, y: 0}, // or a function, more on this further down
    closeOnOutsideClick: true // Should a click outside the popup close it? (default is closeOnOutsideClick property on the component)
}
```

#### Buttons

The popup supports two arrays of buttons, left and right. These just renders two divs with corresponding classes, how you style it is up to you. A button requires the following properties:

```js
{
    text: 'My button text',
    className: 'special-btn', // optional
    action: function (popup) {
        // do stuff
        popup.close();
    }
}
```

You can also use the default buttons: `ok` and `cancel`. These uses the "defaultOk" and "defaultCancel" texts and the action function just closes the popup. Great for simple alerts. Use them like this:

```js
buttons: {
    left: ['cancel'],
    right: ['ok']
}
```

#### Position

The position property is useful to display a popup in another position, like next to the trigger. The easy use is to just set an object with x and y values: `{x: 100, y: 200}`. The more advanced option is to use a function. When using a function you will be given the DOM node of the popup box, what you do with it is up to you. One thing to have in mind is that, when rendered, the popup has the styling `opacity: 0`. This is to give you a chance to know the popup dimensions when you position the element. The popup box will automatically be visible if you do not use positioning or if you use an object, but when using a function you need to do it yourself. Here's a simple example to display the popup centered above a button:

```js
const trigger = document.getElementById('trigger');

trigger.addEventListener('click', function (e) {
    e.preventDefault();

    Popup.create({
        content: 'This popup will be displayed right above this button.',
        buttons: {
            right: ['ok']
        },
        noOverlay: true, // Make it look like a tooltip
        position: (box) => {
            const bodyRect      = document.body.getBoundingClientRect();
            const btnRect       = trigger.getBoundingClientRect();
            const btnOffsetTop  = btnRect.top - bodyRect.top;
            const btnOffsetLeft = btnRect.left - bodyRect.left;
            const scroll        = document.documentElement.scrollTop || document.body.scrollTop;

            box.style.top  = (btnOffsetTop - box.offsetHeight - 10) - scroll + 'px';
            box.style.left = (btnOffsetLeft + (target.offsetWidth / 2) - (box.offsetWidth / 2)) + 'px';
            box.style.margin = 0;
            box.style.opacity = 1;
        }
    });
});
```

#### Clear queue

Sometimes you might want to wipe the popup queue completely, making sure no more popups will be displayed after you close the current one.
To do this, just call `Popup.clearQueue()`. Remember that this will only clear the queue, you have to close the currently visible popup yourself (`Popup.close()`).
  
---
  
<a style="display: block; text-align: center" href="https://minutemailer.com"><img src="https://minutemailer.com/assets/svg/minutemailer-logo.svg" width="400" alt="Minutemailer"></a>
