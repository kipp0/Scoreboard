// LIBS
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

//reducers
import PlayerReducer from './reducers/player'

//components
import Scoreboard from './containers/Scoreboard'

// STYLES
import './assets/app.css'

/* eslint-disable no-underscore-dangle */
const store = createStore(
  PlayerReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <Scoreboard />
  </Provider>,
  document.getElementById('container') );
