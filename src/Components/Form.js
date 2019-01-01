import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/Modal.module.css'
import {
  updateMonthEvent,
  deleteMonthEvent,
  addMonthEvent,
} from '../actions/calendarActions'
import { hideModal } from '../actions/modalActions'
import ToggleInputComponent from './Form/ToggleInputComponent'
import ButtonContainer from './Form/ButtonContainer'
import TextArea from './Form/TextArea'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes)

const mapDispatchToProps = dispatch => ({
  updateMonthEvent: (id, event) => dispatch(updateMonthEvent(id, event)),
  deleteMonthEvent: id => dispatch(deleteMonthEvent(id)),
  addMonthEvent: event => dispatch(addMonthEvent(event)),
  hideModal: () => dispatch(hideModal()),
})

const mapStateToProps = state => {
  return {
    modal: state.modal,
  }
}

class Form extends Component {
  state = {
    description: '',
    participants: '',
    title: '',
  }

  setDescription = description => this.setState({ description })
  setTitle = title => this.setState({ title })
  setParticipants = participants => this.setState({ participants })

  getEvent = () => {
    const { day } = this.props.modal
    const { description, participants, title } = this.state
    return {
      description: description || day.description,
      participants: participants || day.participants,
      title: title || day.title,
      day: day.day,
      month: day.month,
      year: day.year,
    }
  }

  getPropOfObject = (obj, prop) => {
    return obj ? obj[prop] : ''
  }

  render() {
    const { day } = this.props.modal
    const dayIsCreated = day.event
    return (
      <div className={styles.form}>
        <div className={styles.form__header}>
          <div>{`Choosen: ${day.day}.${day.month + 1}.${day.year}`}</div>
          <FontAwesomeIcon
            className={styles.form__button}
            onClick={this.props.hideModal}
            icon={faTimes}
          />
        </div>
        <ToggleInputComponent
          name="Title:"
          text={this.getPropOfObject(day.event, 'title')}
          setAction={this.setTitle}
        />
        <ToggleInputComponent
          name="Participants:"
          text={this.getPropOfObject(day.event, 'participants')}
          setAction={this.setParticipants}
        />
        <TextArea
          setAction={this.setDescription}
          value={
            this.state.description ||
            this.getPropOfObject(day.event, 'description')
          }
        />
        <ButtonContainer
          day={day}
          dayIsCreated={dayIsCreated}
          event={this.getEvent}
          deleteMonthEvent={this.props.deleteMonthEvent}
          updateMonthEvent={this.props.updateMonthEvent}
          addMonthEvent={this.props.addMonthEvent}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form)
