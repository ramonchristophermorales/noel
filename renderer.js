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

// jexcel
require('./node_modules/jexcel/dist/js/excel-formula.min.js');
require('./node_modules/jexcel/dist/js/jquery.csv.min.js');
require('./node_modules/jexcel/dist/js/jquery.jcalendar.js');
require('./node_modules/jexcel/dist/js/jquery.jexcel.js');

// other helper functions
// require('./js/helpers.js');


// main script
require('./js/main.js');
