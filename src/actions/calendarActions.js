import axios from 'axios'
import { API_ROUTE } from '../config'

import { hideModal } from './modalActions'

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

export const getMonthEvents = date => dispatch => {
  dispatch({
    type: Actions.GET_MONTH_EVENTS_REQUEST,
  })

  axios(`${API_ROUTE}/events/${date}`)
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

export const addMonthEvent = event => dispatch => {
  dispatch({
    type: Actions.ADD_MONTH_EVENT_REQUEST,
  })
  axios
    .post(`${API_ROUTE}/event`, {
      event,
    })
    .then(({ data }) => {
      dispatch(hideModal())
      dispatch({
        type: Actions.ADD_MONTH_EVENT_SUCCESS,
        payload: data.data,
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
    .put(`${API_ROUTE}/event/${id}`, {
      ...event,
    })
    .then(({ data }) => {
      dispatch(hideModal())
      dispatch({
        type: Actions.UPDATE_MONTH_EVENT_SUCCESS,
        payload: data.data,
      })
    })
    .catch(e => {
      dispatch({
        type: Actions.UPDATE_MONTH_EVENT_ERROR,
        payload: e,
      })
    })
}

export const getMonthEvent = id => dispatch => {
  dispatch({
    type: Actions.GET_MONTH_EVENT_REQUEST,
  })
  axios
    .get(`${API_ROUTE}/event/${id}`)
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

export const deleteMonthEvent = id => dispatch => {
  dispatch({
    type: Actions.DELETE_MONTH_EVENT_REQUEST,
  })
  axios
    .delete(`${API_ROUTE}/event/${id}`)
    .then(event => {
      dispatch(hideModal())
      dispatch({
        type: Actions.DELETE_MONTH_EVENT_SUCCESS,
        payload: id,
      })
    })
    .catch(e => {
      dispatch({
        type: Actions.DELETE_MONTH_EVENT_ERROR,
        payload: e,
      })
    })
}
