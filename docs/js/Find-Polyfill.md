###  find Polyfill Review

find 在IE 11（包含11）之前都不支持

兼容性说明： https://www.caniuse.com/#search=find

关于find 的用法： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find

兼容性写法：

```js
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
		// 调用find的数组
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      // 做无符号右移操作
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len  
      // 当 k < len 时,执行循环.
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        // kValue为索引k对应的值.
        var kValue = o[k];
        // 执行callback,this指向thisArg,参数有三个.分别是kValue:值,k:索引,O:原数组.
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined. 
      return undefined;
    }
  });
}
```


#### 关于 无符号右移操作符 ```>>> ```

``` var len = o.length >>> 0; ```

借助右移位运算符 用零填充 len 左边空出的位，这样做的好处是如果 length 未定义就取0.

1. 所有非数值转换成0
2. 所有大于等于 0 等数,取整数部分


关于更多位移操作符：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators



#### 疑问点：

1. var o = Object(this);  这是为了解决什么问题？
https://stackoverflow.com/questions/6498487/whats-the-point-of-var-t-objectthis-in-the-official-implementation-of-for
2. find 第二个参数问题

```call（）```
在 fun 函数运行时指定的 this 值。if(thisArg == undefined|null) this = window，if(thisArg == number|boolean|string) this == new Number()|new Boolean()| new String()

经过和小伙伴的探讨初步得出以下观点，主要就是使用call 改变this 的指向，使用除window外的其他对象。

![](https://user-gold-cdn.xitu.io/2019/9/20/16d4ca5606b72be0?w=760&h=550&f=png&s=99762)

欢迎感兴趣的朋友继续探讨...



#### 致谢

感谢身边同事的答疑解惑，和朋友们的热心帮助。
