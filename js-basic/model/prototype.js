/**
 * 寄生组合继承：原型继承和寄生式继承的组合。相对于构造函数和类式继承结合的组合式继承而已，这里主要是改变了子类原型直接继承父类原型的方式，不需要通过实例化父类的方式来继承父类的原型。也减少了一次构造函数的执行
 *
 */

// 原型式继承
function init(o) {
  // 一个过渡函数，实这里的F构造函数可以看成是子类，o是父类
  function F() {}
  // 函数的原型指向传入的对象
  F.prototype = o;
  // 返回构造函数的实例，一个{}且该对象的prototype上有属性
  return new F();
}

function initPrototype(subClass, superClass) {
  // 这里是将父类的prototype对象进行原型式继承，最终返回的是一个空对象且空对象的prototype对象上有父类prototype对象的属性
  var p = init(superClass.prototype);
  // 这一步改写p的contructor很重要
  // 这里是将空对象的contructor指向子类，也就是说p是子类的prototype对象
  p.contructor = subClass;
  subClass.prototype = p;
}

function SuperClass(title, price) {
  // 父类共有属性
  this.title = title;
  this.price = price;
  // 父类共有引用属性
  this.books = ["a", "b", "c"];
}
// 父类原型上共有方法
SuperClass.prototype.getPrice = function () {
  console.log(this.price);
  return this.price;
};

function SubClass(author, title, price) {
  // 构造函数式继承父类的共有属性 并可以向父类传参(title,price)
  SuperClass.call(this, title, price);
  // SubClass子类自身共有属性
  this.author = author;
}

// 调用寄生组合继承方法
initPrototype(SubClass, SuperClass);
// 这里不能用SubClass.prototype = {}的方式添加属性和方法，会改写prototype对象
SubClass.prototype.getAuthor = function () {
  console.log(this.author);
  return this.author;
};

let s = new SubClass("Len", "《哈哈哈》", 88);
/**
 * 这里实例化的s上不单有自身属性
 *  author: "Len"
 *  books: (4) ['a', 'b', 'c', 'd']
 *  price: 88
 *  title: "《哈哈哈》"
 * s的prototype上也有属性和方法
 * contructor: ƒ SubClass(author, title, price)
 * getAuthor: ƒ ()
 * prototype对象上有 getPrice()方法
 */
let s2 = new SubClass("Len2", "《哈哈哈2》", 888);
s.getPrice(); // 88
s.getAuthor(); // "Len"
s.books.push("d");
console.log(s.books); // ['a','b','c','d'];
console.log(s2.books); // ['a','b','c'];
