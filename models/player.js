var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var player = new Schema({
  name:    { type: String },
  points:     { type: Number },
  subscribedTo: {type: Date}
});

module.exports = mongoose.model('Player', player);
