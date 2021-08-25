import { DesktopCapturerSource, SaveDialogReturnValue, Menu } from 'electron'

export interface IIpcRenderer {
  window: {
    minimize: () => void
    close: () => void
  },
  getVideoSources: () => Promise<Array<DesktopCapturerSource>>,
  writeFile: (path: string, buffer: Buffer) => void,
  showSaveDialog: (label: string, defaultPath: string) => Promise<SaveDialogReturnValue>,
  openMenu: (sources: Array<{ id: string, name: string }>, onSelected: (selected: { id: string, name: string }) => Promise<void>) => Electron.Menu,
  getWindowProperties: (id: string) => void,
  test: () => void
}

declare global {
  interface Window {
    ipcRenderer: IIpcRenderer
  }
}