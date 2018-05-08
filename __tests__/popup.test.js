import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Popup from '../src/Popup.react';

test('Initialization works', (t) => {
    const component = shallow(<Popup className="popup" />);

    t.true(component.hasClass('popup'));
    t.is(component.find('.popup__overlay').length, 1);
});

test('Display and hide popup', (t) => {
    const component = shallow(<Popup className="popup" />);

    Popup.create({});
    component.update();

    t.is(component.find('.popup__box').length, 1);

    Popup.close();
    component.update();

    t.is(component.find('.popup__box').length, 0);
});
