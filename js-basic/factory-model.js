/**
 *  设计模式
 */


/**
 * 
 * 简单工厂模式： 静态工厂方法，由一个工厂对象决定创建某一种产品对象类的实例。
 * 
 * 应用场景：创建单一(同一类)对象
 */
function simpleFactory(name,type){
  // 创建对象，拓展属性和方法
  var o = new Object();
  o.name = name;
  o.type = type;
  o.getName = function(){
    console.log(this.name)
  }
  return o;
}

let o = simpleFactory('对象','type');


/**
 * 工厂方法模式： 通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例
 */