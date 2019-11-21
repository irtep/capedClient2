const app = require('express')();
const express = require('express');
const fs = require('fs');
const net = require('net');
const http = require('http').Server(app);
//const ejs = require('ejs');
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const config = JSON.parse(fs.readFileSync('config/config.json', 'utf-8'));
const formatter= require('./lib/formatter3'); // 2 original for ejs, 1 own for html
const alias     = require('./lib/alias');
//const iconv = require('iconv');
const createResponse = (command, data) => {
  return { command: command, data: data }
}
/* With EJS */ /*
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});
*/
/*
possible fix to umlaut problem:
var buffer = iconv.encode(data, "iso-8859-1");
data = iconv.decode(buffer, 'utf8');

https://stackoverflow.com/questions/27155419/convert-iso-8859-1-to-utf-8-javascript
*/

/* With HTML*/

app.use(express.static('frontEnd'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontEnd/index.html');
});


io.on('connection', (socket) => {
  const mud = net.createConnection(config.port, config.host);
  mud.setEncoding('utf-8');
  // iso-8859-15 ilmeisesti milla tulee data
  console.log("connected");
  
  mud.addListener('data', (data) => {
    
    /*
var buffer = iconv.encode(data, "iso-8859-1");
data = iconv.decode(buffer, 'utf8');
    */
    const formatted = formatter.go(data);
    // const splitted = formatted.split("<br>");
    //let i = 0;
    
    //console.log(data);
    
    
    //for (;i < splitted.length;i++) {
    //  socket.emit('message', createResponse('update', splitted[i]));
    //}
    // going to try so next that data goes raw to frontend and there will get formatted.
    socket.emit('message', createResponse('update', formatted));

  })  
  
  /*
  socket.on('message', (msg) => {
    console.log("received: ", msg);
    io.emit('message', msg);
  });
  */
  socket.on('command', (data) => {    /*
    console.log("data received: ", data);
    if (data.match(/^;alias add/i)) { console.log('data match 1');
      alias.create(data)
    } else if (data.match(/^;alias ls/i)) { console.log('data match 2');
      socket.send(createResponse('listAliases', alias.list()))
    } else if (data.match(/^;alias rm/i)) { console.log('data match 3');
      alias.remove(data)
    }    else { console.log('no data match 1) 
      mud.write(alias.format(data)) 
    } */
   console.log("data received: ", data);
   const toBeSent = data + '\r\n'; 
    console.log("to be sent: ", toBeSent);
   mud.write(toBeSent);
    // return data + '\r\n'
  });          
});

/*

  socket.on('message', function(data) {

      mud.write(alias.format(data))
    }
  })
})
*/

http.listen(port, () => {
  console.log('listening on *:' + port);
});
