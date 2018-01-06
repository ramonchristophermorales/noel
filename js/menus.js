/**
 * menus.js
 */

'use strict';

const {app, BrowserWindow, Menu, MenuItem} = require('electron').remote;
const url = require('url');
const path = require('path');

let win;

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600})
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

const template = [
	 {
      label: 'Navigation',
      submenu: [
         {
            label: 'Home',
            click: function() {
               window.location = '../index.html';
            }
         },
        {
            label: 'Settings',
            click: function() {
               window.location = 'html/settings.html';
            }
         },
         {
            role: 'toggledevtools'
         },
         {
            role: 'quit'
         },
      ]
   },
   // {
   //    label: 'Edit',
   //    submenu: [
   //       {
   //          role: 'undo'
   //       },
   //       {
   //          role: 'redo'
   //       },
   //       {
   //          type: 'separator'
   //       },
   //       {
   //          role: 'cut'
   //       },
   //       {
   //          role: 'copy'
   //       },
   //       {
   //          role: 'paste'
   //       }
   //    ]
   // },
   // {
   //    label: 'View',
   //    submenu: [
   //       {
   //          role: 'reload'
   //       },
   //       {
   //          role: 'toggledevtools'
   //       },
   //       {
   //          type: 'separator'
   //       },
   //       {
   //          role: 'resetzoom'
   //       },
   //       {
   //          role: 'zoomin'
   //       },
   //       {
   //          role: 'zoomout'
   //       },
   //       {
   //          type: 'separator'
   //       },
   //       {
   //          role: 'togglefullscreen'
   //       }
   //    ]
   // },
   // {
   //    role: 'window',
   //    submenu: [
   //       {
   //          role: 'minimize'
   //       },
   //       {
   //          role: 'close'
   //       }
   //    ]
   // },
   {
      role: 'help',
      submenu: [
         {
            label: 'About',
            click: function() {
               window.location = 'html/about.html';
            }
         }
      ]
   }
]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);