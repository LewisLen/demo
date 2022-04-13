const net = require('net');

// const client = net.createConnection({port: 9527},() => {
//   client.write('这是客户端的内容，链接成功了哈哈哈哈');
// });

// client.on('data',(data) => {
//   console.log(data.toString());
//   client.end();
// });

// client.on('end',() => {
//   console.log('===disconnected form server===');
// }); 


const readline = require('readline');
const socket = new net.Socket();

socket.connect({port: 9527},() => {
  socket.write('哈哈哈哈哈哈');
});

socket.on('data',msg => {
  console.log(msg.toString());
  say();
});

socket.on('error',err => {
  console.log('error---',err);
});

socket.on('close',() => {
  console.log('链接关闭---');
});

const say = () => {
  readline.createInterface({
    input: process.stdin,
    output: process.stdout
  }).question(`请输入: \n`, inputMessage => {
    socket.write(inputMessage + '\n')
  })
};