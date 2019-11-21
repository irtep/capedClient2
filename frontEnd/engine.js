console.log('engine check');

window.onload = ()=> {
  const socket = io();
  
  // Receive messages from server:
  socket.on('message', (message) => {
          
    const command = message.command;
    const data = message.data;
    const messut = document.getElementById('mudScreen');
    console.log('data ', data);      
    //msgHistory.push(message.data);
    messut.innerHTML = messut.innerHTML + '<li>' + data;
    // destroy old data to avoid lag:
    //if (messut.innerHTML.length > 4000) {
    //  messut.innerHTML = messut.innerHTML.slice(message.data.length);      
    //}
          
    //$('#messages').append($('<li>').text(data));
    //$("#outp").scrollTop($("#outp")[0].scrollHeight);
  })
};