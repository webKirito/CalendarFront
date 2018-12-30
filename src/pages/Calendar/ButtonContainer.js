import React from 'react'
import styles from '../../styles/Calendar.module.css'
//Initilize font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

library.add(faChevronLeft, faChevronRight)

const ButtonContainer = ({ handleNext, handlePrev, title }) => {
  return (
    <div className={styles.buttonContainer}>
      <FontAwesomeIcon
        className={styles.buttonContainer__button}
        icon={faChevronLeft}
        onClick={handlePrev}
      />
      <div className={styles.buttonContainer__title}>{title}</div>
      <FontAwesomeIcon
        className={styles.buttonContainer__button}
        icon={faChevronRight}
        onClick={handleNext}
      />
    </div>
  )
}

export default ButtonContainer
