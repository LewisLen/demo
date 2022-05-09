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

let date = new Date().toUTCString();
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
      console.log('data---',date)
      if (req.headers["if-modified-since"] === date) {
        console.log("命中缓存", date);
        // 如果命中缓存，则返回304
        res.writeHead(304, {
          "Content-type": "text/javascript",
          "Cache-Control": "no-cache",
          "Last-Modified": date,
        });
      } else {
        console.log("未命中缓存", date);
        res.writeHead(200, {
          "Content-type": "text/css",
          "Cache-Control": "no-cache",
          // 这个时间应该设置成文件内容最后修改的真实时间
          "Last-Modified": date,
        });
      }
      break;
    case "/test.js":
      data = await readFile("test.js");
	  // 这里是读取文件内容转换成hash值模拟etag，如果内容改变了，则hash值肯定也会跟着变化。
      let fileETag = transferHash("test.js");
      // req.headers["if-none-match"]注意头部信息需要小写
	  // 第二次请求后，if-none-match的值和etag值进行比对，如果相等，说明文件没有被修改过，可以直接用缓存数据，返回304，如果是不相等，则表示文件被修改过，则需要重新从服务器中取数据
      if (req.headers["if-none-match"] === fileETag) {
        // console.log("命中缓存", fileETag);
        // 如果命中缓存，则返回304
        res.writeHead(304, {
          "Content-type": "text/javascript",
          "Cache-Control": "no-cache",
          // 用hash值模拟etag
          ETag: fileETag,
        });
      } else {
        // console.log("未命中缓存", fileETag);
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