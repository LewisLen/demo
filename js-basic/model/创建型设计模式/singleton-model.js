/**
 * 单例模式。又称为单体模式，允许实例化一次的对象类。有时候也会用一个对象来规划一个命名空间，管理对象上的属性和方法。
 */

function getEle(id) {
  return document.getElementById(id);
}
function setCss(id, key, val) {
  getEle(id).style[key] = val;
}
function on(id, type, fn) {
  getEle(id)["on" + type] = fn;
}

// 单例对象
var Ming = {
  g: function (id) {
    return document.getElementById(id);
  },
  setCss: function (id, key, value) {
    this.g(id).style[key] = value;
  },
};

var Obj = {
  name: "obj",
  getFn: function () {
    console.log(this);
    return this.name;
  },
};

var createSingle = (function () {
  var _unique = null;
  function single() {
    return {
      name: "len",
    };
  }
  return function () {
    if (_unique === null) {
      _unique = single();
    }
    return _unique;
  };
})();

var obj1 = createSingle();
var obj2 = createSingle();
console.log(obj1 === obj2); // true

var Book = (function () {
  var book = {
    title: "《js设计模式》",
    price: 79,
  };
  return {
    get: function (prop) {
      return book[prop] ? book[prop] : null;
    },
  };
})();

// jQuery中利用别名方便调用
if (typeof window === "object" && typeof window.document === "object") {
  window.Book = window.b = Book;
}
