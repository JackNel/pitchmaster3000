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
      socket.emit('all:pitches', data)
    });

  socket.on('new:pitch', function(titleVal, authorVal, contentVal, needsVal) {
    var pitch = new Pitch({
        title: titleVal,
        author: authorVal,
        content: contentVal,
        needs: needsVal,
    });

    pitch.save(function(err,data) {
      console.log(data);
      io.emit('new:pitch', data.title, data.content, data.needs);
    });
  })
})

console.log('WE ARE RUNNING ON PORT:' + port);
