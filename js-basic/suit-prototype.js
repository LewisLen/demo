/**
 * 组合式继承，是类式继承和构造函数继承的组合。
 * 1. 构造函数继承主要是继承父类中的共有属性
 * 2. 类式继承则是继承父类原型上的属性方法
 * 缺点：执行了两遍父类构造函数
 */
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
// 类式继承SubperClass原型上的方法,同时将SubClass实例对象的__proto__指向了父类的实例
// 也就是说SubperClass类的实例对象也会有父类的共有属性，只不过需要赋值的属性值为undefined而已
SubClass.prototype = new SuperClass();

SubClass.prototype.getAuthor = function () {
  console.log(this.author);
  return this.author;
};

let s = new SubClass("Len", "《哈哈哈》", 88);
/**
 * 这里实例化的s上不过有自身属性
 *  author: "Len"
 *  books: (4) ['a', 'b', 'c', 'd']
 *  price: 88
 *  title: "《哈哈哈》"
 * s的prototype上也有属性和方法
 * books: (3) ['a', 'b', 'c']
 * getAuthor: ƒ ()
 * price: undefined
 * title: undefined
 *
 */
let s2 = new SubClass("Len2", "《哈哈哈2》", 888);
s.getPrice(); // 88
s.getAuthor(); // "Len"
s.books.push("d");
console.log(s.books); // ['a','b','c','d'];
console.log(s2.books); // ['a','b','c'];
