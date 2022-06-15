/**
 *  设计模式
 */

/**
 * 简单工厂模式： 静态工厂方法，由一个工厂对象决定创建某一种产品对象类的实例。
 * 应用场景：创建单一(同一类)对象
 */
function simpleFactory(name, type) {
  // 创建对象，拓展属性和方法
  var o = new Object();
  o.name = name;
  o.type = type;
  o.getName = function () {
    console.log(this.name);
  };
  return o;
}

let o = simpleFactory("对象", "type");

/**
 * 工厂方法模式： 通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例
 */

// 先创建类
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function () {
  console.log(this.name);
};

function Book(title) {
  this.title = title;
}
Book.prototype.getTitle = function () {
  console.log(this.title);
};

// 类和工厂结合起来
function createObj(type, param) {
  if (this instanceof createObj) {
    // 直接new createObj("book", "《js设计模式》");
    return new this[type](param);
  } else {
    return new createObj(type, param);
  }
}
createObj.prototype = {
  person: Person,
  book: Book,
};

// 通过工厂模式传参创建不同类的实例
/**
 *  new createObj("book", "《js设计模式》")的过程。
 * 1. 因为执行了new,则会新增一个对象obj,obj.__proto__ = createObj.prototype。所以新建对象obj的原型链上就有了"person"和"book"两个属性
 * 2. 执行构造函数里的语句，即return new this[type](param); 这时的this指向的是createObj构造函数实例化对象即obj，然后又进行new操作
 * 3. 执行新一轮的new操作，对Person或Book进行实例化。
 * 4. 返回Person或Book进行实例化对象
 */
var b1 = new createObj("book", "《js设计模式》");
var o2 = createObj("person", "张三");
console.log(b1); // Book { title: '《js设计模式》' }
console.log(o2); // Person { name: '张三' }
