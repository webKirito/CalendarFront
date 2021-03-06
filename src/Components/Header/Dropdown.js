import React, { Component } from 'react'
import { connect } from 'react-redux'
import headerStyle from '../../styles/Header.module.css'
import Event from './Event'

const mapStateToProps = state => {
  return {
    calendar: state.calendar,
  }
}

class Dropdown extends Component {
  state = {
    isOpened: false,
    eventsBySearch: this.props.calendar.events,
  }

  showList = () => {
    this.setState({ isOpened: true })
  }

  hideList = () => {
    this.setState({ isOpened: false })
  }

  searchElementsByMask = mask => {
    const maskLowerCase = mask.toLowerCase()
    const { events } = this.props.calendar
    const eventsBySearch = events.filter(event =>
      event.description
        ? event.description.toLowerCase().includes(maskLowerCase)
        : false ||
          event.title.toLowerCase().includes(maskLowerCase) ||
          event.participants.toLowerCase().includes(maskLowerCase),
    )
    this.setState({ eventsBySearch })
  }
  render() {
    return (
      <div className={headerStyle.inputContainer}>
        <input
          className={headerStyle.input}
          onFocus={this.showList}
          onBlur={this.hideList}
          onChange={e => this.searchElementsByMask(e.target.value)}
        />
        {this.state.isOpened && (
          <div className={headerStyle.listOfItems}>
            {this.state.eventsBySearch.map(event => (
              <Event key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Dropdown)
