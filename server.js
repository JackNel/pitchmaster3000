var express = require('express');
var port = process.env.PORT || 3001;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var mongoConfig = process.env.MONGOLAB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/test';
var Pitch = require('./Pitch');

mongoose.connect(mongoConfig);


mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});


app.use(express.static(__dirname + "/app"))

app.get('/', function(req,response) {
  response.sendFile('app');
});


http.listen(port);



io.on('connection', function(socket) {
  console.log("SOMEONE NEW JOINED US");


    Pitch.find({},function(err,data) {
      socket.emit('all:pitches', data);
    });
  socket.on('new:comment', function(val){
    console.log('new comment', val);

    Pitch.findByIdAndUpdate(
      val._id, {$push: {comments: val.comments.pop()}},
      {safe: true, upsert: true, new: true},
      function(err, pitch) {
        if(err) {
          console.log("UPDATE ERR", err);
          throw err;
        }
       socket.emit('new:comment', pitch);
      }
    )


    // Pitch.findById(val._id, function(err,pitch) {
    //   pitch.comments = val.comments
    //   pitch.save(function () {
    //     socket.emit('new:comment');
    //   });
    // });
  });
  socket.on('new:pitch', function(val) {
    // console.log('val', val);
    var pitch = new Pitch({
        title: val.title,
        author: val.author,
        content: val.content,
        needs: val.needs,
        comment: val.comments,
    });
    // console.log(pitch);
    pitch.save(function(err,data) {
      if (err) {
        console.log("OH FUCK", err);
        return;
      }
      console.log(" YAY", data);
      io.emit('new:pitch', data);
    });
  });
});

console.log('WE ARE RUNNING ON PORT:' + port);
