### JS 值分类

通过`typeof` 和 `instanceof` 将值分类（Categorizing values via typeof and instanceof）
有两个操作符可以用来将值分类：

- `typeof` 主要用来操作原始值

- `instanceof` 主要用来操作对象。

>`typeof`使用方法如下：

		typeof «value»
		
>它返回描述 value “类型”的一个字符串。例如：

```js

		>typeof true 'boolean'
		
		>typeof 'abc' 'string'
		
		>typeof {} 'object' //空对象字面量 
		
		>typeof [] 'object' //空数组字面量 

```

>下面列出了所有typeof的结果：

```js

	undefined -----'undefined'
	
	null ----- 'object'
	
	Boolean value	----- 'boolean'
	
	Number value -----	'number'
	
	String value	 ----- 'string'
	
	Function	----- 'function'
	
	All other values ----- 'object'

```

> 有两个东西和我们所说的原始值和对象是矛盾的：

- 函数的类型是“function”而不是“object”。鉴于函数（类型为“function”）是对象（类型是对象）的子类型，这不是一个错误。
- null的类型是“object”。这是一个bug，但从没被修复，因为修复后会破坏现有的代码。


### instanceof 本质：
- 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

>instanceof使用方法如下：

		«value» instanceof «Constr»

>如果 value 是一个对象，并且value 是由构造函数Constr创建的（考虑：类）。例如：

```js

	> var b = new Bar();  // 通过构造函数Bar创建对象
	
	> b instanceof Bar
	  true
	  
	> {} instanceof Object
	  true
	  
	> [] instanceof Array
	  true
	  
	> [] instanceof Object  // 数组是对象的子类型
	  true
```