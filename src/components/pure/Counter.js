import React from 'react'
import PropTypes from 'prop-types'

const Counter = props => {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={ () => props.update_player_score(props.index, -1) }> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={ () => props.update_player_score(props.index, 1) }> + </button>
    </div>
  )
}

Counter.propTypes = {
  score: PropTypes.number.isRequired,
  update_player_score: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
}

export default Counter
