const ws = new WebSocket('ws://localhost:8081/');

ws.onopen = () => {
  ws.send('大家好!')
}

ws.onmessage = (msg) => {
  const content = document.getElementById('msg-content')
  content.innerHTML += msg.data + '<br/>'
}

ws.onerror = (err) => {
  console.log(err);
}

ws.onclose = () => {
  console.log('closed~');
}