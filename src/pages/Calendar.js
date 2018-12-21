import React, { Component } from 'react'
import { connect } from 'react-redux'
import { date } from '../AdditionalClasses/MyDate'

function mapStateToProps(state) {
  return {}
}

class Calendar extends Component {
  state = {}
  render() {
    return <div />
  }
}

export default connect(mapStateToProps)(Calendar)
