export interface IIpcRenderer {
  window: {
    minimize: () => void
    close: () => void
  }
  test: () => void
}

declare global {
  interface Window {
    ipcRenderer: IIpcRenderer
  }
}