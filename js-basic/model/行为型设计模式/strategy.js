/**
 *
 * strategy 策略模式。
 * 将定义的一组算法封装起来，使其相互之间可以转换。封装的算法具有一定的独立性，不会随着客户端的变化而变化。
 * 策略模式不需要管理状态、状态间没有依赖关系，策略之间可以相互替换、在策略对象内部保存的是相互独立的一些算法。
 *
 */

// 促销价格策略对象
let PriceStrategy = (function () {
  let strategy = {
    // 满100返30
    return30: function (price) {
      // +price 转化为数字类型
      return +price + parseInt(price / 100) * 30;
    },
    // 满100返50
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
  // PriceStrategy是自执行函数，也就是说定义之后PriceStrategy就回返回该匿名函数，执行之后则返回对应的策略函数
  return function (type, price) {
    return strategy[type] && strategy[type](price);
  };
})();
let p = PriceStrategy("percent90", 200);
console.log(p); // 180
