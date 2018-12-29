export const Actions = {
  SET_DAY: 'SET_DAY',
  HIDE_MODAL: 'HIDE_MODAL',
}

export const setDay = day => {
  return {
    type: Actions.SET_DAY,
    payload: day,
  }
}

export const hideModal = () => {
  return {
    type: Actions.HIDE_MODAL,
  }
}
