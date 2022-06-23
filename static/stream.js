const fs = require('fs');
// 压缩模块
const zlib = require('zlib');

const gzip = zlib.createGzip()
const readstream = fs.createReadStream('./test.txt');
const writestream = fs.createWriteStream('./test2.zip')

// 通过pipe、stream的形式复制传输
readstream.pipe(gzip).pipe(writestream)