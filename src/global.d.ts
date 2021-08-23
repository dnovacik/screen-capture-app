import { DesktopCapturerSource, SaveDialogReturnValue } from 'electron'

export interface IIpcRenderer {
  window: {
    minimize: () => void
    close: () => void
  },
  getVideoSources: () => Promise<Array<DesktopCapturerSource>>,
  writeFile: (path: string, buffer: Buffer) => void,
  showSaveDialog: (label: string, defaultPath: string) => Promise<SaveDialogReturnValue>,
  test: () => void
}

declare global {
  interface Window {
    ipcRenderer: IIpcRenderer
  }
}