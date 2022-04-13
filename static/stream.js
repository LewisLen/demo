const fs = require('fs');
const zlib = require('zlib')

const gzip = zlib.createGzip()
const readstream = fs.createReadStream('./test.txt');
const writestream = fs.createWriteStream('./test2.zip')

readstream.pipe(gzip).pipe(writestream)