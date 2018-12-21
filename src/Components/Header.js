import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    calendar: state.calendar,
  }
}

const mapDispatchToProps = dispatch => ({})

class Header extends Component {
  render() {
    return <header>Hello!</header>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
