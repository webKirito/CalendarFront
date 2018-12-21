import calendarReducer from './calendarReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  calendar: calendarReducer,
})

export default rootReducer
