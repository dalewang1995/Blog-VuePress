### 理解组件通信之：provide / inject

在前端的Vue项目中，如果需要跨组件通信，比如父组件A，子组件B，孙子组件C，A给C传递数据，又不想使用Vuex，Bus等方式，引入第三方库，想更简单的实现组件跨级通信，那么Vue的原生API，`provide / inject` 是个不错的选择。


### 什么是 provide / inject

`provide / inject` 是vue 2.2.0 版本增加的方法，这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

文档地址：https://cn.vuejs.org/v2/api/#provide-inject

> vue官方文档说，主要为高阶插件/组件库提供用例，并不推荐直接用于应用程序代码中。

虽然官方这么建议，但是如果学会了这种方法，结合需要的业务，还是能发挥出很好的效果的。


### 使用方式

- provide：`Object | () => Object`
- inject：`Array<string> | { [key: string]: string | Symbol | Object }`


- provide ：可以是一个对象或者是一个返回对象的函数
- inject ：可以是一个字符串类型的数组或者是一个对象


```js
// A.vue
export default {
// provide 是一个对象
provide: {
name: 'dale'
}
}

// B.vue
export default {
// inject 为一个字符串数组
inject: ['name'],
mounted () {
console.log(this.name);  // dale
}
}

```

但是需要注意的是`provide` 和 `inject` 绑定并不是可响应的,也就是说父组件改变了值，默认情况下后辈组件是不会响应式变化的，但是这个可以用其他方法实现响应式变化。

> 比如给 provide 里面传入响应式对象：

```js
// A.vue
export default {
data(){
return {
number:0
}
},
// 
// provide 是一个返回兑现的函数
provide() {
let observeObject = this.$data
return {
name: observeObject
}
},
methods:{
// 改变number ，B.vue 会接收到更新，因为$data是一个响应式对象
}

}

```

采用 `Vue.observable` 构建出一个响应式对象,同样可以实现响应式更新数据。

```js
// A.vue
const observeObject = Vue.observable({ number: 0 })
export default {

// provide 是一个返回兑现的函数
provide() {
return {
name: observeObject
}
},
methods:{
// observeObject.number 变化，B.vue 会接收到更新，因为observeObject是一个响应式对象
// data的返回对象也是经过此api处理的
}

}

```

响应式原理: https://cn.vuejs.org/v2/guide/reactivity.html

### 扩展延伸

`provide` 和 `inject` 的其他用法，高级技巧尝试。

`app.vue` 文件中把`this` 作为provide的值，可以把实例对外提供。所有子组件都可以直接通过 this.app.xxx 来访问 app.vue 的 data、computed、methods 等内容。

app.vue 是整个项目第一个被渲染的组件，而且只会渲染一次（即使切换路由，app.vue 也不会被再次渲染），利用这个特性，比较适合做一次性全局的状态数据管理，比如全局的登录信息等，
而不需要使用vuex等第三方状态管理工具。

`app.vue`

```js
export default {
provide () {
return {
app: this
}
}
// ...
}
```


```js
// 子组件
<template>
<div>
{{ app.userInfo }}
</div>
</template>
<script>
export default {
inject: ['app']
}
</script>

```

### 源码分析

vue 2.x 源码
- inject/provide 本质还是通过$parent向上查找祖先节点数据

```js
// src/core/instance/init.js
Vue.prototype._init = function (options?: Object) {
const vm: Component = this
...
vm._self = vm
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')

if (vm.$options.el) {
vm.$mount(vm.$options.el)
}
}
}

```


```js
// inject里的key，通过$parent向上找到provide值，再进行响应式监听
export function initInjections (vm: Component) {
const result = resolveInject(vm.$options.inject, vm)
if (result) {
Object.keys(result).forEach(key => {
defineReactive(vm, key, result[key]) // 响应式数据
})
}
}

export function resolveInject (inject: any, vm: Component): ?Object {
if (inject) {
const result = Object.create(null)
const keys = Object.keys(inject)

for (let i = 0; i < keys.length; i++) {
const key = keys[i]
const provideKey = inject[key].from
let source = vm
// 循环向上，直到拿到祖先节点中的provide值
while (source) {
if (source._provided && hasOwn(source._provided, provideKey)) {
result[key] = source._provided[provideKey] // provide是在initProvide中设置的
break
}
source = source.$parent // 关键代码
}
}
return result
}
}

```


```js
// 单纯把provide值，赋值给vm._provided。initInject中会使用到
export function initProvide (vm: Component) {
const provide = vm.$options.provide
if (provide) {
vm._provided = typeof provide === 'function'
? provide.call(vm)
: provide
}
}

```
