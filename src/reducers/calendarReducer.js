import { Actions } from '../actions/calendarActions'

const initialState = {
  events: [],
  error: '',
  choosenEvent: {},
  loading: false,
}

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_MONTH_EVENTS_REQUEST:
    case Actions.GET_MONTH_EVENT_REQUEST:
    case Actions.DELETE_MONTH_EVENT_REQUEST:
    case Actions.UPDATE_MONTH_EVENT_REQUEST:
    case Actions.ADD_MONTH_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case Actions.GET_MOUTH_EVENTS_ERROR:
    case Actions.GET_MOUTH_EVENT_ERROR:
    case Actions.ADD_MONTH_EVENT_ERROR:
    case Actions.UPDATE_MONTH_EVENT_ERROR:
    case Actions.DELETE_MONTH_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case Actions.GET_MONTH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        events: action.payload,
      }
    case Actions.GET_MONTH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        choosenEvent: action.payload,
      }
    case Actions.DELETE_MONTH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        events: state.events.filter(event => event._id !== action.payload),
      }
    case Actions.UPDATE_MONTH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        events: state.events.map(event =>
          event._id === action.payload._id ? action.payload : event,
        ),
      }
    case Actions.ADD_MONTH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        events: [...state.events, action.payload],
      }
    default:
      return state
  }
}

export default calendarReducer
