"use strict";
const socket = io();
const commandButtons = document.getElementsByClassName('commandButtons');
// event listener for command buttons
for (var i = 0; i < commandButtons.length; i++) {
  commandButtons[i].addEventListener('click', sendButtonMessage, false);
}

// event listener for enter:
document.getElementById('cLine').addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    sendMessage();
  }
});
// check if lots of text and destroy lines, to avoid lag
function destroyLines() {
  const msgs = document.getElementById('mudScreen');
  if (msgs.innerHTML.length > 100000) {
    msgs.innerHTML = '';
  }
}
// send message to server by buttons
function sendButtonMessage(clickedButton) {
  console.log('value= ', clickedButton.target.value);
  const data = clickedButton.target.value;
  socket.emit('command', data);
  document.getElementById('cLine').select();
}
// send message to server
function sendMessage(){
  const data = document.getElementById('cLine').value;
  socket.emit('command', data);
  document.getElementById('cLine').select();
}
// Receive messages from server:
socket.on('message', (message) => {
  const command = message.command;
  const data = message.data;
  const messut = document.getElementById('mudScreen');
  // experimental trigger
  const triggers = [
    'You are knocked',
    'your mount throws'
  ];
  triggers.forEach( trig => {
    const checkThis = data.includes(trig);
    if (checkThis) { socket.emit('command', 'lead cercei'); }
   });
  /*
    var str = "Hello world, welcome to the universe.";
    var n = str.includes("world");
    document.getElementById("demo").innerHTML = n;
  */
  messut.innerHTML = messut.innerHTML += `<li> ${data}`;
  // destroy old data to avoid lag:
  setInterval( () => { destroyLines(); },10000);
  // scrolling to down
  messut.scrollTop = messut.scrollHeight;
});
window.onload = ( () => {
  // focus on command line:
  document.getElementById('cLine').focus();
});
