import { contextBridge, ipcRenderer, desktopCapturer, remote, DesktopCapturerSource } from 'electron'
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
  showSaveDialog: (label: string, defaultPath: string) => remote.dialog.showSaveDialog({ buttonLabel: label, defaultPath: defaultPath, filters: [{ name: 'mp4 file', extensions: ['mp4'] }] }),
  openMenu: (sources: Array<{ id: string, name: string }>, onSelected: (selected: { id: string, name: string }) => Promise<void>) => {
    const menu = remote.Menu.buildFromTemplate(
      sources.map(source => {
        return {
          label: source.name,
          click: () => onSelected(source)
        }
      })
    )

    menu.popup()
  }
  ,
  test: () => ipcRenderer.send('test')
})