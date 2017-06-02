// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

'use strict';

// add the jquery
window.jQuery = window.$ = require('jquery');

// add system-tray
require('./js/system-tray.js');

// add the window menus
// just for testing purposes
require('./js/menus.js');

// add bootstrap scripts
require('./node_modules/bootstrap/dist/js/bootstrap.min.js');

// add vue and it's components
require('./js/vue-components/vue-components.js');


