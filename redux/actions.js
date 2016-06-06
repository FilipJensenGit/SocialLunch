require('es6-promise').polyfill();
require('isomorphic-fetch');

 var server = "http://localhost:3010/";
//var server = "http://foosball.schantz.com:3010/";

function fetchingPlayers(loading) {
  return {
    type: 'FETCHING_PLAYERS',
    isFetching: loading
  }
}

function fetchingMatches(loading) {
  return {
    type: 'FETCHING_MATCHES',
    isFetching: loading
  }
}

function addingPlayer(player) {
  return {
    type: 'ADDING_PLAYER',
    player: player
  }
}


function addedPlayer(player) {
  return {
    type: 'ADDED_PLAYER',
    player: player
  }
}

function deletingPlayer(player) {
  return {
    type: 'DELETING_PLAYER',
    player: player
  }
}


function deletedPlayer(player) {
  return {
    type: 'DELETED_PLAYER',
    player: player
  }
}

function receivedPlayers(playerJson) {
  return {
    type: 'RECEIVED_PLAYERS',
    data: playerJson
  }
}

function receivedMatches(matchesJson) {
  return {
    type: 'RECEIVED_MATCHES',
    data: matchesJson
  }
}

function _internalFetchParticipants() {
  return function(dispatch, getState) {
    var state = getState();
    var url = server + "api/players";
    dispatch(fetchingPlayers(true));

    return fetch(url)
      .then(function(result) {
        dispatch(fetchingPlayers(false));

        if (result.status === 200) {
          return result.json();
        }

        throw "request failed";
      })
      .then(function(jsonResult) {
        dispatch(receivedPlayers(jsonResult));
        dispatch(_internalFetchMatches());
      })
      .catch(function(err) {
        console.log("Oops...", "Couldn't fetch repos for user: error" + err);
      });
  }
}

function _internalFetchMatches() {
  return function(dispatch, getState) {
    var state = getState();
    var url = server + "api/matches";
    dispatch(fetchingMatches(true));

    return fetch(url)
      .then(function(result) {
        dispatch(fetchingMatches(false));

        if (result.status === 200) {
          return result.json();
        }

        throw "request failed";
      })
      .then(function(jsonResult) {
        //receive matches
        dispatch(receivedMatches(jsonResult));
      })
      .catch(function(err) {
        console.log("Oops...", "Couldn't fetch repos for user: error"  + err);
      });
  }
}

let actions = {
  addPlayer: function(name, points) {
    return function(dispatch, getState) {
      var state = getState();
      var url = server + "api/players";
      var player = {name: name, points: points};
      dispatch(addingPlayer(player));
      var strPlayer = JSON.stringify(player);
      return fetch(url,
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: strPlayer
      })
      .then(function(result) {
        dispatch(addedPlayer(player));

        if (result.status === 200) {
          return result.json();
        }

        throw "request failed";
      })
      .then(function(jsonResult) {
        dispatch(_internalFetchParticipants());
      })
      .catch(function(err) {
        console.log("Oops...", "Couldn't fetch repos for user: error"  + err);
      });
    }
  },

  deletePlayer: function(player) {
    return function(dispatch, getState) {
      var state = getState();
      var url = server + "api/players";
      dispatch(deletingPlayer(player));
      var strPlayer = JSON.stringify(player);
      return fetch(url,
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "DELETE",
          body: strPlayer
      })
      .then(function(result) {
        dispatch(deletedPlayer(player));

        if (result.status === 200) {
          return result.json();
        }

        throw "request failed";
      })
      .then(function(jsonResult) {
        dispatch(_internalFetchParticipants());
      })
      .catch(function(err) {
        console.log("Oops...", "Couldn't fetch repos for user: error"  + err);
      });
    }
  },

  requestParticipants: function() {
    return _internalFetchParticipants();
  }
}

export default actions
