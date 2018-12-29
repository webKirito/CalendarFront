import React from 'react'
import { date } from '../../AdditionalClasses/MyDate'
import styles from '../../styles/Calendar.module.css'
import ListOfWeeks from './ListOfWeeks'
import Day from './Day'

const CalendarContainer = ({ days, now, handleAction }) => {
  console.log(days)
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

export default CalendarContainer
