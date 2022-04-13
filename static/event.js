const { nextTick } = require('process');

const EventEmitter = require('events').EventEmitter;
const events = new EventEmitter();

// 绑定事件
events.on('testFn',(data) => {
  console.log('普通的event--',data)
})
events.on('nextTickFn', function () {
  console.log('nextTick中的event--');
});
events.on('setTimeoutFn', function () {
  console.log('setTimeout中的event--');
});
events.on('promiseFn', function () {
  console.log('Promise.resolve的event--');
});

// 触发事件

setTimeout(function() {
  console.log('setTimeout')
}, 0);
setImmediate(function() {
  console.log('setImmediate')
});
function complexOperations() {
  setTimeout(() => {
    events.emit('setTimeoutFn','timeout方法');
  },0)
  Promise.resolve().then(() => {
    events.emit('promiseFn','测试文案');
  })
  nextTick(function () {
    events.emit('nextTickFn','成功的回调--nextTick');
  });
  events.emit('testFn','同步文案');
  // return events;
};
complexOperations();

// 同步 > nextTick > Promise > setTimeout