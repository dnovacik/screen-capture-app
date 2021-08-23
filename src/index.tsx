import React from 'react'
import ReactDOM from 'react-dom'
import Styled, { ThemeProvider } from 'styled-components'
import reportWebVitals from './reportWebVitals'

// theme
import theme from './styled/theme'

// components
import Navbar from './components/Navbar'

// style
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

// router
import { MainRouter } from './router'

const AppRoot = () => {
  return (
    <ThemeProvider theme={theme}>
      <App.Layout>
        <App.Header>
          <Navbar />
        </App.Header>
        <App.Body>
          <MainRouter />
        </App.Body>
      </App.Layout>
    </ThemeProvider>
  )
}

const App = {
  Layout: Styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  background-color: #282c34;
`,
  Header: Styled.div`
  display: flex;
  width: 100%;
  height: 35px;
  position: fixed;
  top: 0;
`,
  Body: Styled.div`
  display: flex;
  margin-top: 35px;
  flex: 1;
  height: 100%;
`,
}

ReactDOM.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
