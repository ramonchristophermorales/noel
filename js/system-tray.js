
/**
 * system-tray.js
 */


'use strict';

// electron instance
const electron = require('electron');

const {Tray, Menu} = require('electron').remote;

 const path = require('path');

 let trayIcon = new Tray(path.join('','./images/logo.jpg'));

const trayMenuTemplate = [
    {
       label: 'Empty Application',
       enabled: false
    },
    {
       label: 'Settings',
       click: function () {
          console.log("Clicked on settings");
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
