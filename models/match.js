var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var match = new Schema({
  table:    { type: String },
  teamA:    [{ type : Schema.ObjectId, ref: 'Player' }],
  teamB:    [{ type : Schema.ObjectId, ref: 'Player'}],
  matchDate: {type: Date}
});

module.exports = mongoose.model('Match', match);
