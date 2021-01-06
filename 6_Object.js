// 对象直接量
var empty = {};
var point = { x:0, y:0};

// 通过new创建对象
var o = new Object() // 继承自Object.prototype
var a = new Array() // 继承自Array.prototype
var d = new Date()
var r = new RegExp("js")

// 6.1.3 原型
var o1 = Object.create({x:1, y:2});

// 创建的对象没有原型对象，不继承任何东西，甚至不包括基础方法，比如toString
// 也就是说，它不能喝”+”运算符一起正常工作
var o2 = Object.create(null)

// 和{}、new Object() 一样
var o3 = Object.create(Object.prototype)

/// 例 6-1
/// 通过原型集成创建一个新对象
/// inherit()返回一个继承自原型对象p的属性的新对象
function inherit(p) {
  // p是一个对象，但不能是null
  if (p == null) throw TypeError();
  if (Object.create)
    // 直接使用create方法创建对象
    return Object.create(p)

  var t = typeof p;
  if (t !== "object" && t !== "function")
    throw TypeError();
  function f(){}; // 定义个空构造函数
  // 将原型属性设置为p
  f.prototype = p;
  // 使用f() 创建p的继承对象
  return new f();
}

var book = {
  "main title": "JavaScript",
  'sub-title':"The Definitive Guide",
  "for": "all audiences",
  author: {
    firstname: "David",
    surname: "Flanagan"
  }
}

// 删除对象属性
delete book.author;
delete book["main title"];

console.log(book.author);
// delete不能删除可配置型为false的属性
// 但是可以删除不可扩展对象的可配置属性
// 某些内置对象的属性是不可配置的，比如通过变量生命和函数生命创建的全局对象的属性
// 严格模式下，删除䘝不可配置属性会报一个类型错误
// 非严格模式下这样做会返回false


// 检测属性
// 可以通过in运算符/hasOwnProperty和propertyIsEnumerable方法
// 来完成这个工作，甚至仅通过属性查询也可以做到这一点
var o = {x:1}
"x" in o; // true
"y" in o; // false
"toString" in o; // true: o继承toString属性
o.hasOwnProperty("x"); // true
o.hasOwnProperty("toString") // false: toString是继承属性

// propertyIsEnumerable是hasOwnProperty的增强版
// 只有检测到是自由属性且这个属性的可枚举型(enumerable attribute)为true
// 时它才返回true。
// 某些内置属性是不可枚举的。通常由JavaScript代码创建的属性都是客枚举的。
var o = inherit({y: 2})
o.x = 1;
o.propertyIsEnumerable("x"); // true
o.propertyIsEnumerable("y"); // false:y是继承的
Object.prototype.propertyIsEnumerable("toString");//false:不可枚举

// 除了in运算符外，另一种简便方法
var o = {x:1}
o.x !== undefined; // true
o.y !== undefined; // false
o.toString !== undefined; // true

if (o.x != null) o.x *= 2;
if (o.x) o.x *= 2;

/// 例6-2 用来枚举属性的对象工具函数
/*
* 把p中的可枚举属性复制到o中，并返回o
* 如果o和p中含有同名属性，则覆盖o中的属性
* 这个函数并不处理getter和setter以及复制属性
*/
function extend(o, p) {
  for (prop in p) {
    o[prop] = p[prop]
  }
  return o;
}

// 合并
function merge(o, p) {
  for (prop in p) {
    if (o.hasOwnProperty(prop)) continue;
    o[prop] = p[prop];
  }
  return o;
}

// 如果o中的属性在p中没有同名属性，则从o中删除这个属性
// 返回o
function restrict(o, p) {
  for (var prop in o) {
    if (!(prop in p)) delete o[prop];
  }
  return o;
}
