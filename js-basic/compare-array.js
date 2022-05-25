// 比较两个数组是否相等
Array.prototype.isEqual = function (arr) {
  // 如果要比较的数组不存在或者两个数组的length不相等则直接返回
  if (!arr || this.length !== arr.length) {
    return false;
  }
  // this指向Array调用该方法的数组实例
  for (let i = 0; i < this.length; i++) {
    // 如果两个索引位置的元素又是数组，则递归调用isEqual方法进行判断
    if (Array.isArray(this[i]) && Array.isArray(arr[i])) {
      if (!this[i].isEqual(arr[i])) {
        return false;
      }
    } else {
      // 如果两者有元素不想等
      if (this[i] !== arr[i]) {
        return false;
      }
    }
  }
  return true;
};

// 自定义的原型方法不可枚举
// 如果不设置为不可枚举，则循环数组的时候isEqual方法也会被循环出来
Object.defineProperty(Array.prototype, "isEqual", {
  enumerable: false,
});
