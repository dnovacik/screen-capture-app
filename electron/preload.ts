import { contextBridge, ipcRenderer, desktopCapturer, remote } from 'electron'
import { writeFile } from 'fs'

contextBridge.exposeInMainWorld('ipcRenderer', {
  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    close: () => ipcRenderer.send('window:close')
  },
  getVideoSources: async () => await desktopCapturer.getSources({
    types: ['window', 'screen']
  }),
  writeFile: (path: string, buffer: Buffer) => writeFile(path, buffer, () => console.log('saved')),
  showSaveDialog: (label: string, defaultPath: string) => remote.dialog.showSaveDialog({ buttonLabel: label, defaultPath: defaultPath }),
  test: () => ipcRenderer.send('test')
})