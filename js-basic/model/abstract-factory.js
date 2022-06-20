/**
 * 抽象工厂模式。
 * 对类的工厂进行抽象，而不是创建某一类产品的实例
 */

// Car类如果是直接用来实例化，则是没有意义的。没有什么属性，只有两个方法，调用了还会跑错。但是如果某个类继承了Car类，则会比较有用，可以调用Car的prototype的两个方法。
function Car(){};
Car.prototype =  {
  getPrice: function(){
    return new Error("这属于抽象方法，单纯用来报错用的");
  },
  getSpeed: function(){
    return new Error("这属于抽象方法，单纯用来报错用的");
  }
}

var VehicleFactory = function(subType,superType){
  // 判断抽象工厂中是否有抽象类
  if(typeof VehicleFactory[superType] === 'function'){
    function F(){}
    F.prototype = new VehicleFactory[superType]();
    subType.constructor = subType;
    subType.prototype = new F();
  }else{
    throw new Error('未创建该抽象类');
  }
}