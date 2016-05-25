import objectAssign from 'object-assign'

let reducer = function(state, action) {
  switch (action.type) {
    case 'RECEIVED_PLAYERS':
      return objectAssign({}, state, {
        players: action.data
      })
    case 'RECEIVED_MATCHES':
        return objectAssign({}, state, {
          matches: action.data
        })
    default:
      return state;
  }
}

export default reducer
