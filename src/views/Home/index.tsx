// libs
import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'

const { getVideoSources, writeFile, showSaveDialog, openMenu, getWindowProperties } = window.ipcRenderer

type DesktopCaptureSource = {
  display_id: string;
  id: string;
  name: string;
}

type RecordButtonsProps = {
  isRecording: boolean
}

let mediaRecorder: MediaRecorder

const HomeView = () => {
  const recording = Array<Blob>()
  const [sources, setSources] = useState<{ loaded: boolean, sources: Array<DesktopCaptureSource> }>({ loaded: false, sources: [] })
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    (async () => {
      const sources = await getVideoSources()

      setSources({
        loaded: true,
        sources: sources
      })
    })()
  }, [])

  const handleDataAvailable = (event: BlobEvent) => {
    recording.push(event.data)
  }

  const handleStop = async () => {
    const blob = new Blob(recording, {
      type: 'video/webm'
    })

    const buffer = Buffer.from(await blob.arrayBuffer())

    const { filePath } = await showSaveDialog('Save Recording', `capture-${Date.now()}.mp4`)

    if (filePath) {
      writeFile(filePath, buffer)
    }
  }

  const onSourceSelected = async (source: { id: string, name: string }) => {
    const CONSTRAINTS_SETTINGS = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id
        }
      }
    }

    const mediaDevices = navigator.mediaDevices as any
    const stream = await mediaDevices.getUserMedia(CONSTRAINTS_SETTINGS)

    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' })

    mediaRecorder.ondataavailable = handleDataAvailable
    mediaRecorder.onstop = handleStop
  }

  const startRecording = () => {
    setIsRecording(true)
    mediaRecorder.start()
  }

  const stopRecording = () => {
    setIsRecording(false)
    mediaRecorder.stop()
  }

  const displayMenu = () => {
    openMenu(sources.sources, onSourceSelected)
  }

  const handleRecordButtonClicked = async () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <Home.Layout>
      {
        sources.loaded
          ? <>
            <Home.Title>Screen Capture</Home.Title>
            <Home.Select onClick={() => displayMenu()}>Select Source</Home.Select>
            <Home.Record isRecording onClick={() => handleRecordButtonClicked()}>Record</Home.Record>
          </>
          : <>
            <Home.Loading>Loading...</Home.Loading>
          </>
      }
    </Home.Layout>
  )
}

const Home = {
  Layout: Styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  `,
  Loading: Styled.h2`
  display: flex;
  color: ${props => props.theme.colors.blue};
  width: 100%;
  justify-content: center;
  align-items: center;
  `,
  Title: Styled.h2`
  display: flex;
  color: ${props => props.theme.colors.blue};
  width: 100%;
  justify-content: center;
  `,
  Select: Styled.div`
  display: flex;
  `,
  Record: Styled.div<RecordButtonsProps>`
  display: flex;

  `
}

export default HomeView