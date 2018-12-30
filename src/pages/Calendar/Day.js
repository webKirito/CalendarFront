import React from 'react'
import { date } from '../../AdditionalClasses/MyDate'
import { MAX_TITLE_LENGTH_IN_DAY_CONTAINER } from '../../config'
import styles from '../../styles/Calendar.module.css'

const setStyle = (day, now) =>
  date.isToday({ ...day }, now)
    ? styles.daysContainer__day__isToday
    : styles.daysContainer__day

const validateTitle = ({ title }) => {
  return title.length > MAX_TITLE_LENGTH_IN_DAY_CONTAINER
    ? `${title.substr(0, MAX_TITLE_LENGTH_IN_DAY_CONTAINER)}...`
    : title
}

const Day = ({ day, handleAction, now }) => {
  return (
    <div className={setStyle(day, now)} key={date.key(day)}>
      <div className={styles.dayTitle} onClick={() => handleAction(day)(day)}>
        {day.day}
      </div>
      {day.event && <div>{validateTitle(day.event)}</div>}
    </div>
  )
}

export default Day
