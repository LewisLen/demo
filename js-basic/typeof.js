/**
 * JavaScript一共有六种主要类型: string,number,boolean,null,undefined,object
 *
 * typeof 操作符对应的值： 'string','number','boolean','object','undefined','object','function'，除此之外，typeof 不存在其它值。 ES6还有 'symbol'
 *
 *
 * 内置对象： String,Number,Boolean,Object,Function,Array,Date,RegExp,Error。
 * 利用内置对象可以创建对应类型的变量
 *
 *
 *
 */

let str = "Hello";
console.log(typeof str); // 'string'
console.log(str instanceof String); // false

let str2 = new String("World");
console.log(typeof str2); // 'object'
console.log(str2 instanceof String); // true

let num1 = 123;
console.log(typeof num1); // 'number'
console.log(num1 instanceof Number); // false

let num2 = new Number(123);
console.log(typeof num2); // 'object'
console.log(num2 instanceof Number); // true

let fn = function () {};
console.log(typeof fn); // 'function'
console.log(fn instanceof Function); // true
console.log(fn instanceof Object); // true

let n = null;
console.log(typeof n); // 'object'
console.log(n instanceof Object); // false

let obj = {};
console.log(typeof obj); // 'object'
console.log(obj instanceof Object); // true

let arr = [1, 2, 3];
console.log(typeof arr); // 'object'
console.log(arr instanceof Object); // true
console.log(arr instanceof Array); // true

let err = new Error("error message");
console.log(typeof err); // 'object'
console.log(err instanceof Object); // true
console.log(err instanceof Error); // true

let s = Symbol("s");
console.log(typeof s); // 'symbol'

/**
 *  === 和 == 的区别
 */

// 运算符。建议除了判断 == null之外，其余都是用 ===
100 == "100"; // true
0 == ""; // true
0 == false; // true
false == ""; // true
unll == undefined; // true

// 以下是 false 变量，除此之外都是 true

!!0 === false;
!!NaN === false;
!!"" === false;
!!null === false;
!!undefined === false;
!!false === false;

/**
 * window.onload 和 DOMContentLoaded的区别
 */

/**
 * JS创建10个<a>标签，点击的时候弹出对应的序号
 */
