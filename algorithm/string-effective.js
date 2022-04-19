// 判断字符串是否有效
/**
 * 
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。 有效字符串需满足：
 * 1. 左括号必须用相同类型的右括号闭合。
 * 2. 左括号必须以正确的顺序闭合

示例 1：
输入：s = "()"
输出：true

示例 2：
输入：s = "()[]{}"
输出：true

示例 3：
输入：s = "(]"
输出：false

示例 4：
输入：s = "([)]"
输出：false

示例 5：
输入：s = "{[]}"
输出：true
 * 
 * 
 * 
 * 
 */

/**
根据题目推断出：
字符串s的长度一定是偶数，不可能是奇数(一对对匹配)。
右括号前面一定跟着左括号，才符合匹配条件，具备对称性。
右括号前面如果不是左括号，一定不是有效的括号
 */


// 暴力消除： 把 []、{}、() 成对消除
// console.time();
const isEffectiveString = (s) => {
  while(true){
    let len = s.length;
    s = s.replace('[]','').replace('()','').replace('{}','');
    if(s.length === len){
      return len === 0;
    }
  }
}
// console.endTime();

isEffectiveString('[({})]') // true
isEffectiveString('[]({})') // true
isEffectiveString('(]') // false


const isValid = (s) => {
  // 空字符串符合条件
  if (!s) {
    return true
  }
  const leftToRight = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  const stack = []
  for (let i = 0, len = s.length; i < len; i++) {
    const ch = s[i]
    // 如果leftToRight存在则将存入stack中
    if (leftToRight[ch]) {
      stack.push(ch) // stack[]: 0-( 1-[ 2-{
    } else {
      // 右括号开始匹配
      // 1. 如果栈内没有左括号，直接false
      // 2. 有数据但是栈顶元素不是当前的右括号，说明是非对称的
      if (!stack.length || leftToRight[stack.pop()] !== ch) {
        return false
      }
    }
  }
  // 最后检查栈内还有没有元素，有说明还有未匹配则不符合
  return !stack.length
}

isValid('[({})]') // true
isValid('[]({})') // true
isValid('(]') // false

/**
 * 输入：s = "{[()]}"
第一步：读取ch = {，属于左括号，入栈，此时栈内有{
第二步：读取ch = [，属于左括号，入栈，此时栈内有{[
第三步：读取ch = (，属于左括号，入栈，此时栈内有{[(
第四步：读取ch = )，属于右括号，尝试读取栈顶元素(和)正好匹配，将(出栈，此时栈内还剩{[
第五步：读取ch = ]，属于右括号，尝试读取栈顶元素[和]正好匹配，将[出栈，此时栈内还剩{
第六步：读取ch = }，属于右括号，尝试读取栈顶元素{和}正好匹配，将{出栈，此时栈内还剩''
第七步：栈内只能''，s = "{[()]}"符合有效的括号定义，返回true
 */