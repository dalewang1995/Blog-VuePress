---
title: 带你了解fetch
date: 2018-07-10 22:49:23
type: "tags"
tags:
  - 异步JavaScript
---


#### fetch 简介 
由于 Fetch API 是基于 Promise 设计，有必要先学习一下 Promise，推荐阅读 MDN Promise 教程。旧浏览器不支持 Promise，需要使用 polyfill es6-promise 。
可以解决多次调用的回调问题，基于Promise设计，使用then方法实现链式调用，返回的方法也是Promise。但是Fetch 还不是一个开箱即用的api，需要对他的api进行简单封装，才能更方便的调用。

#### fetch 优点
- Fetch基于Promise实现，异步请求更加合理
- 将具体实现的方法和属性分布到不同对象之上(Request、Response和Headers)
- fetch返回Promise对象，可以避免回调函数的过多嵌套，代码简洁
- 可以使用async/await，能进一步得到优化代码

#### fetch 缺点
- 当前还存在一定的浏览器兼容性问题，这一点不如Ajax兼容性好
- 无法中途中断Fetch请求和获取Fetch请求进度，由Promise特性所决定
- api偏底层，使用需要进一步封装

#### fetch 封装

以post为例

```js
fetch('/users', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
```

#### 后续继续待更新
