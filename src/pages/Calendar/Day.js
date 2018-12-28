import React from 'react'
import { date } from '../../AdditionalClasses/MyDate'
import styles from '../../styles/Calendar.module.css'

const Day = ({ day, handleAction, now }) => {
  return (
    <div
      onClick={() => handleAction(day)(day)}
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

export default Day
