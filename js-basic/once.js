/**
 * 只会执行一次的函数
 * @param {被执行的函数} fn 
 * @returns 
 */
function myOnce(fn) {
  let tag = true;
  return function () {
    if (tag === true) {
      fn.apply(null, arguments);
      tag = false;
    }
    return undefined;
  };
}
