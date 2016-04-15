'use strict';

module.exports = {

    get: function () {
        return document.documentElement.scrollTop || document.body.scrollTop;
    },

    to: function (value) {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
    },

    deactivate: function () {
        var content   = document.querySelector('.container'),
            parent    = content.parentNode,
            scrollTop = this.get();

        /* Stop scroll */
        setTimeout(function () {
            parent.style.overflow    = 'hidden';
            content.style.top  = (-scrollTop) + 'px';
            content.style.left = '50%';

            content.style.position = 'fixed';
            content.style.marginLeft = -(content.getBoundingClientRect().width / 2) + 'px';
        }, 50);
    },

    activate: function () {
        var content   = document.querySelector('.container'),
            parent    = content.parentNode,
            scrollTop = content.style.top;

        content.style.position   = 'static';
        content.style.top        = 0;
        content.style.marginLeft = 'auto';
        parent.style.overflow    = 'visible';

        this.to(Math.abs(parseInt(scrollTop, 10)));
    }

};