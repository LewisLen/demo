// jsonp
const http = require('http');
const url = require('url');
const { createProxyMiddleware } = require('http-proxy-middleware');

let tempData = JSON.stringify([
  {id:'00001','skill':'js'},
  {id:'00002','skill':'java'},
])
const httpServer = http.createServer((req,res) => {
  let urlObj = url.parse(req.url,true);
  let cb = urlObj.query.callback;
  res.writeHead(200, {
    'content-type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  })
  if (/^\/api/.test(req.url)) {
    const apiProxy = createProxyMiddleware('/api', { 
      target: 'https://ganzhou.ke.com/' ,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    });
    // http-proy-middleware 在Node.js中使用的方法
    apiProxy(req, res)
  }else{
    switch(urlObj.pathname){
      case '/jsonp/data':
        res.end(`${cb}(${tempData})`);
        break;
      default:
        res.end('"随便返回点什么东东"')
    }
  }
})
httpServer.listen('9090',() => {
  console.log('成功启动在http://localhost:9090')
})