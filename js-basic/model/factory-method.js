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

// 安全模式