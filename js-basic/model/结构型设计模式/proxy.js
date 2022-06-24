/**
 * 
 * 代理模式，proxy
 * 由于一个对象不能直接引用另一个对象，所以需要通过代理对象在这两个对象之间起到中介作用。
 * 应用场景： 跨域、图片懒加载
 */


// 统计代理
var Count = (function(){
  var _img = new Image();
  return function(param){
    var str = "http://www.count.com/?"
    for(var i in param){
      str += i + '=' + param[i]
    }
    _img.src = src
  }
})
Count({num: 10})



class MyImage{
  constructor(){
    this.img = new Image();
    // 插入一张图片
    document.body.appendChild(this.img);
  }
  setSrc(src){
    this.img.src = src;
  }
}

class ProxyImage{
  constructor(){
    this.ProxyImage = new Image();
  }

  setSrc(src){
    let myImageObj = new MyImage();
    myImageObj.img.src = 'file://xxx.png';// 本地url
    this.ProxyImage.src = src;
    this.ProxyImage.onload = function(){
      myImageObj.img.src = src;
    }
  }
}

var proxyImage = new ProxyImage();
proxyImage.setSrc('http://xxx.png');