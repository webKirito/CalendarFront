import React from 'react'
import headerStyle from '../../styles/Header.module.css'

const Event = ({ event }) => {
  return (
    <div className={headerStyle.listOfItems__item}>
      <div className={headerStyle.item__label}>Date:</div>
      <div className={headerStyle.item__text}>
        {event.day}.{event.month + 1}.{event.year}
      </div>
      <div className={headerStyle.item__label}>Title:</div>
      <div className={headerStyle.item__text}>{event.title}</div>
      <div className={headerStyle.item__label}>Participants:</div>
      <div className={headerStyle.item__text}>{event.participants}</div>
    </div>
  )
}

export default Event
