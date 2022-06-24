/**
 * Adapter 适配器模式。 常见的模式
 * 将一个类(对象)的接口（属性或方法）转换成另外一个接口，以满足用户需求，使类(对象)之间接口的不兼容问题通过适配器得以解决。
 * 
 */


// 如果需要适配的两个框架写法相近。如正在使用的A框架和jQuery框架很相似
// 则可以这么写，然后就可以直接用JQuery的方式写A框架
window.A = A = jQuery;

// 如果两个框架差异比较大
var A = A || {};
// 获取元素
A.g = function(id){
  return document.getElementById(id);
}
// 元素绑定事件
A.on = function(id,type,fn){
  var dom = typeof id === 'string' ? this.g(id) : id;
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    dom.attachEvent("on" + type, fn);
  } else {
    dom["on" + type] = fn;
  }
}
// 加载事件
/*
A.on(window,'load',functino(){
  // 按钮点击事件
  A.on('mybutton','click',function(){

  })
})
*/

// 参数适配
function fn(obj){
  var _adapter = {
    name: 'Len',
    age: 20
  }

  for(var i in _adapter){
    _adapter[i] = obj[i] || _adapter[i]
  }
}


// 数据适配
var arr = ['js','book','前端编程语言','2022'];
// 数据结构语义不太友好，将其适配成对象

function arrToObj(arr){
  return {
    name: arr[0],
    type: arr[1],
    title: arr[2],
    data: arr[3]
  }
}