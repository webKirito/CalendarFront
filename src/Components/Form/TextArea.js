import React from 'react'
import styles from '../../styles/Modal.module.css'

const TextArea = ({ value, setAction }) => {
  return (
    <>
      <div className={styles.form__label}>Description:</div>
      <textarea
        className={styles.form__descriptionInput}
        onChange={e => setAction(e.target.value)}
        value={value}
      />
    </>
  )
}

export default TextArea
