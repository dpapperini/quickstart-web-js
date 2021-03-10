window._ = require('lodash');

try {
    window.$ = window.jQuery = require('jquery');
    // window.Popper = require('popper.js').default;
    // window.bootstrapDatepicker = require('bootstrap-datepicker');
    // window.bootstrapDatepickerLanguage = require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.it.min');
    // window.tinySlider = require('tiny-slider/src/tiny-slider');

    // require('bootstrap');
} catch (e) {}

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';