### 了解ssr

#### 什么事服务端渲染
服务端渲染也称作 SSR(Server Side Render) 。不同于客户端渲染，服务端渲染会在后端把页面 DOM 的结构树转成 String 吐出来，然后到前端（如浏览器）解析渲染。

#### 服务端渲染的优势
>seo
现在单页面应用由于体验好，广泛流行。但单页应用的做法往往是后端只吐出一个页面的框架，里面没有具体内容，然后前端通过 Ajax 动态拉取内容。这就导致爬虫去访问你的站点时，服务端返回给爬虫的只有一个架子，爬虫无法抓取页面关键词之类等信息。

>首屏直出 
意思很好理解，就是在用户首次访问的时候不用再看到菊花在那里转呀转 (Loading...) ，首屏就可以看到页面所有内容。另外可以在服务端通过 HTTP 接口合并请求等方式，让页面打开的首屏时间缩短。


#### 服务端渲染资源加载问题

node require 默认就只支持加载 .json .js 等几种文件，所以如何保证客户端渲染出来的代码跟服务端渲染出来的代码一致呢（在 react 应用中，react 会检查客户端渲染出来的结构是否跟客户端渲染出来的一致，如果不一致的话，会在客户端重渲染）？这里提供两套思路：

- 客户端跟服务端用同一套 webpack 打包后的资源。webpack-isomorphic-tools 可以很好的解决这个问题，或者最新的 webpack 版本 target: node 也能实现。

- png/jpg/font 等文件直接忽略（在 babel-register 里可以设置），scss/css的话，用 css in js 的方式写。

#### 存在问题

首当其冲的就是服务器 cpu 过高问题，因为现在页面结构是在服务端以 renderToString 的方式输出，所以页面请求路由会涉及到大量的计算。这就会导致如果页面并发高一点的话，会出现 cpu 过高的问题。

另外在服务端可没有什么 window 、 document 对象，这些东西也需要去 hook 掉；在 React 应用中，componentDidMount 等生命周期函数也不会在服务端触发；定时器记得及时释放，否则可能会导致内存泄露的风险！

采用的成熟的框架 vue 体系下的 Nuxt.js
react 体系下比较有代表性的 next.js


#### 导致cpu占用高的原因

- renderToString输出，页面请求路由会涉及到大量的计算，并发高导致cpu占用高
- 定时器释放，考虑内存泄露的风险
- QPS查询
- 每秒查询率QPS是对一个特定的查询服务器在规定时间内所处理流量多少的衡量标准。

#### 前端加载优化

-  Code Split
-  动态加载方案（dynamic import）


#### VUE SSR 文档

- 避免在beforeCreate 和 created产生副作用代码

此外还需要注意的是，你应该避免在 beforeCreate 和 created 生命周期时产生全局副作用的代码，例如在其中使用 setInterval 设置 timer。在纯客户端(client-side only)的代码中，我们可以设置一个 timer，然后在 beforeDestroy 或 destroyed 生命周期时将其销毁。但是，由于在 SSR 期间并不会调用销毁钩子函数，所以 timer 将永远保留下来。为了避免这种情况，请将副作用代码移动到 beforeMount 或 mounted 生命周期中。