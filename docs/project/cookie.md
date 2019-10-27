### cookie 你咋还没整明白？


#### 1. cookie 比较重要的属性



##### 过期时间（expires）
`expires`的值是一个时间点（cookie失效时刻= expires）

`Expires` 为 Cookie 的删除设置一个5分钟的过期的日期

```js
var d = new Date();
d.setTime(d.getTime() + 5*60*1000); // in milliseconds
document.cookie = 'foo=bar;path=/;expires='+d.toGMTString()+';';
// GMT 格式的时间
```

##### 存活时间（max-age）
`max-age` 的值是一个以秒为单位时间段（cookie失效时刻= 创建时刻+ max-age）

`max-age` 的默认值是 -1(即有效期为 session )；若max-age有三种可能值：负数、0、正数。负数：有效期session；0：删除cookie；正数：有效期为创建时刻+ max-age

`Max-age` 设置一个 Cookie 将要过期的秒数

```js
document.cookie = 'foo=bar;path=/;max-age='+5*60+';';
```

##### 为什么有的过期时间是1969 ？
> 1969-12-31T23:59:59.000Z
```js
console.log(new Date('1969-12-31T23:59:59.000Z').getTime())
// -1000
```
根据测试的4款浏览器这种cookie的过期时间显示如下：
- FireFox：会话
- Safair：会话
- Chrome：1969-12-31T23:59:59.000Z
- Opera：1969-12-31T23:59:59.000Z

这个cookie称为 Session Cookie ，将会一直存在直到关闭浏览器，（在不设置过期时间的情况下，这个是默认值）


##### 问：我应该设置哪个？

答：`expires`，浏览器实现比较好，所有浏览器会正确使用它来保存 Cookie，只需要记得像上边示例那样设置它的 GMT 时间就行了。

##### domain 选项

指定了 cookie 将要被发送至哪个或哪些域中。默认情况下，domain 会被设置为创建该 cookie 的页面所在的域名，所以当给相同域名发送请求时该 cookie 会被发送至服务器。例如，

设置 .tujia.com

- fvt.tujia.com
- www.tujia.com
- m.tujia.com 
- ....tujia.com
都可以使用


但是设置了 .fvt.tujia.com

- tujia.com
- ddd.tujia.com
不可以使用

可以使用下面的语句在浏览器中尝试
```js
document.cookie = "example=2; expires=Mon, 11 Nov 2026 07:34:46 GMT; domain=test.com;path=/"
"example=2; expires=Mon, 11 Nov 2020 07:34:46 GMT; domain=test.com;path=/"
```

关于cookie域的详细讨论：[这里stackoverflow](https://stackoverflow.com/questions/1062963/how-do-browser-cookie-domains-work)

##### path

path 选项值会与 /test，/test2 等等相匹配；任何以 /test 开头的选项都是合法的。需要注意的是，只有在 domain 选项核实完毕之后才会对 path 属性进行比较。path 属性的默认值是发送 Set-Cookie 消息头所对应的 URL 中的 path 部分

所以`domain`和`path`2个选项共同决定了cookie何时被浏览器自动添加到请求头部中发送出去。如果没有设置这两个选项，则会使用默认值。domain的默认值为设置该cookie的网页所在的域名，path默认值为设置该cookie的网页所在的目录。

##### HTTP-Only cookies

一般来说，只有服务器操作Cookie 才能保证一些必要的安全。但有时候，可能需要前端来增删改查 Cookie, 这个时候咱们的主角出现了——HttpOnly

`documen.coookie` 不能读取到 当然也不能设置和更改


#### 2.session 是啥？

session 的概念 ？

一个会话状态，不是实际存在的东西

session 的实现 ？

Session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中；

session id 存在前端浏览器的cookie 中，比如常说、的token

...