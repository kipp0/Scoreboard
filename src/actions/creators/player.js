import * as PlayerActionsTypes from '../types/player'

// ACTIONS
export const add_player = (id, name) => {

  return {
    type: PlayerActionsTypes.ADD_PLAYER,
    id,
    name
  }
}

export const remove_player = index => {

  return {
    type: PlayerActionsTypes.REMOVE_PLAYER,
    index
  }
}

export const update_player_score = (index, score) => {

  return {
    type: PlayerActionsTypes.UPDATE_PLAYER_SCORE,
    index,
    score
  }
}
export const select_player = index => {

  return {
    type: PlayerActionsTypes.SELECT_PLAYER,
    index
  }
}
