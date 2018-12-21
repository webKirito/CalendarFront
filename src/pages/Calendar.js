import React, { Component } from 'react'
import { connect } from 'react-redux'
import { date } from '../AdditionalClasses/MyDate'
import { WEEK_DAYS_NAMES } from '../config'
import { Position } from '../AdditionalClasses/MyDate'
import { getMonthEvents } from '../actions/calendarActions'
import styles from '../styles/Calendar.module.css'

const mapStateToProps = state => {
  return {
    calendar: state.calendar,
  }
}
const mapDispatchToProps = dispatch => ({
  getMonthEvents: date => dispatch(getMonthEvents(date)),
})

const ListOfWeeks = () => {
  return (
    <>
      {WEEK_DAYS_NAMES.map(name => (
        <div key={name} className={styles.daysContainer__title}>
          {name}
        </div>
      ))}
    </>
  )
}

const Day = ({ day, handleAction, now }) => {
  return (
    <div
      onClick={handleAction}
      className={
        date.isToday({ ...day }, now)
          ? styles.daysContainer__day__isToday
          : styles.daysContainer__day
      }
      key={date.key(day)}
    >
      <div>{day.day}</div>
      {day.event && <div>{day.event.title}</div>}
    </div>
  )
}

class Calendar extends Component {
  state = Calendar.getInitialState()

  componentDidMount() {
    this.props.getMonthEvents()
  }

  static getInitialState = () => {
    const { month, year } = date.now()
    return {
      month,
      year,
      daysArray: [...date.generateCalendarForMonth({ month, year })],
    }
  }

  setNextMonth = () => {
    const nextMonth = date.nextMonth({ ...this.state })
    this.setState({
      ...nextMonth,
      daysArray: [...date.generateCalendarForMonth({ ...nextMonth })],
    })
  }
  setPrevMonth = () => {
    const prevMonth = date.prevMonth({ ...this.state })
    this.setState({
      ...prevMonth,
      daysArray: [...date.generateCalendarForMonth({ ...prevMonth })],
    })
  }

  getActionByDayPosition = day => {
    const { position } = day
    if (position === Position.NEXT_POSITION) {
      return this.setNextMonth
    } else if (position === Position.PREV_POSITION) {
      return this.setPrevMonth
    }
  }

  mergeDaysWithEvents = (days, events) => {
    for (let day of days) {
      for (let event of events) {
        if (new Date(day.year, day.month, day.day).getTime() === event.time) {
          day.event = { ...event }
        }
      }
    }
    return days
  }
  render() {
    const now = new Date()
    const { events, loading } = this.props.calendar
    const days = this.mergeDaysWithEvents(this.state.daysArray, events)
    console.log(days, events)
    return (
      <div>
        {!loading ? (
          <>
            <button onClick={this.setPrevMonth}>Previous</button>
            <span>{date.niceDate({ ...this.state })}</span>
            <button onClick={this.setNextMonth}>Next</button>
            <div className={styles.daysContainer}>
              <ListOfWeeks />
              {days.map(day => (
                <Day
                  day={day}
                  now={now}
                  handleAction={this.getActionByDayPosition(day)}
                />
              ))}
            </div>
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar)
