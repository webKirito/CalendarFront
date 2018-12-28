import { Actions } from '../actions/modalActions'

const initialState = {
  day: null,
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_DAY:
      return {
        day: action.payload,
      }
    case Actions.CLEAR_DAY:
      return initialState
    default:
      return state
  }
}

export default modalReducer
