const { createHmac,createHash,createCipheriv,createDecipheriv,createDiffieHellman, Hash } = require('crypto');


// MD5是一种常用的hash算法，用于给任意数据一个“签名”。签名通常用一个十六进制的字符串表示
// 除了md5，还可以是sha1，更安全的sha256和sha512
const HASH = createHash("md5");
// update()方法默认字符串编码为utf-8，也可以传入Buffer
const strmd5 = HASH.update('Hello World!').digest('hex');
console.log('md5加密后--',strmd5);

// Hmac算法是在md5或sha1等哈希算法，再加一个密钥的形式
// 改变密钥，同样的数据也会得到不一样的“签名”
const secretKey = 'mi**yao';
const hmac = createHmac('md5', secretKey)
.update('Hello World!')
.digest('hex');
console.log('hmac加密后--',hmac);


// AES对称加密算法，加解密都用同一个密钥。AES有不同的算法，如aes-192-cbc,aes-128-ecb,aes-256-cbc
// 加密封装
// 这里需要注意的是，使用key和iv的长度要和算法长度对应。密钥必须是8/16/24/32字节，如aes-192-cbc对应的密钥位数则是24字节(1字节=8位),iv则是16字节
const key = 'aaaaa00000aaaaa00000aaaa'; // 24个字节，对应就是24*8=192位
const iv = 'aaaaa00000aaaaa0'; // iv初始向量为固定的16个字节
function aesEncrypt(data,secretKey){
  const cipher = createCipheriv('aes-192-cbc',secretKey,iv);
  let crypted = cipher.update(data,'utf-8','hex');
  crypted += cipher.final('hex');
  return crypted;
}
// 解密封装
function aesDecrypt(encrypted,secretKey){
  const decipher = createDecipheriv('aes-192-cbc', secretKey,iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
let tempStr = 'Hello World!';
var encrypted = aesEncrypt(tempStr, key);// 0b33675e9b2f5695d241438a434b31b4
var decrypted = aesDecrypt(encrypted, key);
console.log('aes加密后--',encrypted);
console.log('aes解密后--',decrypted);

// DH算法
let ming = createDiffieHellman(512);
let ming_keys = ming.generateKeys();
let prime = ming.getPrime();
let generator = ming.getGenerator();

var hong = createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

console.log('Secret of 小明: ' + ming_secret.toString('hex'));
console.log('Secret of 小红: ' + hong_secret.toString('hex'));