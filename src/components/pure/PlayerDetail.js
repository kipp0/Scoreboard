import React from 'react';
import PropTypes from 'prop-types'

const PlayerDetail = ( {selected_player} ) => {
  if( selected_player ){

    let { name, score, created, updated } = selected_player

    return (
      <div>
        <h3>{ name }</h3>
        <ul>
          <li>
            <span>Score: </span>
            { score }
          </li>
          <li>
            <span>Created: </span>
            { created }
          </li>
          <li>
            <span>Updated: </span>
            { updated }
          </li>
        </ul>
      </div>
    );
  }
  else {
    return (<p>Click on a player to see more details</p>);
  }
};

PlayerDetail.propTypes = {
  selected_player: PropTypes.object,
}

export default PlayerDetail;
