import React from 'react'
import { render } from 'react-dom'
import App from '../components/App'
import configureStore from '../redux/store'
import { Provider } from 'react-redux'
import io from 'socket.io-client';

let initialState = {
  players: [],
  matches: []
}

let store = configureStore(initialState);

var socket = io();
socket.emit('connected');

render(
  <Provider store={store}>
    <App socket={socket}/>
  </Provider>,
  document.getElementById('app')
)