## UI 实现需要关注的细节-小程序版


### iphone 6真机对照

电脑连接sketck 手机下载sketck Mirror

### 需要关注的点


1. 底部阴影的使用（box-shadow ）
2. 字体颜色，参考字体标准
3. 透明度，需要使用backgroung rgba的方式， 否则会影响子元素(继承的原因)
4. 字体的字重问题
5. 1px 边框

### 标准色

参考ui给出的标准色标注

## 字重的css对照

#### font-weight 的取值
font-weight 的值有两种，一种是数值 100 到 900 之间的整百，还有一种是描述性的单词分别有 normal 、 bold 、 lighter 以及 bolder。其默认值是 normal。

#### font-weight
100 - 900 常见

- 100 - Thin (Hairline)
- 200 - Extra Light (Ultra Light)
- 300 - Light
- 400 - Regular (Normal,Book,Roman)
- 500 - Medium
- 600 - Semi Bold (Demi Bold)
- 700 - Bold
- 800 - Extra Bold (Ultra Bold)
- 900 - Black (Heavy)



#### 字体匹配算法

当css中指定的字重数值在字体重没有对应字重时，就需要 字体匹配算法(font-matching-algorithm) 来解决这个问题。算法大概意思就是： 如果指定的font-weight数值，在字体中有对应的字重，那么就匹配为该对应的字重，否则就按照一定的规则来处理 
规则如下：

1. 字重小于400，先找小于400的，如果没有，就找大的，匹配最邻近的。
2. 字重大于500，先找大于500的，如果没有，就找小的，匹配最邻近的。
3. 字重等于400，先匹配500，如果没有，按照第一个小于400规则执行。
4. 字重等于500，先匹配400，如果没有，按照第一个小于400规则执行。
 
 
 
