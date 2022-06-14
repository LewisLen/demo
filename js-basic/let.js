/**
 * 1. 变量声明提升
 * 可以把变量声明和复制拆分成两部分看待。var a; a = 1;其中 var a 声明之后再上一层也能够在内存中找到，只不过值是undefined。let则没有这个问题，读取值必须在变量声明之后。
 */
console.log(a); // undefined
var a = 1;
console.log(b); // 报错
let b = 2;

/**
 * 2. 重复声明赋值
 * var可以多次声明赋值变量，后者会把前面声明的变量值覆盖。let则不能重复声明赋值。
 */
var c = 1;
var c = 2;
console.log(c); // 2
let d = 1;
// let d = 2; 报错，没法重复声明变量

/**
 * 3. 块级作用域
 */
for (var i = 0; i < 5; i++) {
  console.log(i);
}
console.log(i); // 这里依然能够得到 i 的值为5

// let有块级作用域
for (let k = 0; k < 5; k++) {
  console.log(k);
}
console.log(k); // 没法读取k的值。k is not defined

for (var item = 0; item < 5; item++) {
  setTimeout(() => {
    console.log(item); // 5,5,5,5,5
  }, 0);
}
for (let item = 0; item < 5; item++) {
  setTimeout(() => {
    console.log(item); // 0,1,2,3,4
  }, 0);
}

/**
 * const:
 * 1. const声明变量之后必须赋值
 * 2. 定义的常量基础类型是不能被修改的
 * 3. 也是有块级作用域的
 */

// 模拟const，使得const obj.a = 1不能被修改，相当于const a = 1;
const obj = {};
Object.defineProperty(obj, {
  value: 2,
  writable: false, // 不能被修改
  configurable: false, // 不可修改配置
  enumerable: true, // 可枚举
});
