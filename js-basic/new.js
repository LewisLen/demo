/**
 * 手动实现new操作符
 * @param {构造函数} fn 
 * @param  {...any} args 
 * @returns 返回object或者构造函数的实例对象
 */

// new操作符
function myNew(fn, ...args) {
  // 1. 创建一个控对象
  let obj = {};
  // 2. 将空对象的原型指向构造函数的原型
  // Object.setPrototypeOf(obj.fn.prototype);
  obj.__proto__ = fn.prototype;
  // 3. 将空对象作为构造函数的上下文，使得this指向空对象
  let result = fn.apply(obj, args);
  // 4. 如果返回的不是对象，则返回obj
  return result instanceof Object ? result : obj;
}

function Book(title, price) {
  this.title = title;
  this.price = price;
}

let b = myNew(Book, "《js高级程序设计》", "89");
