"use strict";
const app = require('express')();
const express = require('express');
const fs = require('fs');
const net = require('net');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3500;
const config = JSON.parse(fs.readFileSync('config/config.json', 'utf-8'));
const formatter= require('./lib/formatter');
const createResponse = (command, data) => {
  return { command: command, data: data }
}
let connected = false;
// for convert from utf-8 to latin1:
const Iconv = require('iconv').Iconv;
const Buffer = require('buffer').Buffer;
app.use(express.static('frontEnd'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontEnd/index.html');
});
io.on('connection', (socket) => {
  try {
    const mud = net.createConnection(config.port, config.host);
    connected = true;
    // iso-8859-1 aka latin1 is what this mud uses.
    mud.setEncoding('latin1');
    mud.addListener('data', (data) => {
    // formats colors and weird stuff
    const formatted = formatter.go(data);
    // sending to front end
    socket.emit('message', createResponse('update', formatted));
  });
  // Receive from frontEnd:
  socket.on('command', (data) => {
    data = data + '\r\n';
    // need to convert from utf-8 to latin1/iso-8859-1
    var iconv = new Iconv('UTF-8', 'ISO-8859-1');
    // buffer and buffer2 are same, can use whichever
    var buffer = iconv.convert(data);
    var buffer2 = iconv.convert(Buffer.from(data));

    mud.on( 'end', () => {
      connected = false;
    });
    connected? mud.write(buffer) : console.log('disconnected from mud, not sending');
  });
} catch (e) {
  console.log('error contacting mud', e);
}
});
http.listen(port, () => {
  console.log('listening on *:' + port);
});
