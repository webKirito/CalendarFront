import React, { Component } from 'react'
//Header with routing
import Header from './Components/Header'
//Router
import Main from './Components/Main'
//Initial styles
import './styles/reset.css'
import './styles/webkit.config.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    )
  }
}

export default App
