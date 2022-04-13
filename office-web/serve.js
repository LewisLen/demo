const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const filmsModel = require('./http');

http.createServer((req,res) => {
  let reqRul = req.url;
  let pathName = url.parse(reqRul).pathname;
  if (pathName == "/") {
    // 默认加载的首页
    pathName = "index.html";
  }
  let extName = path.extname(pathName);
  if(reqRul !== '/favicon.ico'){
    if(pathName == '/api/getData'){
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      });
      // "id" : "34865507"
      filmsModel.find({}).exec((err,doc) => {
        if (err) {
          res.end({
            returnCode: '0001',
            message: 'msg'
          })
        } else {
          res.end(JSON.stringify(doc))
        }
      })
    }else{
      // 渲染页面
      let ext = getExt(extName);
      fs.readFile('./static/'+ pathName,(err,data) => {
        if(err) return;
        res.writeHead(200,{
          "Content-Type": `${ext};charset='utf-8'`
        })
        res.write(data);
        res.end();
      });
    }
  }
}).listen(9090,() => {
  console.log('可以在 http://localhost:9090 访问')
})

// 获取渲染格式
getExt = (extName) => {
  let extData = fs.readFileSync('./static/ext.json')
  let ext = JSON.parse(extData.toString());
  return ext[extName];
}