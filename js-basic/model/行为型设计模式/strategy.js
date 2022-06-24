/**
 * 
 * strategy 策略模式。
 * 将定义的一组算法封装起来，使其相互之间可以转换。封装的算法具有一定的独立性，不会随着客户端的变化而变化。
 * 策略模式不需要管理状态、状态间没有依赖关系，策略之间可以相互替换、在策略对象内部保存的是相互独立的一些算法。
 * 
 */


// 促销价格策略对象
var PriceStrategy = function () {
  var strategy = {
    return30: function (price) {
      // +price 转化为数字类型
      return +price + parseInt(price / 100) * 30;
    },
    return50: function (price) {
      // +price 转化为数字类型
      return +price + parseInt(price / 100) * 50;
    },
    // 9折
    percent90: function (price) {
      return (price * 100 * 90) / 10000;
    },
    // 5折
    percent50: function (price) {
      return (price * 100 * 50) / 10000;
    },
  };
  return function (type, price) {
    console.log(type, price);
    return strategy[type] && strategy[type](price);
  };
}();
var p = PriceStrategy('return30',500)
console.log(p) // 650