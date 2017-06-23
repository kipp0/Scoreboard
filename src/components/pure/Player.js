import React from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'

const Player = props => {
  // it's typically not a good idea to use props as an initialState
  // but this is an example just in case I ever need to
  return (
    <div className="player">
      <div className="player-name" onClick={ () => props.select_player(props.index) } >
        <a className="remove-player" onClick={ () => props.remove_player(props.index) }>✖</a>
        {props.name}
      </div>
      <div className="player-score">

        <Counter index={props.index} score={props.score} update_player_score={props.update_player_score} />
      </div>
    </div>
  )
}

Player.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  remove_player: PropTypes.func.isRequired,
  update_player_score: PropTypes.func.isRequired,
}

export default Player
