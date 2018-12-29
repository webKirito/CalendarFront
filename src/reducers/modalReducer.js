import { Actions } from '../actions/modalActions'

const initialState = {
  day: null,
  active: false,
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_DAY:
      return {
        active: true,
        day: action.payload,
      }

    case Actions.HIDE_MODAL:
      return initialState
    default:
      return state
  }
}

export default modalReducer
