import * as PlayerActionsTypes from '../actions/types/player'

const initialState = {
	selectedPlayerIndex: -1,
  players: [
    {
      id: 1,
      name: "Pierre Smith",
      score: 54,
      created: '11/8/2016',
  		updated: '11/9/2016'
    },
    {
      id: 2,
      name: "Bryan Raymond",
      score: 32,
      created: '11/8/2016',
  		updated: '11/9/2016'
    },
    {
      id: 3,
      name: "Nathan Smith",
      score: 69,
      created: '11/8/2016',
  		updated: '11/9/2016'
    }
  ]

}

export default function Player(state=initialState, action) {

  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let full_date = date.toLocaleDateString('en-US')

  switch (action.type) {
    case PlayerActionsTypes.ADD_PLAYER:

      let add_player = {

        players: [
          ...state.players,
          {
            id: action.id,
            name: action.name,
            score: 0,
            created: full_date
          }
        ]
      }

      return Object.assign({}, state, add_player)

    case PlayerActionsTypes.REMOVE_PLAYER:
      let remove_player = {

        players: [
          ...state.players.slice(0, action.index),
          ...state.players.slice(action.index + 1)
        ]
      }
      return Object.assign({}, state, remove_player)

    case PlayerActionsTypes.UPDATE_PLAYER_SCORE:
      let players = state.players.map( (player, index) => {

        if (index === action.index) {
          return {
            ...player,
            score: player.score + action.score,
            updated: full_date
          }
        }
        return  player

      })

      let update_player_score = {
        players: players
      }
      return Object.assign({}, state, update_player_score)
    case PlayerActionsTypes.SELECT_PLAYER:

      let select_player = {

        selectedPlayerIndex: action.index,
      }
      return Object.assign({},state, select_player)
    default:
      return state
  }
}
