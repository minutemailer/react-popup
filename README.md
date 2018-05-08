<p align="center">
  <img src="http://minutemailer.github.io/react-popup/logo.png" alt="React Popup" />
</p>


<p align="center">
    <a href="https://www.npmjs.com/package/react-popup">
        <img src="https://camo.githubusercontent.com/5e686c4eb8e3c65a53788a9de5d9f100cb803238/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f72656163742d706f7075702e7376673f6d61784167653d3836343030" alt="npm" data-canonical-src="https://img.shields.io/npm/v/react-popup.svg?maxAge=86400" style="max-width:100%;" />
    </a>
    <a href="https://www.npmjs.com/package/react-popup">
        <img src="https://img.shields.io/npm/dm/react-popup.svg?maxAge=86400" alt="npm" style="max-width:100%;" />
    </a>
    <a href="https://www.npmjs.com/package/react-popup">
        <img src="https://camo.githubusercontent.com/99c9f0ca43fd6c2dd1c956ffc1cb48c74aa2e88d/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f72656163742d706f7075702e7376673f6d61784167653d3836343030" alt="npm" data-canonical-src="https://img.shields.io/npm/l/react-popup.svg?maxAge=86400" style="max-width:100%;" />
    </a>
</p>

<p align="center">
    Simple and powerful react popup component. <br>Part of <a href="https://minutemailer.com">Minutemailer.com</a> - Marketing Simplified
</p>
<p>&nbsp;</p>

## Breaking changes in 0.9.x

The popup and overlay is now two separate layers to allow more customization. See [demo css](https://github.com/minutemailer/react-popup/blob/gh-pages/popup.example.css) for styling example.

## Global API approach

The idea behind `react-popup` is to use it as a drop-in replacement for the native `window.alert`. With the similarity of only displaying one popup at a time. This is why we use a global API to control the component instead of rendering it inside components. Maybe this is an anti-pattern, maybe it's not. Feel free to discuss it by opening an issue if one doesn't already exist.

## Install

Install it with npm (or yarn) (`npm install react-popup --save`). The component is API driven and means that you only render it once, on a global level. Here's a simple example:

```jsx
import React from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

ReactDom.render(
    <Popup />,
    document.getElementById('popupContainer')
);

Popup.alert('Hello');
```

## Documentation

Documentation and demo can be found here: http://minutemailer.github.io/react-popup/

<p>&nbsp;</p>
<p align="center">
<a href="https://minutemailer.com"><img src="http://minutemailerlive.s3.amazonaws.com/Minutemailer-blue-RGB.svg" width="400" alt="Minutemailer"></a>
</p>
