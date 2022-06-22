/**
 * Builer建造者模式，将一个复杂对象的构建层与其表示层相互分离
 * 工厂模式主要是为了创建对象实例或者抽象工厂，关心的是最终产出是什么，不关心创建的整个过程，仅仅需要知道你最终创建的结果。
 * 建造者模式在创建对象时要更为复杂一些，虽然目的也是为了创建对象，单更多关心的是创建这个对象的整个过程，甚至是创建对象的每个细节。
 * 
 */

// Human构造函数
function Human(param){
  // 
  this.skill = param && param.skill || "保密";
  this.hobby = param && param.hobby || "保密";
}
Human.prototype = {
  getSkill: function(){
    return this.skill
  },
  getHobby: function(){
    return this.hobby;
  }
}

var Named = function(name){
  var that = this;
  (function(name,that){
    that.wholeName = name;
    if(name.indexOf(' '> -1)){
      that.FirstName = name.slice(0,name.indexOf(' '));
      that.secondName = name.slice(name.indexOf(' '));
    }
  })(name,that)
}

var Work = function (work) {
  var that = this;
  (function (work, that) {
    switch(work){
      case 'code':
        that.work = '工程师';
        break;
      case 'UE':
        that.work = '设计师'
        break;
      default:
        that.work = work;
    }
  })(work, that);
};

Work.prototype.changeWork = function(work){
  this.work = work;
}

// 关注构造时的细节
var Person = function(name,work){
  var _person = new Human();
  // 关注构造函数属性细节
  _person.name = new Named(name);
  // 关注构造函数属性细节
  _person.work = new Work(work);
  return _person;
}