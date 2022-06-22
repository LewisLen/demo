/**
 * 
 * 设计模式：工厂方法模式，factory-method
 * 在简单工厂模式种，如果要新增一个类，需要需改类和工厂方法两个地方，针对这个痛点，可以使用工厂方法模式。
 * 
 * 工厂方法模式本意是说将实际创建对象工作推迟到子类当中，这样核心类就变成抽象类。可以将工厂方法看作是一个实例化对象的工厂类，将创建对象的基类放在工厂方法类的原型中即可。
 */

var java = function(content){
  this.content = content;
  (function(content){
    var div = document.createElement('div');
    div.innerHTML = content;
    div.style.color = 'green';
    document.getElementById("container").appendChild(div)
  })(content)
}

// 篮球基类
let BasketBall = function(ball){
  this.ball = ball;
  this.info = 'NBA';
  this.Famous = ["Jordan", "Kobe", "James"];
}
BasketBall.prototype = {
  getInfo: function(){
    console.log("NBA");
  },
  getFamous: function(){
    console.log(this.Famous);
  }
}
// 足球基类
let Football = function (ball) {
  this.ball = ball;
  this.info = "wordCup";
};
Football.prototype = {
  getInfo: function () {
    console.log("wordCup");
  },
  getBallSize: function(){
    console.log('足球大小');
  }
};

// 安全模式
// 无论是否使用new关键字都可以创建所需的实例，称为安全模式创建工厂类-也就是是工厂方法模式
function createFactory(type,param){
  if(this instanceof createFactory){
    return new this[type](param)
  }else{
    return new createFactory(type,param);
  }
}
// 真正创建类的方法放到工厂函数中的原型上
createFactory.prototype = {
  nba: BasketBall,
  worldCup: Football
};
// 调用方式
let ball = createFactory('nba','篮球');
// 或
let ball2 = new createFactory('nba','篮球');

