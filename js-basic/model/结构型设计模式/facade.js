/**
 * 外观模式。
 * 
 * 应用场景： 对底层结构兼容性做统一封装来简化用户使用
 */


// 绑定事件做兼容处理，避免直接onclick这种DOM0级事件
function addEvent(dom,type,fn){
  if(dom.addEventListener){
    dom.addEventListener(type,fn,false);
  }else if(dom.attachEvent){
    dom.attachEvent('on' + type,fn);
  }else{
    dom['on' + type] = fn;
  }
}


var getEvent = function(event){
  // 标准浏览器返回event，IE返回widow.event
  return event || window.envet;
}

var getTarget = function(event){
  var event = getEvent(event);
  // 标准浏览器返回event.target，IE返回event.srcElement
  return event.target || event.srcElement;
}

// 阻止默认行为
var preventDefault = function(event){
  var event = getEvent(event);
  if(event.preventDefault){
    event.preventDefault();
  }else{
    event.returnValue = false;
  }
}