/**
 * 
 * 原型模式 prototype
 * 
 * 
 */

var LoopImages = function(imgArr,container){
  this.imageArray = imgArr;
  this.container = container;
}

LoopImages.prototype = {
  createImage: function(){
    console.log("LoopImage createImage function");
  },
  changeImage: function(){
    console.log("LoopImage changeImage function");
  }
}

var SlideLoopImage = function(imgArr,container){
  // 构造函数继承图片轮播类
  LoopImages.call(this,imgArr,container);
}
SlideLoopImage.prototype = new LoopImages();

// 重写继承的切换下一张图片方法
SlideLoopImage.prototype.changeImage = function(){
  console.log("SlideLoopImage createImage function");
}
