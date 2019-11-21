const app = require('express')();
const express = require('express');
const fs = require('fs');
const net = require('net');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const config = JSON.parse(fs.readFileSync('config/config.json', 'utf-8'));
const formatter= require('./lib/formatter3'); // 2 original for ejs, 1 own for html
const alias     = require('./lib/alias');
const createResponse = (command, data) => {
  return { command: command, data: data }
}

app.use(express.static('frontEnd'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontEnd/index.html');
});

console.log('ok1')
io.on('connection', (socket) => {
  const mud = net.createConnection(config.host, config.port);
  mud.setEncoding('utf-8');
  console.log('ok2', mud);
   
  mud.addListener('data', (data) => {
    console.log("data: ", data);
    //  const formatted = formatter.go(data);
    // going to try so next that data goes raw to frontend and there will get formatted.
    //  socket.emit('message', createResponse('update', formatted));
  }); 
});
/*
io.on('connection', (socket) => {
  const mud = net.createConnection(config.host, config.port);
  //mud.setEncoding('utf-8');
  // iso-8859-15 ilmeisesti milla tulee data
  console.log("connected");
  
  mud.addListener('data', (data) => {
    console.log("data: ", data);
  //  const formatted = formatter.go(data);
    // going to try so next that data goes raw to frontend and there will get formatted.
  //  socket.emit('message', createResponse('update', formatted));

  })  
  
  socket.on('command', (data) => {    
   console.log("data received: ", data);
   const toBeSent = data + '\r\n'; 
    console.log("to be sent: ", toBeSent);
 //  mud.write(toBeSent);
  });          
});
*/
/**/

http.listen(port, () => {
  console.log('listening on *:' + port);
});
