// Object.keys

// 返回的属性具有什么特性？A：必须是可枚举的属性
let obj = {
  a: 1,
  b: 2,
  c: 3,
};

Object.keys(obj); // [a,b,c]

// 包含继承的属性吗？A：是包含的
class A {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log("Hello!,I'm " + this.name);
  }
}
class B extends A {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

const b = new B("kiko", 20);
Object.keys(b); // [ 'name', 'age' ]

// 返回的顺序
// A: 数字属性会按照大小排序，字符串则会按照定义的顺序返回，负数和小数是不排序的，会当成字符串处理
var obj3 = {
  5: "5",
  0: "0",
  a: "a",
  c: "c",
  b: "b",
  10: "10",
  0.4: 0.4,
};
Object.keys(obj3);

//
Object.keys(null); // 报错
Object.keys(undefined); // 报错
Object.keys(123); // []
Object.keys("123"); // ['1','2','3']
