// LIBS
import React from 'react'

var INITIAL_STATE = [
  {
    id: 1,
    name: "Pierre Smith",
    score: 54,
  },
  {
    id: 2,
    name: "Bryan Raymond",
    score: 32,
  },
  {
    id: 3,
    name: "Nathan Smith",
    score: 69,
  },
]


var Stopwatch = React.createClass({

  getInitialState: function() {
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  },
  leading_zero: function(num, size) {
    var s = num+"";
    (num < size)? s = "0" + s : s = s;
    return s;
  },
  onStart: function() {
    this.setState({
      running: true,
      previousTime: Date.now()
    })
  },
  onStop: function() {
    this.setState({running: false})
  },
  onReset: function() {
    this.setState({
      previousTime: Date.now(),
      elapsedTime: 0,
    })
  },
  onTick: function() {
    if (this.state.running) {
      var now = Date.now()
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      })
    }
  },
  componentDidMount: function() { //lifecycle method
    this.interval = setInterval(this.onTick, 100)
  },
  componentWillUnMount: function() { //lifecycle method used to unmount stuff in didMount so that there's no memory leaks
    clearInterval(this.interval)
  },
  render: function() {
    var start_stop_button = this.state.running ?
                              <button onClick={this.onStop}>Stop</button> : <button onClick={this.onStart}>Start</button>


    var seconds = Math.floor(this.state.elapsedTime / 1000) % 60
    var minutes = Math.floor(this.state.elapsedTime / (1000 * 60) ) % 60
    // var hours = Math.floor(this.state.elapsedTime / (1000 * 60 * 60) ) % 24

    var mod_minutes = this.leading_zero(minutes, 10)
    var mod_seconds = this.leading_zero(seconds, 10)

    mod_minutes = minutes ? `${mod_minutes}:`: ''


    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{mod_minutes}{mod_seconds}</div>
        {start_stop_button}
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  }
})

var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },
  onSubmit: function(e) {
    e.preventDefault()
    this.props.onAdd(this.state.name)
    this.setState(this.getInitialState(e))
  },
  onNameChange: function(e) {
    this.setState({name: e.target.value})
  },
  getInitialState: function(e) {
    return {
      name: "",
    }
  },
  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <input type="submit" value="Add Player" />
        </form>
      </div>
    )
  }
})

function Header( props ) {
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
  )
}

function Stats(props) {
  var totalPlayers = props.players.length
  var totalPoints = props.players.reduce( (total, player) => {
    return total + player.score
  },0)

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

function Counter( props ) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={ () => props.onChange(-1) }> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={ () => props.onChange(1) }> + </button>
    </div>
  )
}

function Player( props ) {
  // it's typically not a good idea to use props as an initialState
  // but this is an example just in case I ever need to
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>x</a>
        {props.name}
      </div>
      <div className="player-score">

        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  )
}



var Scoreboard = React.createClass({
  propTypes: {
        title: React.PropTypes.string,
      initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
             id: React.PropTypes.number.isRequired,
           name: React.PropTypes.string.isRequired,
          score: React.PropTypes.number.isRequired,
      })).isRequired
  },
  getDefaultProps: function() {
    return {
      title: "scoreboard",
      initialPlayers: INITIAL_STATE,
    }
  },
  getInitialState: function () {
    return {
      players: INITIAL_STATE,
      index_counter: INITIAL_STATE.length
    }
  },
  onScoreChange: function (index,delta) {
    console.log('onScoreChange',index, delta);
    this.state.players[index].score += delta
    this.setState(this.state)
  },
  onPlayerAdd: function (name) {
    this.state.index_counter += 1

    this.state.players.push({
      id: this.state.index_counter,
      name: name,
      score: 0,
    })
    this.setState(this.state)
  },
  onRemovePlayer: function (index) {
    this.state.players.splice(index, 1)
    this.setState(this.state)
  },
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />

        <div className="players">

          {this.state.players.map( (player, index) => {
              return (
                <Player
                  key={player.id}
                  name={player.name}
                  score={player.score}
                  onScoreChange={ (delta) => {this.onScoreChange(index, delta)} }
                  onRemove={ () => {this.onRemovePlayer(index)} } />
              )
            }
          )}

          <AddPlayerForm onAdd={this.onPlayerAdd}/>
        </div>

      </div>
    )
  }
})

Header.propTypes = {
  title: React.PropTypes.string,
  players: React.PropTypes.array.isRequired,
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
}


export default Scoreboard
