## Canvas 图片压缩


### 图片上传前端处理的意义

- 限制图片大小，尺寸，提升用户体验
- 前端直接处理了图片为后端接口所接受的尺寸，较少二次处理，优化上传逻辑

### 代码实现


Image 对象代表嵌入的图像。

<img> 标签每出现一次，一个 Image 对象就会被创建。


```js
var eleFile = document.querySelector('#file');

    // 压缩图片需要的一些元素和对象
    var reader = new FileReader(), img = new Image();
    // 选择的文件对象
    var file = null; 

    // 缩放图片需要的canvas
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d'); 

    // base64地址图片加载完毕后
    img.onload = function () {
        // 图片原始尺寸
        var originWidth = this.width;
        var originHeight = this.height;
        // 最大尺寸限制
        var maxWidth = 400, maxHeight = 400;
        // 目标尺寸
        var targetWidth = originWidth, targetHeight = originHeight;
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
        }
            
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        // canvas转为blob并上传
        console.log('context',canvas.toDataURL())
        canvas.toBlob(function (blob) {
            // 图片ajax上传
            console.log('blob',blob)
            // 文件上传成功
  
        }, file.type || 'image/png');
    };

    // 文件base64化，以便获知图片原始尺寸
    reader.onload = function(e) {
        img.src = e.target.result;
    };
    eleFile.addEventListener('change', function (event) {
        file = event.target.files[0];
        // 选择的文件是图片
        if (file.type.indexOf("image") == 0) {
            reader.readAsDataURL(file);    
        }
    });




```