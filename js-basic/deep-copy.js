let book = {
  title: "《设计模式》",
  classify: ["js", "web"],
};

let o = copy(book);
o.classify.push("设计模式");
o.title = "《高级程序设计》";
console.log(o); // { title: '《高级程序设计》', classify: [ 'js', 'web', '设计模式' ] }
console.log(book); // { title: '《设计模式》', classify: [ 'js', 'web', '设计模式' ] }

// 浅拷贝
function copy(source) {
  let target = {};
  for (let prop in source) {
    // 判断是否为自身属性
    if (source.hasOwnProperty(prop)) {
      target[prop] = source[prop];
    }
  }
  return target;
}

/**
 * 深拷贝：
 * 1. JSON.parse(JSON.stringify(obj));  会忽略 undefined和函数
 */

let obj = {
  name: "obj",
  arr: [1, 2, 3],
  un: undefined,
  n: null,
  fnc: function () {
    console.log("函数");
  },
};
let o2 = JSON.parse(JSON.stringify(obj));
// 会忽略undefined和函数
console.log(o); // { name: 'obj', arr: [ 1, 2, 3 ], n: null }
o2.arr.push(4);
console.log(o); // { name: 'obj', arr: [ 1, 2, 3, 4 ], n: null }
console.log(obj); // {name: 'obj', arr: [ 1, 2, 3 ], un: undefined, n: null, fnc: ƒ}

// 深拷贝
const deepCopy = (source) => {
  if (typeof source !== "object" || source === null) return source;
  if (source instanceof Date) return new Date(source);
  if (source instanceof RegExp) return new RegExp(source);
  // let target = source instanceof Array ? [] : {};
  // 等同于
  // constructor()返回构造函数，new则是创建一个实例
  let target = new source.constructor();
  for (let prop in source) {
    // 仅仅复制自身属性
    if (source.hasOwnProperty(prop)) {
      // 如果属性值是引用类型({}或者[]) 则进行递归复制，基本数据类型则直接复制即可
      if (source[prop] && typeof source[prop] === "object") {
        target[prop] = deepCopy(source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
};
