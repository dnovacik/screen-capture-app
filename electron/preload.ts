import { contextBridge, ipcRenderer, desktopCapturer, dialog } from 'electron'
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
  showSaveDialog: async (label: string, defaultPath: string) => await dialog.showSaveDialog({ buttonLabel: label, defaultPath: defaultPath }),
  test: () => ipcRenderer.send('test')
})