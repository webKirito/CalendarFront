import React from 'react'

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
    <button onClick={() => addMonthEvent(event())}>Add</button>
  )
}

export default ButtonContainer
