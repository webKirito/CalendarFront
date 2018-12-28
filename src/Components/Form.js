import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/Modal.module.css'
import {
  updateMonthEvent,
  deleteMonthEvent,
  addMonthEvent,
} from '../actions/calendarActions'

const mapDispatchToProps = dispatch => ({
  updateMonthEvent: (id, event) => dispatch(updateMonthEvent(id, event)),
  deleteMonthEvent: id => dispatch(deleteMonthEvent(id)),
  addMonthEvent: event => dispatch(addMonthEvent(event)),
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
      description,
      participants,
      title,
      day: day.day,
      month: day.month,
      year: day.year,
    }
  }

  render() {
    const { day } = this.props.modal
    const isCreated = day.event

    return (
      <div className={styles.form}>
        <div>{`${day.day} ${day.month} ${day.year}`}</div>
        <button onClick={this.props.toggleModal}>Close</button>
        <div className={styles.form__label}>Title</div>
        <input
          className={styles.form__titleInput}
          onChange={e => this.setTitle(e.target.value)}
          type="text"
        />
        <div className={styles.form__label}>Participants</div>
        <input
          className={styles.form__participantsInput}
          onChange={e => this.setParticipants(e.target.value)}
          type="text"
        />
        <div className={styles.form__label}>Description</div>
        <textarea className={styles.form__descriptionInput} />
        {isCreated ? (
          <>
            <button onClick={() => this.props.deleteMonthEvent(day.event._id)}>
              Delete
            </button>
            <button>Update</button>
          </>
        ) : (
          <button onClick={() => this.props.addMonthEvent(this.getEvent())}>
            Post
          </button>
        )}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form)
