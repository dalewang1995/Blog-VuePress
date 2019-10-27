---
title: 使用h5新特性 监听返回键
date: 2018-03-28 22:56:03
tags:
  - H5开发
---

### 前言

如今h5新特性、新标签、新规范等有很多，而且正在不断完善中，各大浏览器商对它们的支持，也是相当给力，比如video，audio，但是多多少少还是会存在一些兼容性问题。

### 起因

曾经接触过一个相关需求，用纯h5实现定制返回页面，比如 1->2->3 ,1是登录页面，2是索引页，3是详情页。首先经过登录页之后到索引页再按返回需要直接退出，详情页正常返回到索引页，当时采用的方法是替换历史记录，不过最近看到有更好的方法，特意记录学习下。

### 实现过程探究

传统方法

```js
	pushHistory(); 
	window.addEventListener("popstate", function(e) { 
	    alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能 
	}, false); 
	function pushHistory() { 
	    var state = { 
	        title: "title", 
	        url: "#"
	    }; 
	    window.history.pushState(state, "title", "#"); 
	}

```

更好的方法，

判断页面是否有hidden属性，有的话替换掉，进入新页面又会有hidden，以此达到监听的作用
```js
	var hiddenProperty = 'hidden' in document ? 'hidden' :    
		'webkitHidden' in document ? 'webkitHidden' :    
		'mozHidden' in document ? 'mozHidden' :    
		null;
	var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
	var onVisibilityChange = function(){
		if (document[hiddenProperty]) {    
			console.log('页面非激活');
		}else{
			console.log('页面激活')
		}
	}
	document.addEventListener(visibilityChangeEvent, onVisibilityChange);

```

### 代码兼容性

pushState在低版本微信浏览器中会存在问题，这个官方文档有说，后面介绍的方法安卓大于4.0基本都是没问题的，低版本可能在于navigator.userAgent内核版本过低。