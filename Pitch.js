var mongoose = require('mongoose');

var pitchSchema = new mongoose.Schema({
  title: {type: String},
  author: {type: String},
  content: {type: String},
  needs: {type: String},
  comments: {type: Array}
});

var Pitch = mongoose.model("Pitch", pitchSchema);

module.exports = Pitch;
