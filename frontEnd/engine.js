const socket = io();

// event listener for enter:
document.getElementById('cLine').addEventListener("keydown", function (e) {
    
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    sendMessage();
  }
});

// check if lots of text and destroy lines, to avoid lag
function destroyLines() {
  const msgs = document.getElementById('mudScreen').innerHTML;
  
  if (msgs.length > 4000) {
    
    do {
      msgs.substring(msgs.lastIndexOf('\n') +1, -1 );
      
    } while (msgs.length > 3000);
  }
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
        
  messut.innerHTML = messut.innerHTML += `<li> ${data}`;
    
  // destroy old data to avoid lag:
  //setInterval( () => { destroyLines(); },1000);
          
  // scrolling to down
  messut.scrollTop = messut.scrollHeight;
});

