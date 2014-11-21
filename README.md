React popup component
===========

Button example styles from https://github.com/hakimel/Ladda

## Install

For now this component is only available as a CommonJS module and is for the moment not available on npm or any other package manager. So to install, just drop this folder in your project and require it. The module exports a "Manager" and a React Component. Here's a simple example:

    var popup          = require('./react-popup').Manager,
        PopupComponent = require('./react-popup').Component

    React.render(
    	<PopupComponent />,
    	document.getElementById('popupContainer')
    );

    popup.alert('This is an alert popup');

## Configuration

You configure the popup by passing properties to the component. Available options are:

    <PopupComponent
        className="mm-popup"
        btnClass="mm-popup__btn"
        closeBtn={true}
        closeHtml={null}
        defaultOk="Ok"
        defaultCancel="Cancel" />

Above are defaults and for the popup to work you don't have to change anything.

## Usage

Using the popup is very simple. Only one popup can be visible at the same time and if a popup is created when another is visible, it will be put on in a queue. When a popup closes, the next popup in the queue will be display. To get started, here's a simple example:

    popup.alert('Hello, look at me');

The code above will display a popup with the text "Hello, look at me" and an "Ok" button that closes the popup. The `alert` method is just an alias for this:

    popup.create({
    	title: null,
    	content: 'Hello, look at me',
    	className: 'mm-popup--alert',
    	buttons: {
    		right: ['ok']
    	}
    });

### Popup options

To create a popup you have to methods you can use: `create` and `register`. The `create` method automatically puts the new popup in the queue and the `register` method just creates a popup for later use. All popup creations returns an ID. More on how to use the ID further down. Now, all available options are:

    {
    	title: null, // or string
    	content: 'text', // or a react component (to set html you have to use a component, the string will be escaped)
    	buttons: {
    		left: [{}, ...],
    		right: [{}, ...]
    	},
    	className: null, // or string
    	noOverlay: true, // hide overlay layer (default is false, overlay visible)
    	position: {x: 0, y: 0} // or a function, more on this further down
    }

#### Buttons

The popup supports two arrays of buttons, left and right. These just renders two divs with corresponding classes, how you style it is up to you. A button requires the following properties:

    {
    	text: 'My button text',
    	className: 'special-btn', // optional
    	action: function (popup) {
    		// do stuff
    		popup.close();
    	}
    }

You can also use the default buttons: `ok` and `cancel`. These uses the "defaultOk" and "defaultCancel" texts and the action function just closes the popup. Great for simple alerts. Use them like this:

    buttons: {
    	left: ['cancel'],
    	right: ['ok']
    }

#### Position

The position property is useful the display a popup in another position, like next to the trigger. The easy use is to just set an object with x and y values: `{x: 100, y: 200}`. The more advance options is to use a function. When using a function you will be given the DOM node of the popup box, what you do with it is up to you. One thing to have in mind is that, when rendered, the popup has the styling `opacity: 0`. This is to give you a chance to know the popup dimensions when you position the element. The popup box will automatically be visible if you do not use positioning or if you use an object, but when using a function you need to do it your self. Here's a simple example to display the popup centered above a button:

    var trigger = document.getElementById('trigger');

    trigger.addEventListener('click', function (e) {
    	e.preventDefault();

    	var _this = this;

    	Popup.create({
			content: 'This popup will be displayed right above this button.',
			buttons: {
				right: ['ok']
			},
			noOverlay: true, // Make it look like a tooltip
			position: function (box) {
				var bodyRect      = document.body.getBoundingClientRect(),
				    btnRect       = _this.getBoundingClientRect(),
				    btnOffsetTop  = btnRect.top - bodyRect.top,
				    btnOffsetLeft = btnRect.left - bodyRect.left;

				box.style.top  = (btnOffsetTop - box.offsetHeight - 10) + 'px';
				box.style.left = (btnOffsetLeft + (_this.offsetWidth / 2) - (box.offsetWidth / 2)) + 'px';
				box.style.margin = 0;
				box.style.opacity = 1;
			}
		});
    });