const ws = require("nodejs-websocket");

const server = ws
  .createServer(function (socket) {
    var count = 1;
    // 读取客户端传递过来的数据
    socket.on("text", function (str) {
      // 输出前端传递过来的消息
      console.log(str);
      // 向前端发送消息
      socket.sendText("服务端接收到客户端发送的消息了！" + count++);
    });
  })
  .listen(3030);
