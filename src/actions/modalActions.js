export const Actions = {
  SET_DAY: 'SET_DAY',
  CLEAR_DAY: 'CLEAR_DAY',
  HIDE: 'HIDE',
  SHOW: 'SHOW',
}

export const setDay = day => {
  return {
    type: Actions.SET_DAY,
    payload: day,
  }
}

export const show = () => {
  return {
    type: Actions.SHOW,
    payload: true,
  }
}
export const hide = () => {
  return {
    type: Actions.HIDE,
    payload: false,
  }
}

export const clearDay = day => {
  return {
    type: Actions.CLEAR_DAY,
  }
}
