import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from '../styles/App.module.css'
import { filterEventsBySearch } from '../actions/calendarActions'

const mapDispatchToProps = dispatch => ({
  filterEventsBySearch: search => dispatch(filterEventsBySearch(search)),
})

const mapStateToProps = state => {
  return {
    calendar: state.calendar,
  }
}

class Header extends Component {
  render() {
    return <header className={style.header} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
