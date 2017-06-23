import React, { Component } from 'react';


export default class Stopwatch extends Component {

  state = {
    running: false,
    previouseTime: 0,
    elapsedTime: 0,
  }

  componentDidMount() { //lifecycle method
    this.interval = setInterval(this.onTick, 100)
  }
  componentWillUnMount() { //lifecycle method used to unmount stuff in didMount so that there's no memory leaks
    clearInterval(this.interval)
  }

  leading_zero = (num, size) => {
    var s = num+"";
    (num < size)? s = "0" + s : s = s;
    return s;
  }

  onStart = () => {
    this.setState({
      running: true,
      previousTime: Date.now()
    })
  }

  onStop = () => {
    this.setState({running: false})
  }

  onReset = () => {
    this.setState({
      previousTime: Date.now(),
      elapsedTime: 0,
    })
  }

  onTick = () => {
    if (this.state.running) {
      var now = Date.now()
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      })
    }
  }



  render() {
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

}




















// var Stopwatch = React.createClass({
//
//   getInitialState: function() {
//     return {
//       running: false,
//       elapsedTime: 0,
//       previousTime: 0,
//     }
//   },
//   leading_zero: function(num, size) {
//     var s = num+"";
//     (num < size)? s = "0" + s : s = s;
//     return s;
//   },
//   onStart: function() {
//     this.setState({
//       running: true,
//       previousTime: Date.now()
//     })
//   },
//   onStop: function() {
//     this.setState({running: false})
//   },
//   onReset: function() {
//     this.setState({
//       previousTime: Date.now(),
//       elapsedTime: 0,
//     })
//   },
//   onTick: function() {
//     if (this.state.running) {
//       var now = Date.now()
//       this.setState({
//         previousTime: now,
//         elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
//       })
//     }
//   },
//   componentDidMount: function() { //lifecycle method
//     this.interval = setInterval(this.onTick, 100)
//   },
//   componentWillUnMount: function() { //lifecycle method used to unmount stuff in didMount so that there's no memory leaks
//     clearInterval(this.interval)
//   },
//   render: function() {
//     var start_stop_button = this.state.running ?
//                               <button onClick={this.onStop}>Stop</button> : <button onClick={this.onStart}>Start</button>
//
//
//     var seconds = Math.floor(this.state.elapsedTime / 1000) % 60
//     var minutes = Math.floor(this.state.elapsedTime / (1000 * 60) ) % 60
//     // var hours = Math.floor(this.state.elapsedTime / (1000 * 60 * 60) ) % 24
//
//     var mod_minutes = this.leading_zero(minutes, 10)
//     var mod_seconds = this.leading_zero(seconds, 10)
//
//     mod_minutes = minutes ? `${mod_minutes}:`: ''
//
//
//     return (
//       <div className="stopwatch">
//         <h2>Stopwatch</h2>
//         <div className="stopwatch-time">{mod_minutes}{mod_seconds}</div>
//         {start_stop_button}
//         <button onClick={this.onReset}>Reset</button>
//       </div>
//     )
//   }
// })
