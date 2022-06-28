/**
 * 观察者模式，Observer。
 * 又称为发布订阅模式或者消息模式，非常著名且重要的模式。该模式一般会定义一个主体和众多的个体。主体可以当成一个消息中心，里面有各种各样的消息。众多的个体可以订阅不同的消息，当消息中心发布某条消息的时候，订阅过它的个体就会得到通知。
 */

// 消息中心
var msgCenter = (function () {
  var _msg = {};
  return {
    // 订阅消息
    subscribe: function (type, fn) {
      if (_msg[type]) {
        _msg[type].push(fn);
      } else {
        _msg[type] = [fn];
      }
    },
    // 发布
    launch: function (type, args) {
      if (!_msg[type]) {
        // 没有注册
        return;
      } else {
        let event = {
          type: type,
          args: args || {},
        };
        for (var i = 0; i < _msg[type].length; i++) {
          _msg[type][i](event);
        }
      }
    },
    // 取消订阅
    cancel: function (type, fn) {
      if (!_msg[type]) {
        return;
      }
      for (var i = 0; i < _msg[type].length; i++) {
        if (_msg[type][i] === fn) {
          // 删除
          _msg[type].splice(i, 1);
          break;
        }
      }
    },
  };
})();

function newOne() {
  this.alreadyRegister = {};
}
// 订阅
newOne.prototype.subscribe = function (type, fn) {
  if (this.alreadyRegister[type]) {
    console.log("你已经订阅了消息，请不要重复订阅");
  } else {
    msgCenter.subscribe(type, fn);
    this.alreadyRegister[type] = fn;
  }
};
// 取消
newOne.prototype.cancel = function (type) {
  msgCenter.cancel(type, this.alreadyRegister[type]);
  delete this.alreadyRegister[type];
};

var news1 = new newOne();
var news2 = new newOne();
var news3 = new newOne();
news1.subscribe("carInfo", function (e) {
  console.log("news1得到了关于" + e.type + "的消息");
});
news2.subscribe("carInfo", function (e) {
  console.log("news2得到了关于" + e.type + "的消息");
});
news3.subscribe("carInfo", function (e) {
  console.log("news3得到了关于" + e.type + "的消息");
});

msgCenter.launch("carInfo", { info: "新款上市" });




let Observer = (function(){
  //
})