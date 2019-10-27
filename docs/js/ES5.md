### object.keys()

Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。


...mapMutations(['setIsBcClient']),


## css

1. 竖线实现方式
2. 行内和块样式   padding margin
3. input  样式问题


## JS

类这一概念在 JavaScript 通过对象原型（object prototype）得到延续（有关 ES6 类的内容参考这里Classes）。另一个主要区别是 JavaScript 中的函数也是对象，JavaScript 允许函数在包含可执行代码的同时，能像其他对象一样被传递。

Array（数组）类型，以及分别用于表示日期和正则表达式的 Date（日期）和 RegExp（正则表达式），这三种类型都是特殊的对象。

-
#### 数据类型
- Number（数字）
- String（字符串）
- Boolean（布尔）
- Symbol（符号）（第六版新增）
- Object（对象）
  - Function（函数）
  - Array（数组）
  - Date（日期）
  - RegExp（正则表达式）
- Null（空）
- Undefined（未定义）

-

#### JavaScript 不区分整数值和浮点数值

```parseInt("hello", 10); // NaN```

如果给定的字符串不存在数值形式，函数会返回一个特殊的值 NaN（Not a Number 的缩写）。
要小心NaN：如果把 NaN 作为参数进行任何数学运算，结果也会是 NaN：

```NaN + 5; ```  //NaN

```isNaN(NaN);``` // true

可以使用内置函数 isFinite() 来判断一个变量是否是一个有穷数， 如果类型为Infinity, -Infinity 或 NaN则返回false：

```js
	isFinite(1/0); // false 
	isFinite(Infinity); // false 
	isFinite(NaN); // false 
	isFinite(-Infinity); // false 
	
	isFinite(0); // true 
	isFinite(2e64); // true 
	
	isFinite("0"); // true,如果是纯数值类型的检测，则返回false：	Number.isFinite("0");

```
-
JavaScript 包含布尔类型，这个类型的变量有两个可能的值，分别是 true 和 false（两者都是关键字）。根据具体需要，JavaScript 按照如下规则将变量转换成布尔类型：

- false、0、空字符串("")、NaN、null 和 undefined 被转换为 false
- 所有其他值被转换为 true

也可以使用 Boolean() 函数进行显式转换：

```js
Boolean(""); // false
Boolean(234); // true

```
不过一般没必要这么做，因为 JavaScript 会在需要一个布尔变量时隐式完成这个转换操作（比如在 if 条件语句中）。所以，有时我们可以把转换成布尔值后的变量分别称为 真值（true values）——即值为 true  和 假值（false values）——即值为 false；也可以分别称为“真的”（truthy）和“假的”（falsy）。

-
JavaScript 支持包括 &&（逻辑与）、|| （逻辑或）和!（逻辑非）在内的逻辑运算符。下面会有所提到。


&& 和 || 运算符使用短路逻辑（short-circuit logic），是否会执行第二个语句（操作数）取决于第一个操作数的结果。
##### 在需要访问某个对象的属性时，使用这个特性可以事先检测该对象是否为空：
```var name = o && o.getName();```
##### 或运算可以用来设置默认值：
```var name = otherName || "default";```
#### 类似地，JavaScript 也有一个用于条件表达式的三元操作符：
```var allowed = (age > 18) ? "yes" : "no";```

switch 和 case 都可以使用需要运算才能得到结果的表达式；在 switch 的表达式和 case 的表达式是使用 === 严格相等运算符进行比较的：

```js
	switch(1 + 3){
	    case 2 + 2:
	        yay();
	        break;
	    default:
	        neverhappens();
	}
	
```


### 状态模式 vuex



#### 1.30
1.mock数据只能get  
2.scss 写法


选择日期的bridge

```js
	bridge.chooseDate = function (callback, format, defaultValue, isWithTime) {
	///callback: optional. callback with choosed date/datetime string
	///format: optional. defaultValue and choosed value format will used in app. default:"yyyy-MM-dd". you can use "yyyy-MM-dd HH:mm" when isWithTime = true.
	///defaultValue: optional. default: Today/Now.
	///isWithTime: optional. default: false. false - choose date; true - choose datetime.
	var data = {};
	if (format) { data.format = format }
	if (defaultValue) { data.defaultValue = defaultValue }
	if (isWithTime) { data.isWithTime = isWithTime }
	bridge.callHandler("appChooseDate", data, callback);
	return bridge.ifSupportApi("appChooseDate");
	}
	bridge.chooseDateTime = function (callback, defaultValue) {
	/// see bridge.chooseDate above.
	bridge.chooseDate(callback, "yyyy-MM-dd HH:mm", defaultValue, true);
	}     
       
```
### scss

1. 命名空间
```css
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
```
2. 占位符选择器: %foo
```css
%foo {
	color: red;
}
@extend %foo

```

3.@at-root  指定父级元素 减少嵌套

待补充...



