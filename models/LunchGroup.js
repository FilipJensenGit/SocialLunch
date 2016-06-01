var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var lunchGroup = new Schema({
  table:    		{ type: String },
  participants:    [{ type : Schema.ObjectId, ref: 'Player' }],
  matchDate: 		{type: Date}
});

module.exports = mongoose.model('LunchGroup', lunchGroup);
