const net = require('net');
// const server = net.createServer();
// const server = new net.Server((serverSocket) => {
//   serverSocket.write('the info from server：这是服务端的内容---欢迎来到socket世界');
//   serverSocket.on('data',(chunk) => {
//     console.log('chunk---',chunk.toString())
//   });
//   serverSocket.on('end',() => {
//     console.log("链接断开！！！")
//   })
// })
// server.on('error',(err) => {
//   console.log('错误信息：',err);
//   throw err;
// })
// server.listen('9527',() => {
//   console.log('服务启动在：',server.address())
// })

const server = new net.createServer();

let clients = {};
let clientName = 0;

server.on('connection',client => {
  client.name = ++clientName + '客户';
  clients[client.name] = client;

  client.on('data',msg => {
    console.log(client.name + ' 上线了');
    broadcast(client,msg.toString());
  })

  client.on('error',err => {
    console.log('错误信息：',err)
    client.end();
  })

  client.on('close', () => {
    delete clients[client.name]
    console.log(client.name + ' 下线了');
  })
})

function broadcast(client, msg) {
  for (var key in clients) {
    clients[key].write(client.name + ' 说：' + msg)
  }
}

server.listen(9527, 'localhost')