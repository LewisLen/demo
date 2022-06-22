/**
 *
 * 简单工厂模式，用来创建同一类对象
 *
 */

// 篮球基类
let BasketBall = function (ball) {
  this.ball = ball;
  this.info = "NBA";
  this.Famous = ["Jordan", "Kobe", "James"];
};
BasketBall.prototype = {
  getInfo: function () {
    console.log("NBA");
  },
  getFamous: function () {
    console.log(this.Famous);
  },
};
// 足球基类
let Football = function (ball) {
  this.ball = ball;
  this.info = "wordCup";
};
Football.prototype = {
  getInfo: function () {
    console.log("wordCup");
  },
  getBallSize: function () {
    console.log("足球大小");
  },
};

// 工厂模式：通过new实例化实现
function sportFactory(type) {
  switch (type) {
    case "nba":
      return new BasketBall();
    case "worldCup":
      return new Football();
  }
}

// 另外一种工厂模式。创建新对象实现
function createSport(type, info) {
  var o = new Object();
  o.info = info;
  o.getInfo = function () {
    console.log(this.info);
  };
  if (type === "worldCup") {
    o.getBallSize = function () {
      console.log("足球大小");
    };
  }
  if (type === "nba") {
    o.Famous = ["Jordan", "Kobe", "James"];
    o.getFamous = function () {
      console.log(this.Famous);
    };
  }
  return o;
}

/**
 * 两种方式不太一样：
 *
 * 一种是通过类的实例化对象创建的。如果这些类继承同一个父类，那么父类的原型方法是能够被子类共用的。
 * 一种是通过创建一个新对象然后增加属性和方法实现的。创建的是新的个体，不存在方法共用。
 *
 */

// 更灵活的一种方式 也是工厂方法模式
function createFactory(type, param) {
  if (this instanceof createFactory) {
    return new this[type](param);
  } else {
    return new createFactory(type, param);
  }
}
createFactory.prototype = {
  nba: BasketBall,
  worldCup: Football,
};

/**
 *  new createFactory("nba", "篮球")的过程。
 * 1. 因为执行了new,则会新增一个对象obj,obj.__proto__ = createFactory.prototype。所以新建对象obj的原型链上就有了"nba"和"worldCup"两个属性
 * 2. 执行构造函数里的语句，即return new this[type](param); 这时的this指向的是createFactory构造函数实例化对象即obj，然后又进行new操作
 * 3. 执行新一轮的new操作，对BasketBall或Football进行实例化。
 * 4. 返回BasketBall或Football进行实例化对象
 */
