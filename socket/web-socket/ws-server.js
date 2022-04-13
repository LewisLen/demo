const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 8081 })

let clients = {};
let clientName = 0

ws.on('connection', (client) => {

  client.name = ++clientName
  clients[client.name] = client

  client.on('message', (msg) => {
    broadcast(client, msg)
  })

  client.on('close', () => {
    broadcast(client, '离开了');
    delete clients[client.name]
    console.log(client.name + ' 离开了~');
  })
})

function broadcast(client, msg) {
  for (var key in clients) {
    clients[key].send(client.name + ' 说：' + msg)
  }
}