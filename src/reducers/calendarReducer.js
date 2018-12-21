import { Actions } from '../actions/calendarActions'

const initialState = {
  events: [],
  error: '',
  loading: false,
}

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_MONTH_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case Actions.GET_MOUTH_EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case Actions.GET_MONTH_EVENTS_SUCCESS:
      return { ...state, loading: false, events: [...action.payload] }
    default:
      return state
  }
}

export default calendarReducer
