### Input autocomplete
目前ios12以上系统是支持验证码填充功能的。可以在接收到验证码的时候自动在原生输入法上方显示验证码，点击验证码，会自动填充到输入框。
下面简单说下在h5中遇到的一些问题。

1. 自动填充两此验证码

    设置type="tel"属性 maxlength="4" 可以限制只输入固定长度验证码
2. input 默认的黄色背景去除
    ```css
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 60px #fff inset !important;
      background-color: #fff !important;
      background-clip: content-box !important;
    }
    ```
    
3. apple 开发者文档给出属性

    ``` id="single-factor-code-text-field" ```
    ``` autocomplete="one-time-code" ```

    实测加与不加都没有明显的效果。
    [apple 文档地址](https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element)

4. 目前的解决方式

   多此尝试后发现，在自动把input ```blur()``` 后，用户手动再次聚焦```focus() ``` 后，会带出验证码。


> 1. 目前在微信里面h5 页面，直接支持在不重新唤起键盘的情况下，显示验证码
> 2. 但是目前这个ios 系统级属性，在一些页面会出现验证码填充错输入框的情况，目前没有找到解决方案。。
    

