import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropdown from './Header/Dropdown'
import appStyle from '../styles/App.module.css'

const mapStateToProps = state => {
  return {
    calendar: state.calendar,
  }
}

class Header extends Component {
  render() {
    return (
      <header className={appStyle.header}>
        <Dropdown />
      </header>
    )
  }
}

export default connect(mapStateToProps)(Header)
