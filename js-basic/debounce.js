/**
 * 防抖: 持续触发某时间时不执行函数，不触发指定时间(一段时间)后执行函数
 */

// 比如最经常遇到的 input 搜索框，肯定不是边输入边搜素，而是输入完，停多少秒时才触发搜索函数

function inputRequest(param) {
  console.log("输入的参数", param);
}

/**
 *
 * @param {要被执行的函数} fn
 * @param {等待触发的时间} wait
 */
function debounce(fn, wait) {
  let timer;
  return function (args) {
    // 指向需要调用函数本身
    // const _this = this;
    // console.log(_this);
    // 为了保留调用函数的传参
    // const args = arguments;
    // 先移除定时器，避免多个定时器同时存在
    clearTimeout(timer);
    // timer = setTimeout(function () {
    //   fn.apply(_this, args);
    // }, wait);
    timer = setTimeout(() => {
      console.log(this);
      fn.apply(this, args);
    });
  };
}

let oInput = document.getElementById("search");

// 未使用防抖函数调用请求数据
oInput.addEventListener("keyup", function (e) {
  inputRequest(e.target.value);
});

// 使用防抖函数。表示如果用户在输入时停顿了1秒钟，则会触发请求函数。如果在停顿的1秒钟之内又重新输入了，则不会触发请求函数。
let debounceRequest = debounce(inputRequest, 1000);
oInput.addEventListener("keyup", function (e) {
  debounceRequest(e.target.value);
});
