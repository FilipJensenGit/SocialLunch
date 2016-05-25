var mongoose = require('mongoose');
var PlayerDB  = mongoose.model('Player');
var MatchDB  = mongoose.model('Match');

//GET - Return all players in the DB
exports.findAllPlayers = function(req, res) {
    PlayerDB.find(function(err, players) {
    if(err) res.send(500, err.message);

    console.log('GET /players')
        res.status(200).jsonp(players);
    });
};

function _findAllTodayPlayers(resultFunction) {
  var fromDate = new Date();
  var toDate = new Date();
  fromDate.setHours(0,0,0,0);
  toDate.setHours(23, 59, 59, 99);
  return PlayerDB.find({subscribedTo: {$gt: fromDate, $lt:toDate}}, resultFunction);
}

function _findAllTodayMatches(resultFunction) {
  var fromDate = new Date();
  var toDate = new Date();
  fromDate.setHours(0,0,0,0);
  toDate.setHours(23, 59, 59, 99);
  return MatchDB.find({matchDate: {$gt: fromDate, $lt:toDate}}).populate('teamA').populate('teamB').exec(resultFunction);
}

exports.findAllTodayPlayers = function(req, res) {
  _findAllTodayPlayers((err, players) => {
    if(err) res.send(500, err.message);

    console.log('GET /players')
        res.status(200).jsonp(players);
  });
};

exports.findAllTodayMatches = function(req, res) {
  _findAllTodayMatches((err, matches) => {
    console.log("Result: " + matches);
    if(err) res.send(500, err.message);

    console.log('GET /matches')
        res.status(200).jsonp(matches);
  });
};

exports.addPlayer = function(req, res) {
    console.log('POST');
    console.log(req.body);

    _findAllTodayPlayers((err, players) => {
      if(req.body.name !== null && req.body.name.trim() !== '') {
        if(players.length < 20) {
          var existantPlayer = players.filter((player) => player.name.toUpperCase() === req.body.name.toUpperCase());
          if(existantPlayer == null || existantPlayer.length == 0) {
            var addedPlayer = new PlayerDB({
                name:    req.body.name,
                points:  req.body.points !== null && req.body.points ? req.body.points : 1000,
                subscribedTo:  new Date()
            });

            addedPlayer.save(function(err, addedPlayer) {
                if(err) return res.status(500).send( err.message);
            res.status(200).jsonp(addedPlayer);
            });
          } else {
            return res.status(500).send( 'Player already exists');
          }
        }else {
          return res.status(500).send( 'No more players for today');
        }
      } else {
        return res.status(500).send( 'Name cannot be empty');
      }


    });
};

exports.deletePlayer = function(req, res) {
    console.log('DELETE');
    console.log(req.body);

    PlayerDB.findById(req.body._id, function (err, foundPlayer) {
      if(err) return res.status(500).send( err.message);

      foundPlayer.remove();
      res.status(200).jsonp(foundPlayer);
    });

};

exports.generateMatches = function() {
  _findAllTodayPlayers((err, players) => {
    var tables = ['4th Floor', '3rd Floor', '2nd Floor', '1st Floor', 'Rigsarkivet'];
    //create groups of 4
    var numParticipants = players.length;
    var numGroups = players.length !== 0 ? Math.floor(players.length / 4) : 0;
    var unassignedPlayers = players.length !== 0 ? players.length % 4 : 0;

    console.log(numGroups + " found!");
    for(var i=0; i<numGroups; i++) {
      console.log("Group " + i + ": ");
      numParticipants = players.length;
      var player1Pos = Math.floor(Math.random() * numParticipants);
      var player1 = players[player1Pos];
      players.splice(player1Pos, 1);

      numParticipants = players.length;
      var player2Pos = Math.floor(Math.random() * numParticipants);
      var player2 = players[player2Pos];
      players.splice(player2Pos, 1);

      numParticipants = players.length;
      var player3Pos = Math.floor(Math.random() * numParticipants);
      var player3 = players[player3Pos];
      players.splice(player3Pos, 1);

      numParticipants = players.length;
      var player4Pos = Math.floor(Math.random() * numParticipants);
      var player4 = players[player4Pos];
      players.splice(player4Pos, 1);

      console.log(player1.name + " " + player2.name + " " + player3.name + " " + player4.name);

      var table = tables[0];
      tables.splice(0, 1);
      //todo matching logic

      //Find max score and min score
      var allPlayers = [player1, player2, player3, player4];
      allPlayers.sort((p1, p2) => p1.points < p2.points);


      var addedMatch = new MatchDB({
        table:    table,
        teamA:    [allPlayers[0], allPlayers[3]],
        teamB:    [allPlayers[1],allPlayers[2]],
        matchDate: new Date()
      })

      addedMatch.save(function(err, addedMatch) {
          //match saved
          console.log("Match saved");
      });
    }

    if(unassignedPlayers > 0) {//create a one/two/three player match
      var player1 = players[0];
      players.splice(0, 1);

      var player2 = players !== null && players.length > 0 ? players[0] : null;
      if(player2 !== null) players.splice(0, 1);

      var player3 = players !== null && players.length > 0 ? players[0] : null;

      if(player3 == null) { //one/two man game
        var addedMatch = new MatchDB({
          table:    tables[0],
          teamA:    [player1],
          teamB:    player2 !== null ? [player2] : [],
          matchDate: new Date()
        });

        addedMatch.save(function(err, addedMatch) {
            //match saved
            console.log("Match saved");
        });
      } else { //three man game
        //Find max score and min score
        var allPlayers = [player1, player2, player3];
        allPlayers.sort((p1, p2) => p1.points < p2.points);

        var addedMatch = new MatchDB({
          table:    tables[0],
          teamA:    [allPlayers[1], allPlayers[2]],
          teamB:    [allPlayers[0]],
          matchDate: new Date()
        });

        addedMatch.save(function(err, addedMatch) {
            //match saved
            console.log("Match saved");
        });
      }
    }
  });
}
