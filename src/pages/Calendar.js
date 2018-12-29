import React, { Component } from 'react'
import { connect } from 'react-redux'
import { date, Position } from '../AdditionalClasses/MyDate'
import { getMonthEvents } from '../actions/calendarActions'
import { setDay, hideModal } from '../actions/modalActions'
import styles from '../styles/Calendar.module.css'
import Modal from '../ReusableComponents/Modal'
import ButtonContainer from './Calendar/ButtonContainer'
import CalendarContainer from './Calendar/CalendarContainer'
import LoadingContainer from '../ReusableComponents/LoadingContainer'
import Form from '../Components/Form'

const mapStateToProps = state => {
  return {
    calendar: state.calendar,
    modal: state.modal,
  }
}
const mapDispatchToProps = dispatch => ({
  getMonthEvents: date => dispatch(getMonthEvents(date)),
  hideModal: () => dispatch(hideModal()),
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

  getActionByDayPosition = day => {
    const { position } = day
    if (position === Position.NEXT_POSITION) {
      return this.setNextMonth
    } else if (position === Position.PREV_POSITION) {
      return this.setPrevMonth
    } else {
      return day => this.props.setDay(day)
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
          {this.props.modal.active && (
            <Modal>
              <Form hideModal={this.props.hideModal} />
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
