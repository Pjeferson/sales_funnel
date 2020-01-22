import {
  ADD_REQUEST_ERROR,
  MOVE_REQUEST_ERROR,
  INVALID_DROP,
  DISMISS_NOTIFICATION,
  DETAIL_SALE_ERROR
} from "../actions"

const initialState = null

export const notification = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REQUEST_ERROR:
      return "Não foi possível adicionar o negócio."

    case MOVE_REQUEST_ERROR:
      return "Não foi possível mudar o negócio de etapa."

    case INVALID_DROP:
      return "Um negócio não pode retroceder no funil."
    
    case DETAIL_SALE_ERROR:
      return "Não foi possível detalhar o negócio."

    case DISMISS_NOTIFICATION:
      return null

    default:
      return state
  }
}

export default notification
