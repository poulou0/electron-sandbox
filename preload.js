const { contextBridge, ipcRenderer, BrowserWindow } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('env', {
  username: process.env.USERNAME,
})

contextBridge.exposeInMainWorld('toolkit', {
  //inter-process communication (IPC)
  ping: () => ipcRenderer.invoke('ping'),
})
