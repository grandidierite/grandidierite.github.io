// Global Javascript Initialization
var Global = function() {
    'use strict';

    // Handle Overlay
    var handleOverlay = function() {
        var overlay = $('.js__bg-overlay'),
            headerOverlay = $('.js__header-overlay'),
            trigger = $('.js__trigger');

        trigger.on('click', function() {
            overlay.toggleClass('-is-open');
            headerOverlay.toggleClass('-is-open');
            trigger.toggleClass('-is-active');
        });
    }

    return {
        init: function() {
            handleOverlay(); // initial setup for Overlay
        }
    }
}();

$(document).ready(function() {
    Global.init();

    $(window).scroll(function() {
        if ($(window).scrollTop() > 70) {
            $('.js__header-fixed').addClass('fixed-top');
        } else {
            $('.js__header-fixed').removeClass('fixed-top');
        }
    });
});
