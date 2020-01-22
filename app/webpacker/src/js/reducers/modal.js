import { SHOW_MODAL, HIDE_MODAL } from "../actions"

const initialState = {
  show: false,  // Controls when the modal is displayed .
  sale: null    // Stores sales information.
}

export const modal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, show: true, sale: action.sale }

    case HIDE_MODAL:
      return { ...state, show: false, sale: null }

    default:
      return state
  }
}

export default modal
