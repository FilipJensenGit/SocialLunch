var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var player = new Schema({
  name:    { type: String },
  subscribedTo: {type: Date}
});

module.exports = mongoose.model('Player', player);
