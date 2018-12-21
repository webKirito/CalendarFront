import axios from 'axios'

export const Actions = {
  GET_MONTH_EVENTS_REQUEST: 'GET_MONTH_EVENTS_REQUEST',
  GET_MONTH_EVENTS_ERROR: 'GET_MONTH_EVENTS_ERROR',
  GET_MONTH_EVENTS_SUCCESS: 'GET_MONTH_EVENTS_SUCCESS',
}

const events = [
  {
    title: 'A',
    partisipants: 'A',
    description: 'A',
    time: new Date(2018, 10, 12).getTime(),
  },
  {
    title: 'B',
    partisipants: 'B',
    description: 'B',
    time: new Date(2018, 11, 12).getTime(),
  },
  {
    title: 'A',
    partisipants: 'A',
    description: 'A',
    time: new Date(2018, 11, 1).getTime(),
  },
]

export const getMonthEvents = date => dispatch => {
  dispatch({
    type: Actions.GET_MONTH_EVENTS_REQUEST,
  })
  setTimeout(() => {
    dispatch({
      type: Actions.GET_MONTH_EVENTS_SUCCESS,
      payload: events,
    })
  }, 1000)
}
