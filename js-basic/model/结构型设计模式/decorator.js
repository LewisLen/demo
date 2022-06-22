/**
 *
 * 装饰者模式，Decorator。
 * 在不改变原对象的基础上，通过对其进行包装扩展(添加属性和方法)
 *
 */

// 在构造函数之外定义函数，将实例传入进行属性的变更
function Car() {
  this.price = 10;
}
// 将实例传入方法中，没有对Car类进行改变
function hotSeat(carClass) {
  carClass.hasHeatSeat = true;
  carClass.price += 1;
}
function autoMirror(carClass) {
  carClass.hasAutoMirror = true;
  carClass.price += 0.5;
}

var car2 = new Car();
console.log(car2.price);
hotSeat(car2);
autoMirror(car2);
console.log(car2.price);

// 一般写法，是将方法写在构造函数的原型上
function NewCar() {
  this.price = 10;
}
NewCar.prototype = {
  hotSeat(carClass) {
    carClass.hasHeatSeat = true;
    carClass.price += 1;
  },
  autoMirror(carClass) {
    carClass.hasAutoMirror = true;
    carClass.price += 0.5;
  },
};
