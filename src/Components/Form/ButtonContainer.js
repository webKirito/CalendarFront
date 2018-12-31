import React from 'react'
import styles from '../../styles/Modal.module.css'

const ButtonContainer = ({
  day,
  event,
  dayIsCreated,
  addMonthEvent,
  deleteMonthEvent,
  updateMonthEvent,
}) => {
  return (
    <div className={styles.buttonContainer}>
      {dayIsCreated ? (
        <>
          <button
            className={styles.form__button}
            onClick={() => deleteMonthEvent(day.event._id)}
          >
            Delete
          </button>
          <button
            className={styles.form__button}
            onClick={() => updateMonthEvent(day.event._id, event())}
          >
            Update
          </button>
        </>
      ) : (
        <button
          className={styles.form__button}
          onClick={() => addMonthEvent(event())}
        >
          Add
        </button>
      )}
    </div>
  )
}

export default ButtonContainer
