import * as types from '../types'
import * as cache from './review.cache'

const initialState = {
  saved: cache.getSaved(),
  dedupe: {},
  create: {},
}

export default function reviewReducer(state = initialState, action) {
  const { saved } = action
  switch (action.type) {
    case types.review.save:
    case types.review.unsave:
    case types.review.refresh:
      cache.setSaved(saved)
      return {
        ...state,
        saved: { ...saved },
      }

    case types.review.clear:
      cache.setSaved({})
      return {
        ...state,
        saved: {},
      }

    case types.review.loading:
      return {
        ...state,
        [action.tag]: { loading: true },
      }

    case types.review.loaded:
      return {
        ...state,
        [action.tag]: action.data || {},
      }

    case types.review.error:
      return {
        ...state,
        [action.tag]: { error: action.err },
      }

    default:
      return state
  }
}
