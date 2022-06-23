// 形参和实参
/**
 * 1. 实参： 实际传递的参数，在函数调用时传递
 * 2. 形参： 接收函数在调用的时候传入的具体参数值
 */

function fn(a, b) {
  // a,b 为形参
  return a + b;
}
function fn2() {
  var a = 1,
    b = 2;
  // 这里的a,b为实参
  return fn(a, b);
}
var c = fn2();

/**
 * 形参不会影响实参的值
 */

let a = 1;
function fnc(a) {
  console.log(a); // 1
  a = 2;
  console.log(a); // 2
}
fnc(a);
console.log(a); // 1