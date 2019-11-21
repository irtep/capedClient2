const app = require('express')();
const express = require('express');
const fs = require('fs');
const net = require('net');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const config = JSON.parse(fs.readFileSync('config/config.json', 'utf-8'));
const formatter= require('./lib/formatter'); // 2 original for ejs, 1 own for html
const alias     = require('./lib/alias');
const createResponse = (command, data) => {
  return { command: command, data: data }
}

app.use(express.static('frontEnd'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontEnd/index.html');
});

io.on('connection', (socket) => {
  const mud = net.createConnection(config.port, config.host);
  mud.setEncoding('latin1');
  // iso-8859-15 ilmeisesti milla tulee data
  // actually latin1 should be correct...
  console.log("connected");
  
  mud.addListener('data', (data) => {
    
    //const formatted = formatter.go(data);
    console.log('data', data);
    //console.log('form: ', formatted);
    // going to try so next that data goes raw to frontend and there will get formatted.
    socket.emit('message', createResponse('update', data));

  });  
  /*
  // Receive from frontEnd:
  socket.on('command', (data) => {    
   console.log("data received: ", data);
   const toBeSent = data + '\r\n'; 
    console.log("to be sent: ", toBeSent);
   mud.write(toBeSent);
    // return data + '\r\n'
  });
  */
});

http.listen(port, () => {
  console.log('listening on *:' + port);
});
