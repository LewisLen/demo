// 在 Function 原型上添加方法
Function.prototype.addMethod = function (name, fn) {
  // 这里的this是指Function实例
  this[name] = fn;
};
// 添加方法
var m = function () {};
m.addMethod("checkName", function () {
  console.log('checkName')
});

// 防止忘记写new关键字
var Book = function(title,price){
  if(this instanceof Book){
    this.title = title;
    this.price = price;
  }else{
    return new Book(title,price)
  }
}


/**
 * 继承
 * SuperClass为父类
 * SubClass为子类
 * instance可以判断是否为类的实例
 */

// 类式继承
function SuperClass(){
  this.superValue = true;
}
SuperClass.prototype.getSuperValue = function(){
  console.log(this.superValue);
  return this.superValue;
}
// 子类
function SubClass(){
  this.subValue = false;
}
// 子类继承父类
// 实例化父类时，新创建的对象复制了父类的构造函数内的属性和方法
// 并且将__proto__指向了父类的prototype对象，也就是有了父类prototype对象上的属性和方法
// 所以子类的prototype可以访问父类构造函数内的属性和方法，也能访问父类prototype对象上的属性和方法
SubClass.prototype = new SuperClass();
SubClass.prototype.getSubValue = function(){
  console.log(this.subValue);
  return this.subValue;
}
/**
 * 类式继承： 由于是将父类的实例对象赋值给子类的prototype，所以子类可以访问父类prototype对象上的属性和方法。
 * 缺点： 1. 如果父类中的属性是引用类型，那么子类的实例属性一旦被更改，所有的子类实例属性也将被更改
 *       2. 子类进行实例化的时候，没法传参接收
 */


