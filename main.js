//#!/usr/local/bin/node

// Might be good to use an explicit path to node on the shebang line in case
// it isn't in PATH when launched by Chrome.

var fs = require('fs');
const electron = require('electron');
const path = require('path');
const url = require('url');
/*const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });*/

var logger = require("logger-electron");
logger = new logger({
    fileName: "ElectronNativeLogFile"
});
logger.enableLogging();
logger.log("First message Deepak jha electron application 11:59");

const { app, BrowserWindow, Menu, ipcMain } = electron;
/*
rl.on('line', function(line){
    logger.log('I have received this data:- ');
});*/
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
    logger.log('I have received this data:- '+chunk);
});

/*const electron = require('electron');
const path = require('path');
const url = require('url');
var nativeMessage = require('chrome-native-messaging');

//For message logging.
var logger = require("logger-electron");
logger = new logger({
    fileName: "ElectronNativeLogFile"
});
logger.enableLogging();
logger.log("First message Deepak jha electron application.");

//var log = require('electron-log');
const { app, BrowserWindow, Menu, ipcMain } = electron;

require('electron-debug')({showDevTools: true});

// This is the stream implementation.
process.stdin
    .pipe(new nativeMessage.Input())
    .pipe(new nativeMessage.Transform(function(msg, push, done) {
        //var reply = getReplyFor(msg); // Implemented elsewhere by you.
        logger.log("This message received from the internet"+JSON.stringify(msg));
        push({"response":"Sample retrun message"});                  // Push as many replies as you like.
        done();                       // Call when done pushing replies.
    }))
    .pipe(new nativeMessage.Output())
    .pipe(process.stdout)
;

//Get reply for input and output stream.
function getReplyFor(msg){
    return {"response":"Sample retrun message"};
}
*/
//Listen for app to be ready.
app.on('ready', function(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.on('closed', function(){
        app.quit();
    });
    
    mainMenuTemplate.push({
        label:'Dev Tools',
        submenu:[
            {
                label:'Toggle Dev Tools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

// Create menu template.
const mainMenuTemplate = [
    {
        label: 'file',
        submenu: [
            {
                label:'Send Message',
                click(){
                    sendMessageWindow();
                }
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q': 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

