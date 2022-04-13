// 创建Buffer
const buf1 = Buffer.alloc(10,'9'); // 存储10个字节的容器（暂存区）
console.log(buf1);// 默认填满 0

// 根据内容来创建
const buf2 = Buffer.from("Hello World!"); // 总共12个字节
console.log(buf2);

const buf3 = Buffer.from("Hello World!","base64");
console.log(buf3.toString());

buf1.toJSON();
console.log('buf1结构--',buf1,buf1.length);