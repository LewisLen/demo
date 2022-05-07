const http = require("http");
const fs = require('fs');
const path = require('path');
const {createHash} = require('crypto');

const readFile = (files) => {
  const staticPath = path.resolve(__dirname,'./public');
  return new Promise((resolve,reject) => {
    fs.readFile(`${staticPath}/${files}`,(err,data) => {
      if(err) reject(err);
      resolve(data)
    })
  })
}

// 用hash值模拟etag
const transferHash = (file) => {
  const staticPath = path.resolve(__dirname, "./public");
  let data = fs.readFileSync(`${staticPath}/${file}`);
  data = data.toString();
  const HASH = createHash("md5");
  // update()方法默认字符串编码为utf-8，也可以传入Buffer
  const strMD5 = HASH.update(data).digest("hex");
  return strMD5;
}


http.createServer(async (req,res) => {
  let reqUrl = req.url;
  let data = '';
  switch (reqUrl) {
    case "/favicon.ico":
      res.end();
    case "/":
      data = await readFile("index.html");
      res.writeHead(200, {
        "Content-type": "text/html;charset=utf-8",
      });
      break;
    case "/logo.png":
      data = await readFile("logo.png");
      res.writeHead(200, {
        "Content-type": "image/png",
        // 强制缓存，请求成功后，服务端返回Expires或Cache-Control，在规则之内，下次浏览器发送请求时就直接取缓存数据了，请求不会到服务器。
        // Expires: "Sat, 07 May 2022 08:17:00 GMT",
        "Cache-Control": "max-age=120",
      });
      break;
    case "/style.css":
      data = await readFile("style.css");
      res.writeHead(200, {
        "Content-type": "text/css",
        // "Last-Modified":
      });
      break;
    case "/test.js":
      data = await readFile("test.js");
      let fileETag = transferHash("test.js");
      // req.headers["if-none-match"]注意头部信息需要小写
      if (req.headers["if-none-match"] === fileETag) {
        console.log("命中缓存", fileETag);
        // 如果命中缓存，则返回304
        res.writeHead(304, {
          "Content-type": "text/javascript",
          "Cache-Control": "no-cache",
          // 用hash值模拟etag
          ETag: fileETag,
        });
      } else {
        console.log("未命中缓存", fileETag);
        res.writeHead(200, {
          "Content-type": "text/javascript",
          "Cache-Control": "max-age=5,no-cache",
          // 用hash值模拟etag
          ETag: fileETag,
        });
      }
      break;
  }
  res.end(data);
}).listen(9090,() => {
  console.log("http://localhost:9090")
})