/**
 * Number.prototype.toFixed 并不是真正的四舍五入，而是让 n * 10^f - x的精确值尽可能趋近于0，如果存在两个这样的n，则去较大的n。如：
 * 
 * 1.335.toFixed(2); // 1.33
 * 
 */

Number.prototype.toMyFixed = function(length){
  let carry = 0; // 进位标志
  // num为原浮点数放大multiple倍后的数，multiple为10的length次方
  let num, multiple;
  // 将数字转换成字符串
  let str = this + '';
  // 小数点的位置
  let dot = str.indexOf('.');
  if(str.substring(dot+length+1,1) >= 5) carry = 1;
  console.log(str.substring(dot + length + 1, 1));
  multiple = Math.pow(10,length);
  num = Math.floor(this * multiple) + carry;
  let result = num / multiple + '';
  // 处理进位后无小数
  dot = result.indexOf('.');
  if(dot < 0){
    result += '.'
    dot = result.indexOf('.')
  }
  // 处理多次进位
  let len = result.length - (dot + 1);
  if(len < length){
    for(var i = 0;i< length - len;i++){
      result += 0;
    }
  }
  return  result
}

let num = 1.335;

num.toMyFixed(2);