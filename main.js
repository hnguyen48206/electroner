const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const { isMainThread, parentPort, workerData, threadId, MessageChannel, MessagePort, Worker } = require('worker_threads');

// import 'materialize-css';


//SET ENV --set enviroment so you can build exe file
// process.env.NODE_ENV = 'production';

let mainWindow;
let addwindow;
let workerWindow;
//listen for app ready
app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
        resizable: true,
        show: false,
        backgroundColor: '#2e2c29',
        // The lines below solved the issue
        webPreferences: {
            preload: path.join(__dirname, 'logicOfMainWindow.js')
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
    mainWindow.on('close', function () {
        app.quit();
    })
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainmenuTemplate)
    //Insert menu
    Menu.setApplicationMenu(mainMenu);

    //hidden window for printing
    workerWindow = new BrowserWindow();
    workerWindow.loadURL("file://" + __dirname + "/printerWindow.html");
    workerWindow.hide();
})

ipcMain.on("startStreaming", function (event, url) {
    console.log(url)
    tester(url)
})

async function tester(url)
{
    const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();
    await ffmpeg.run('-re', '-i', url, '-vcodec', 'libx264', '-acodec', 'copy', '-f', 'hls', '-hls_list_size', '3', '-hls_wrap', '5', 'playlist.m3u8');
    // ffmpeg.exit(0);
}

// retransmit it to workerWindow
ipcMain.on("printPDF", function (event, content) {
    workerWindow.webContents.send("printPDF", content);
});

// when worker window is ready
ipcMain.on("readyToPrintPDF", (event) => {
    workerWindow.webContents.print({ silent: true });
})

//catch global data sending from all windows theough ipcrenderer
ipcMain.on('item:add', function (e, item) {
    console.log(item)
    mainWindow.webContents.send('item:add', item);
    addwindow.close();
})

//create menu template
const mainmenuTemplate =
    [
        {
            label: "Hoang",
            submenu: [
                {
                    label: "Thêm item",
                    click() {
                        createAddWindow();
                    }
                },
                {
                    label: "Xóa item",
                    click() {
                        mainWindow.webContents.send('item:clear');
                    }
                },
                {
                    label: "Thoát",
                    accelerator: process.platform == 'win32' ? 'Ctrl+Q' : 'Command+Q',
                    click() {
                        app.quit();
                    }
                }
            ]
        }
    ];

//create sub windows
function createAddWindow() {
    addwindow = new BrowserWindow({
        width: 300,
        height: 200
    });
    addwindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    //clear garbage
    addwindow.on('close', function () {
        addwindow = null
    }
    );
}

//add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
    mainmenuTemplate.push(
        {
            label: 'Debug Phát triển',
            accelerator: process.platform == 'win32' ? 'F12' : 'F12',
            submenu: [
                {
                    label: "Mở tool",
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        }
    )
}