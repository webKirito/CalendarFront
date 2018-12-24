import axios from 'axios'
import { API_ROUTE } from '../config'

export const Actions = {
  GET_MONTH_EVENTS_REQUEST: 'GET_MONTH_EVENTS_REQUEST',
  GET_MONTH_EVENTS_ERROR: 'GET_MONTH_EVENTS_ERROR',
  GET_MONTH_EVENTS_SUCCESS: 'GET_MONTH_EVENTS_SUCCESS',
  ADD_MONTH_EVENT_REQUEST: 'ADD_MONTH_EVENT_REQUEST',
  ADD_MONTH_EVENT_ERROR: 'ADD_MONTH_EVENT_ERROR',
  ADD_MONTH_EVENT_SUCCESS: 'ADD_MONTH_EVENT_SUCCESS',
  UPDATE_MONTH_EVENT_REQUEST: 'UPDATE_MONTH_EVENT_REQUEST',
  UPDATE_MONTH_EVENT_ERROR: 'UPDATE_MONTH_EVENT_ERROR',
  UPDATE_MONTH_EVENT_SUCCESS: 'UPDATE_MONTH_EVENT_SUCCESS',
  GET_MONTH_EVENT_REQUEST: 'GET_MONTH_EVENT_REQUEST',
  GET_MONTH_EVENT_ERROR: 'GET_MONTH_EVENT_ERROR',
  GET_MONTH_EVENT_SUCCESS: 'GET_MONTH_EVENT_SUCCESS',
  DELETE_MONTH_EVENT_REQUEST: 'DELETE_MONTH_EVENT_REQUEST',
  DELETE_MONTH_EVENT_ERROR: 'DELETE_MONTH_EVENT_ERROR',
  DELETE_MONTH_EVENT_SUCCESS: 'DELETE_MONTH_EVENT_SUCCESS',
  SEARCH_FOR_EVENT: 'SEARCH_FOR_EVENT',
}

const events = [
  {
    title: 'Asdfgjh yug gtugug ',
    partisipants: 'A',
    description: 'A',
    time: new Date(2018, 10, 12).getTime(),
  },
  {
    title: 'Byughlo;ojo ukjhiuuguv',
    partisipants: 'B',
    description: 'B',
    time: new Date(2018, 11, 12).getTime(),
  },
  {
    title: 'Ahgftuguyg',
    partisipants: 'A',
    description: 'A',
    time: new Date(2018, 11, 1).getTime(),
  },
]

export const getMonthEvents = id => dispatch => {
  dispatch({
    type: Actions.GET_MONTH_EVENTS_REQUEST,
  })

  axios(`${API_ROUTE}/${id}`)
    .then(({ data }) => {
      dispatch({
        type: Actions.GET_MONTH_EVENTS_SUCCESS,
        payload: data.data,
      })
    })
    .catch(e => {
      dispatch({
        type: Actions.GET_MONTH_EVENTS_ERROR,
        payload: e,
      })
    })
}

export const addMonthEvent = (id, event) => dispatch => {
  dispatch({
    type: Actions.ADD_MONTH_EVENT_REQUEST,
  })
  axios
    .post(`${API_ROUTE}/${id}/${event.dayTime}`, {
      event,
    })
    .then(event => {
      dispatch({
        type: Actions.ADD_MONTH_EVENT_SUCCESS,
        payload: event,
      })
    })
    .catch(e => {
      dispatch({
        type: Actions.ADD_MONTH_EVENT_ERROR,
        payload: e,
      })
    })
}

export const updateMonthEvent = (id, event) => dispatch => {
  dispatch({
    type: Actions.UPDATE_MONTH_EVENT_REQUEST,
  })
  axios
    .put(`${API_ROUTE}/${id}/${event.dayTime}`, {
      ...event,
    })
    .then(event => {
      dispatch({
        type: Actions.UPDATE_MONTH_EVENT_SUCCESS,
        payload: event,
      })
    })
    .catch(e => {
      dispatch({
        type: Actions.UPDATE_MONTH_EVENT_ERROR,
        payload: e,
      })
    })
}

export const getMonthEvent = (id, dayTime) => dispatch => {
  dispatch({
    type: Actions.GET_MONTH_EVENT_REQUEST,
  })
  axios
    .get(`${API_ROUTE}/${id}/${dayTime}`)
    .then(event => {
      dispatch({
        type: Actions.GET_MONTH_EVENT_SUCCESS,
        payload: event,
      })
    })
    .catch(e => {
      dispatch({
        type: Actions.GET_MONTH_EVENTS_ERROR,
        payload: e,
      })
    })
}

export const deleteMonthEvent = (id, dayTime) => dispatch => {
  dispatch({
    type: Actions.DELETE_MONTH_EVENT_REQUEST,
  })
  axios
    .get(`${API_ROUTE}/${id}/${dayTime}`)
    .then(event => {
      dispatch({
        type: Actions.DELETE_MONTH_EVENT_SUCCESS,
        payload: dayTime,
      })
    })
    .catch(e => {
      dispatch({
        type: Actions.DELETE_MONTH_EVENT_ERROR,
        payload: e,
      })
    })
}

export const filterEventsBySearch = search => ({
  type: Actions.SEARCH_FOR_EVENT,
  payload: search,
})
