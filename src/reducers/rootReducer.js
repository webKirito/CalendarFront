import calendarReducer from './calendarReducer'
import modalReducer from './modalReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  calendar: calendarReducer,
  modal: modalReducer,
})

export default rootReducer
