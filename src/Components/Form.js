import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/Modal.module.css'
import {
  updateMonthEvent,
  deleteMonthEvent,
  addMonthEvent,
} from '../actions/calendarActions'
import { hideModal } from '../actions/modalActions'

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

const ToggleInputComponent = ({ name, text, setAction }) => {
  return (
    <>
      <div className={styles.form__label}>{name}</div>
      {text ? (
        <div className={styles.form__label}>{text}</div>
      ) : (
        <input
          className={styles.form__titleInput}
          onChange={e => setAction(e.target.value)}
          type="text"
        />
      )}
    </>
  )
}

const TextArea = ({ value, setAction }) => {
  return (
    <>
      <div className={styles.form__label}>Description</div>
      <textarea
        className={styles.form__descriptionInput}
        onChange={e => setAction(e.target.value)}
        value={value}
      />
    </>
  )
}

const ButtonContainer = ({
  day,
  event,
  dayIsCreated,
  addMonthEvent,
  deleteMonthEvent,
  updateMonthEvent,
}) => {
  return dayIsCreated ? (
    <>
      <button onClick={() => deleteMonthEvent(day.event._id)}>Delete</button>
      <button onClick={() => updateMonthEvent(day.event._id, event())}>
        Update
      </button>
    </>
  ) : (
    <button onClick={() => addMonthEvent(event())}>Post</button>
  )
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
        <div>{`${day.day} ${day.month} ${day.year}`}</div>
        <button onClick={this.props.hideModal}>Close</button>
        <ToggleInputComponent
          name="Title"
          text={this.getPropOfObject(day.event, 'title')}
          setAction={this.setTitle}
        />
        <ToggleInputComponent
          name="Participants"
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
