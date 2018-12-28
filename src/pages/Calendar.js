import React, { Component } from 'react'
import { connect } from 'react-redux'
import { date, Position } from '../AdditionalClasses/MyDate'
import { getMonthEvents } from '../actions/calendarActions'
import { setDay, clearDay } from '../actions/modalActions'
import styles from '../styles/Calendar.module.css'
import Modal from '../ReusableComponents/Modal'
import ButtonContainer from './Calendar/ButtonContainer'
import CalendarContainer from './Calendar/CalendarContainer'
import LoadingContainer from '../ReusableComponents/LoadingContainer'
import Form from '../Components/Form'

const mapStateToProps = state => {
  return {
    calendar: state.calendar,
  }
}
const mapDispatchToProps = dispatch => ({
  getMonthEvents: date => dispatch(getMonthEvents(date)),
  clearDay: () => dispatch(clearDay()),
  setDay: day => dispatch(setDay(day)),
})

class Calendar extends Component {
  state = Calendar.getInitialState()

  componentDidMount() {
    this.props.getMonthEvents(date.createId(this.state))
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
    this.props.getMonthEvents(date.createId(nextMonth))
    this.setState({
      ...nextMonth,
      daysArray: [...date.generateCalendarForMonth({ ...nextMonth })],
    })
  }
  setPrevMonth = () => {
    const prevMonth = date.prevMonth({ ...this.state })
    this.props.getMonthEvents(date.createId(prevMonth))
    this.setState({
      ...prevMonth,
      daysArray: [...date.generateCalendarForMonth({ ...prevMonth })],
    })
  }

  toggleModal = day => {
    if (this.state.modalIsOpen.modalIsOpen) {
      this.props.clearDay()
    } else {
      this.props.setDay(day)
    }
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
      return this.toggleModal
    }
  }

  mergeDaysWithEvents = (days, events) => {
    for (let i = 0; i < days.length; i++) {
      for (let j = 0; j < events.length; j++) {
        if (
          days[i].year === +events[j].year &&
          days[i].month === +events[j].month &&
          days[i].day === +events[j].day
        ) {
          days[i].event = { ...events[j] }
          break
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
        <LoadingContainer loading={loading}>
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
              <Form toggleModal={this.toggleModal} />
            </Modal>
          )}
        </LoadingContainer>
      </section>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar)
