// Modules to control application life and create native browser window
const {app, BrowserWindow, nativeImage, Menu, Notification, Tray} = require('electron')
const path = require('path')

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9Qz0AEYBxVSF+FAAhKDveksOjmAAAAAElFTkSuQmCC'),
    //icon: __dirname + '/icon.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools();

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit', click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'}
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  mainWindow.setMenu(menu);
}

let tray;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const notification = new Notification({title: "the title",body: "the awesome body"});
  notification.show();
  notification.on('click', (event, arg)=>{
    console.log("clicked")
  });

  const icon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9Qz0AEYBxVSF+FAAhKDveksOjmAAAAAElFTkSuQmCC');
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'always on top',
      type: 'checkbox',
      click: (v) => {
        mainWindow.setAlwaysOnTop(v.checked, 'screen');
      }
    },
    {type: 'separator'},
    {
      label: 'exit',
      click: () => {
        app.quit()
      }
    },
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
