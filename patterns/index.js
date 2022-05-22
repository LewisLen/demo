var checkObject = function(){
  return{
    checkName:function(){
      // checkName
    },
    checkPhone:function(){
      // checkPhone
    }
  }
}

/**
 * 方法挂在在原型上链式调用
 */

var CheckObject = function(){}

CheckObject.prototype = {
  checkName: function(){
    // checkName
    return this;
  },
  checkPhone: function(){
    // checkPhone
    return this;
  }
}

// 调用
var c = new CheckObject();
c.checkName().checkPhone();


// 在 Function 原型上添加方法

Function.prototype.addMethod = function(name,fn){
  this[name] = fn;
}
// 添加方法
var m = function(){}
m.addMethod('checkName',function(){
  // checkName
})