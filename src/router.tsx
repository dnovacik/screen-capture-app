// libs
import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

// views
import Home from './views/Home'

export const MainRouter = () => {
  return (
    <HashRouter>
      <Route path="/" component={Home} exact />
    </HashRouter>
  )
}