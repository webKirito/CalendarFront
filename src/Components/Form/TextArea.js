import React from 'react'
import styles from '../../styles/Modal.module.css'
import { NUMBER_OF_ROWS_IN_TEXTAREA } from '../../config'

const TextArea = ({ value, setAction }) => {
  return (
    <>
      <div className={styles.form__label}>Description:</div>
      <textarea
        className={styles.form__descriptionInput}
        onChange={e => setAction(e.target.value)}
        rows={NUMBER_OF_ROWS_IN_TEXTAREA}
        value={value}
      />
    </>
  )
}

export default TextArea
