// fs流读取和写入操作
const {createReadStream,createWriteStream} = require('fs');
const {createGzip} = require('zlib');
// 流式读取文件
const fileReadStream = createReadStream('./static/ext.json');
// 流式写入文件
const fileWriteStream = createWriteStream('./static/extStream.json');
// pipe管道式写入
const pipeWriteStream = createWriteStream('./static/extPipe.json');
fileReadStream.pipe(pipeWriteStream);
// 链式pipe写入
const zipWriteStream = createWriteStream('./static/extZip.json.gz');
fileReadStream.pipe(createGzip()).pipe(zipWriteStream);

let count = 0;
let str = '';

fileReadStream.on('data',async(chunk) => {
  // buffer
  console.log(chunk);
  str += chunk;
  // 写入流写入文件
  fileWriteStream.write(str,'utf-8');
});

fileReadStream.on('end',() => {
  console.log('--读取完毕--');
  console.log('读取次数=',count)
})

fileReadStream.on('error',(err) => {
  console.log('--读取错误--',err)
})

