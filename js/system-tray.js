
/**
 * system-tray.js
 */

'use strict';

// electron instance
const electron = require('electron');

'use strict';

const {Tray, Menu} = require('electron').remote;

 const path = require('path');

 let trayIcon = new Tray(path.join('','./images/logo.jpg'));

const trayMenuTemplate = [
    {
        label: 'Settings',
        click: function() {
           window.location = 'html/settings.html';
        }
    },
    {
        label: 'About',
        click: function() {
           window.location = 'html/about.html';
        }
     },
    {
       label: 'Help',
       click: function () {
          console.log("Clicked on Help");
       }
    }
 ]
 let trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
 trayIcon.setContextMenu(trayMenu);
