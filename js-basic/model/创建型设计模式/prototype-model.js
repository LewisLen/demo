/**
 * 
 * 原型模式 prototype。
 * 用原型实例指向创建对象的类。
 * 对于每次创建的一些简单而又差异化的属性放在构造函数中，将一些消耗资源比较大的方法放到基类的原型中。比较像组合式继承，都是基于原型链。
 * 
 * 特点： 原型对象是一个共享对象，那么无论是父类的实例对象或是子类的继承，都是对它的一个指向引用，所以原型对象才会被共享。所以无论是子类还是父类的实例对象都会继承原型对象上的属性和方法。所以在任何时候都能对父类或者子类进行扩展，但需要注意是否会影响到其他人。
 * 
 * 原型模式是JavaScript语言的灵魂。
 * 
 * 原型模式更多的是用在对对象的创建上。
 * 
 * 
 * 
 */

// 类
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
  },
  getContainer: function(){
    return this.imageArray.length;
  }
}

var SlideLoopImage = function(imgArr,container){
  // 构造函数继承图片轮播类
  LoopImages.call(this,imgArr,container);
}
// 原型指向构造函数的实例，也就是继承了构造函数原型上的方法
SlideLoopImage.prototype = new LoopImages();

// 重写继承下来的方法
SlideLoopImage.prototype.changeImage = function(){
  console.log("SlideLoopImage createImage function");
}

// 继承构造函数属性
var FadeLoopImg = function(imgArr,container){
  LoopImages.call(this,imgArr,container);
  this.arrow = arrow;
}
FadeLoopImg.prototype = new LoopImages();
// 重写方法
FadeLoopImg.prototype.changeImage = function(){
  console.log("FadeLoopImg changeImage function");
}


/**
 * 原型模式的对象复制方法
 */

function prototypeExtend(){
  var F = function(){},
    args = arguments,
    i = 0,
    len = args.length;

  for(;i<len;i++){
    for(var key in args[i]){
      F.prototype[key] = args[i][key]
    }
  }

  return new F();
}