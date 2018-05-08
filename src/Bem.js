const element = (el, base) => `${base}__${el}`;

const modifier = (modifiers, base) => {
    if (!modifiers) {
        return null;
    }

    const finalClass = [];
    const classNames = modifiers.split(' ');

    classNames.forEach((singleClass) => {
        finalClass.push(`${base}--${singleClass}`);
    });

    return finalClass.join(' ');
};

export { modifier, element };
