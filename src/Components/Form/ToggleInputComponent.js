import React from 'react'
import styles from '../../styles/Modal.module.css'

const ToggleInputComponent = ({ name, text, setAction }) => {
  return (
    <>
      <div className={styles.form__label}>{name}</div>
      {text ? (
        <div className={styles.form__text}>{text}</div>
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

export default ToggleInputComponent
