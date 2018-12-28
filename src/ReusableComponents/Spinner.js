import React from 'react'
import styles from '../styles/App.module.css'

const Spinner = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__item}>
        <div className={styles.loader__item_part} />
        <div className={styles.loader__item_part} />
      </div>
    </div>
  )
}

export default Spinner
