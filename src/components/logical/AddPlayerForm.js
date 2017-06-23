import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class AddPlayerForm extends Component {

  static propTypes: {
    add_player: PropTypes.func.isRequired,
    key_counter: PropTypes.func.isRequired,
  }

  state = {
    name: "",
  }
  
  add_player = (e) => {
    e.preventDefault()
    this.props.add_player(this.props.key_counter(), this.state.name)
    this.setState({name: ""})
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  render() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.add_player}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <input type="submit" value="Add Player" />
        </form>
      </div>
    )
  }
}























// var AddPlayerForm = React.createClass({
//   propTypes: {
//     onAdd: React.PropTypes.func.isRequired,
//   },
//   onSubmit: function(e) {
//     e.preventDefault()
//     this.props.onAdd(this.state.name)
//     this.setState(this.getInitialState(e))
//   },
//   onNameChange: function(e) {
//     this.setState({name: e.target.value})
//   },
//   getInitialState: function(e) {
//     return {
//       name: "",
//     }
//   },
//   render: function() {
//     return (
//       <div className="add-player-form">
//         <form onSubmit={this.onSubmit}>
//           <input type="text" value={this.state.name} onChange={this.onNameChange}/>
//           <input type="submit" value="Add Player" />
//         </form>
//       </div>
//     )
//   }
// })
