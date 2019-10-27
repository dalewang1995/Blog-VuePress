## airbnb-javascript 标准学习笔记

当代码量达到一定级别的时候，有一种良好的代码规范，显得尤为的重要，最近公司团队打算推行eslint，来提升代码质量，提高程序的稳定性，而eslint 的标准有好几个版本，airbnb的标准比较不错，所以我先来学习一下。


1. 对象属性快速赋值

```js
	const lukeSkywalker = 'Luke Skywalker';
	
	// bad
	const obj = {
	  lukeSkywalker: lukeSkywalker,
	};
	
	// good
	const obj = {
	  lukeSkywalker,
	};
```

2. 对象扩展运算符

```js
	// good
	const original = { a: 1, b: 2 };
	const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
	
	const { a, ...noA } = copy; // noA => { b: 2, c: 3 }

```

3. 使用扩展运算符复制数组

```js
	const itemsCopy = [...items];

```

4. 数组的方法

```js

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map(x => x + 1);

// bad - no returned value means `acc` becomes undefined after the first iteration
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  acc[index] = flatten;
});

// good
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  acc[index] = flatten;
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});

```


5. 对象结构赋值

```js
	// best
	function getFullName({ firstName, lastName }) {
	  return `${firstName} ${lastName}`;
	}
```