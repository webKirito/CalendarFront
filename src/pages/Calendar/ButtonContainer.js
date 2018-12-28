import React from 'react'
import styles from '../../styles/Calendar.module.css'

const ButtonContainer = ({ handleNext, handlePrev, title }) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.buttonContainer__button} onClick={handlePrev}>
        {'<'}
      </button>
      <div className={styles.buttonContainer__title}>{title}</div>
      <button className={styles.buttonContainer__button} onClick={handleNext}>
        {'>'}
      </button>
    </div>
  )
}

export default ButtonContainer
