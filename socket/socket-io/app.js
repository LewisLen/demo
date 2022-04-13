const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const getExtName = (extName) => {
  let extData = fs.readFileSync('../../office-web/static/ext.json');
  let ext = JSON.parse(extData.toString());
  return ext[extName];
}

const httpServer = http.createServer((req,res) => {
  const reqUrl = req.url;
  let pathName = url.parse(reqUrl).pathname;
  const extName = path.extname(pathName);
  if(pathName == '/'){
    pathName = 'index.html';
  }

  if(reqUrl !== '/favicon.ico'){
    const ext = getExtName(extName);
    fs.readFile('./'+ pathName,(err,fileData) => {
      if(err) return;
      res.writeHead(200,{
        "Content-Type":`${ext};charset=utf-8`
      })
      res.write(fileData);
      res.end();
    })
  }
});

const io = require('socket.io')(httpServer);

io.on('connection',socket => {
  console.log('socket.io链接成功！！！');
  socket.on('message',msg => {
    io.emit('message',{
      user: '系统',
      content: msg,
      createAt: new Date().toLocaleString()
    })
  })
});

httpServer.listen(3030,() => {
  console.log('服务启动在 http://localhost:3030')
})