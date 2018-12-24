import React, { Component } from 'react'
import { connect } from 'react-redux'
import { date } from '../AdditionalClasses/MyDate'
import { WEEK_DAYS_NAMES } from '../config'
import { Position } from '../AdditionalClasses/MyDate'
import { getMonthEvents } from '../actions/calendarActions'
import styles from '../styles/Calendar.module.css'
import Modal from '../Components/Modal'

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
      onClick={() => handleAction(day)()}
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

const ButtonContainer = ({ handleNext, handlePrev, title }) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.buttonContainer__button} onClick={handlePrev}>
        {'<'}
      </button>
      <div className={styles.buttonContainer__title}>{title}</div>
      <button className={styles.buttonContainer__button} onClick={handleNext}>
        {'>'}
      </button>
    </div>
  )
}

const CalendarContainer = ({ days, now, handleAction }) => {
  return (
    <div className={styles.daysContainer}>
      <ListOfWeeks />
      {days.map(day => (
        <Day
          key={date.key(day)}
          day={day}
          now={now}
          handleAction={handleAction}
        />
      ))}
    </div>
  )
}

class Calendar extends Component {
  state = Calendar.getInitialState()

  componentDidMount() {
    this.props.getMonthEvents(date.id(this.state))
  }

  static getInitialState = () => {
    const { month, year } = date.now()
    return {
      month,
      year,
      modalIsOpen: false,
      daysArray: [...date.generateCalendarForMonth({ month, year })],
    }
  }

  setNextMonth = () => {
    const nextMonth = date.nextMonth({ ...this.state })
    this.props.getMonthEvents(date.id(nextMonth))
    this.setState({
      ...nextMonth,
      daysArray: [...date.generateCalendarForMonth({ ...nextMonth })],
    })
  }
  setPrevMonth = () => {
    const prevMonth = date.prevMonth({ ...this.state })
    this.props.getMonthEvents(date.id(prevMonth))
    this.setState({
      ...prevMonth,
      daysArray: [...date.generateCalendarForMonth({ ...prevMonth })],
    })
  }

  toggleModalOpen = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    })
  }

  getActionByDayPosition = day => {
    const { position } = day
    if (position === Position.NEXT_POSITION) {
      return this.setNextMonth
    } else if (position === Position.PREV_POSITION) {
      return this.setPrevMonth
    } else {
      return this.toggleModalOpen
    }
  }

  mergeDaysWithEvents = (days, events) => {
    for (let i = 0; i < days.length; i++) {
      for (let j = 0; j < events.length; j++) {
        if (
          new Date(days[i].year, days[i].month, days[i].day).getTime() ===
          events[j].time
        ) {
          days[i].event = { ...events[j] }
        }
      }
    }
    return days
  }
  render() {
    const now = new Date()
    const { events, loading } = this.props.calendar
    const days = this.mergeDaysWithEvents(this.state.daysArray, events)
    return (
      <section className={styles.calendarWrapper}>
        {!loading ? (
          <>
            <ButtonContainer
              handleNext={this.setNextMonth}
              handlePrev={this.setPrevMonth}
              title={date.niceDate({ ...this.state })}
            />
            <CalendarContainer
              days={days}
              handleAction={this.getActionByDayPosition}
              now={now}
            />
            {this.state.modalIsOpen && (
              <Modal>
                <div onClick={this.toggleModalOpen}>Hello</div>
              </Modal>
            )}
          </>
        ) : (
          <div>Loading</div>
        )}
      </section>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar)
