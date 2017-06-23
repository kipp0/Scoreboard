// LIBS
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as PlayerActionCreators from '../actions/creators/player'

import AddPlayerForm from '../components/logical/AddPlayerForm'
import Header from '../components/pure/Header'
import Player from '../components/pure/Player'
import PlayerDetail from '../components/pure/PlayerDetail'





class Scoreboard extends Component {

  state = {
    player_key_counter: 3
  }

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  update_player_key_counter = () => {
    this.state.player_key_counter += 1

    this.setState(this.state)

    return this.state.player_key_counter
  }





  render() {

    const { dispatch, store } = this.props
    const add_player = bindActionCreators(PlayerActionCreators.add_player, dispatch )
    const remove_player = bindActionCreators(PlayerActionCreators.remove_player, dispatch )
    const update_player_score = bindActionCreators(PlayerActionCreators.update_player_score, dispatch )
    const select_player = bindActionCreators(PlayerActionCreators.select_player, dispatch )

    let selected_player = null

    if (store.selectedPlayerIndex !== -1) {
      selected_player = store.players[store.selectedPlayerIndex]
    }

    const player_components = store.players.map( (player, index) => {
      return (
        <Player
          index={index}
          key={player.id}
          name={player.name}
          score={player.score}
          select_player={select_player}
          update_player_score={update_player_score}
          remove_player={remove_player}
        />
      )
    })


    return (
      <div className="scoreboard">
        <Header players={store.players} />

        <div className="players">

          { player_components }

          <AddPlayerForm
            key_counter={this.update_player_key_counter}
            add_player={add_player}
          />
        </div>
        <div className="player-detail">
          <PlayerDetail
            selected_player={selected_player}
          />
        </div>

      </div>
    )
  }
}


const map_state_to_props = state => (
  {
    store: state
  }
)

export default connect(map_state_to_props)(Scoreboard)
