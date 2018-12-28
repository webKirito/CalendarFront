import React from 'react'
import { WEEK_DAYS_NAMES } from '../../config'
import styles from '../../styles/Calendar.module.css'

const ListOfWeeks = () => {
  return (
    <>
      {WEEK_DAYS_NAMES.map(name => (
        <div key={name} className={styles.daysContainer__title}>
          {name}
        </div>
      ))}
    </>
  )
}

export default ListOfWeeks
