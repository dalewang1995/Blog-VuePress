---
title: H5 短信、电话
tags:
  - H5开发
---

### H5短信兼容写法

- 判断当前客户端

```js
   // 浏览器的用户代理报头
  let u = navigator.userAgent;
  let smsurl = '';
  // 短信内容需要转码
  smstextArea = encodeURIComponent(textArea)
  if(/(iPhone|iPad|iPod|iOS)/i.test(u))
  {
    smsurl = `sms:${customerPhone}&body=${smstextArea}`
  }else{
    smsurl = `sms:${customerPhone}?body=${smstextArea}`
  }

```

```html
<!--Andriod-->
<a href="sms:131***?body=我是短信内容">发送短信</a>
<!--IOS-->
<a href="sms:131***&body=我是短信内容">发送短信</a>

```


### H5 打电话兼容写法

```html
<a href="tel:131***">联系我</a>
```
### 注意
- 目前一次发多条短信的发送方式，大多数手机都不支持。
- h5调用系统短信时，在微信打开，会有弹窗。
- 如果电话号码有分机号（#）的话，需要进行转码为（%23）