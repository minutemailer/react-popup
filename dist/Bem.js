"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifier = exports.element = void 0;

var element = function element(el, base) {
  return "".concat(base, "__").concat(el);
};

exports.element = element;

var modifier = function modifier(modifiers, base) {
  if (!modifiers) {
    return null;
  }

  var finalClass = [];
  var classNames = modifiers.split(' ');
  classNames.forEach(function (singleClass) {
    finalClass.push("".concat(base, "--").concat(singleClass));
  });
  return finalClass.join(' ');
};

exports.modifier = modifier;