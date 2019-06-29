---
title: 《WebGL编程指南》学习笔记——4.绘制一个点
comments: true
mathjax: true
abbrlink: 15b73260
date: 2017-12-24 18:33:59
tags:
  - WebGL
categories: learn
toc: true
description: '之前，我们学习了如何建立一个WebGL程序，如何使用一些简单的WebGL相关函数。这一节，我们进一步在一个示例程序中绘制一个最简单的图形：一个点以及弄懂一个重要的概念：着色器。'
---

之前，我们学习了如何建立一个WebGL程序，如何使用一些简单的WebGL相关函数。这一节，我们进一步在一个示例程序中绘制一个最简单的图形：一个点以及弄懂一个重要的概念：着色器。

此系列我编写的源码都可以在我的github下载到：[02HelloPoint1](https://github.com/hushhw/WebGL-Programming-Guide/tree/master/02HelloPoint1)

​                       

## HelloPoint1.html

```html

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>Draw a point</title>

</head>

<body onload="main()">

    <canvas id="webgl" width="400" height="400">

        Please use the browser supporting "canvas".

    </canvas>



    <script src="../lib/webgl-utils.js"></script>

    <script src="../lib/webgl-debug.js"></script>

    <script src="../lib/cuon-utils.js"></script>

    <script src="HelloPoint1.js"></script>

</body>

</html>

```

在HelloCanvas.html文件中比较简单，需要注意的是需要引入一些其他的文件来支持webgl，文件下载可以到https://github.com/hushhw/WebGL-Programming-Guide/tree/master/lib自行下载。

​          



## 着色器



WebGL依赖于一种新的称为着色器（shader）的绘图机制。着色器提供了灵活且强大的绘制二维或三维图形的方法，所有WebGL程序必须使用它。



HelloPoint1.js是这本书中使用着色器的第一个WebGL程序，在代码中，着色器程序是以字符串的形式“嵌入”在JavaScript文件中的，在程序真正开始运行前它已经设置好了。

​           



WebGL需要两种着色器：

###   **1. 顶点着色器（ Vertex shader ）**

顶点着色器是用来描述顶点特性（如位置、颜色等）的程序。**顶点**（vertex）是指二维或三维空间中的一个点，如二维或三维图形的端点或交点。

​            

###  **2.片元着色器（Fragment shader）**

片元着色器是进行逐片元处理过程如光照的程序。**片元**（fragment）是一个WebGL术语，你可以将其理解为像素（图像的单元）。

​             

在后续，我们会详细的学习着色器。简单的说，在三维场景中，仅仅用线条和颜色把图形画出来是远远不够的。你必须考虑如光线照上去后，或者观察者的视角发生变化时，对场景会有什么影响。着色器可以高度灵活的完成这些工作；提供各种渲染效果。这也就是现在制作的三维场景如此逼真的原因。



![](https://photo.hushhw.cn/images/20171224155525787.png)



图的左侧是两个浏览器窗口。它们是同一个窗口，上面一个是执行JS程序之前的窗口，下面一个执行之后的。 

程序执行的流程大概是：



 - 运行JS程序，调用了WebGL的相关方法。 

 - 顶点着色器和片元着色器会执行，在颜色缓冲区内进行绘制，这时就清空了绘图区。

 - 颜色缓冲区中的内容会自动在浏览器的 < canvas >上显示出来。



![](https://photo.hushhw.cn/images/20171224155749311.png)

​             

## 初始化着色器

“初始化着色器”我们调用辅助函数initShaders()对字符串形式的着色器进行了初始化。该函数被定义在lib文件夹下，前文提到下载方式了。

![](https://photo.hushhw.cn/images/20171224161606349.png)

![](https://photo.hushhw.cn/images/20171224161654909.png)



Web系统由两部分组成，即顶点着色器和片元着色器。在初始化着色器之前，顶点着色器和片元着色器都是空白的，我们需要将字符串形式的着色器代码从JavaScript传给WebGL系统，并建立着色器，这就是initShaders()函数要做的事情。着色器运行在WebGL系统中，而不是JavaScript程序中。



initShaders()函数执行成功后，着色器被创建好了并随时可以使用，顶点着色器将被首先执行，它对gl_Position变量和gl_PointSize变量进行赋值，并将它们传入片元着色器，然后片元着色器再执行。实际上，片元着色器接收到的是经过光栅化（将几何图形变为二维图像的过程）处理后的片元值；现在可以简单认为这两个变量从顶点着色器传入了片元着色器。

​        



## HelloPoint1.js

回到这个实例中来：示例程序的任务是，在屏幕上绘制一个10像素大小的点 ，它用到了两个着色器：



- 顶点着色器指定了点的位置和尺寸。本例中：点的位置是（0.0，0.0，0.0），尺寸是10.0像素

- 片元着色器指定了点的颜色。本例中，点的颜色是红色（1.0，0.0，0.0，1.0）。



```javascript

/**

 * Created by hushhw on 17/12/12.

*/

//HelloPoint1.js

//顶点着色器程序

var VSHADER_SOURCE =

    'void main() {\n' +

    'gl_Position = vec4(0.5, 0.0, 0.0, 1.0);\n' + //设置坐标

    'gl_PointSize = 50.0;\n' + //设置尺寸

    '}\n';



//片元着色器程序

var FSHADER_SOURCE=

    'void main(){\n'+

    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+ //设置颜色

    '}\n';



function main() {

    var canvas = document.getElementById('webgl');



    var gl = getWebGLContext(canvas);

    if(!gl)

    {

        console.log('Failed to get the rendering context for WebGL');

        return ;

    }



    //初始化着色器

    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){

        console.log('Failed to initialize shaders.');

        return ;

    }



    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);



    gl.drawArrays(gl.POINTS, 0, 1);

}



```





这个文件包含三个部分：



- 顶点着色器程序（GLSL ES 语言）

- 片元着色器程序（GLSL ES 语言）

- 主程序（JavaScript语言）


​           

### 顶点着色器程序和片元着色器程序



![](https://photo.hushhw.cn/images/20171224160348903.png)





着色器程序代码必须预先处理成单个字符串的形式，所以我们用+号将多行字符串连成一个长字符串。（每一行以\n结束，这是由于当着色器内部出错时，就能获取出错的行号，这对于检查源代码中的错误很有帮助；但是，\n并不是必须的。为了更容易维护，也可以把着色器代码写到单独的文件中（就像javaScript文件一样），然后通过javaScript程序从文件中读取出来加载。）



就像JS一样，着色器程序使用 = 操作符为变量赋值。首先将点的位置赋值给 gl_Position 变量，然后将点的尺寸赋值给 gl_PointSize 变量，这两个变量是内置在顶点着色器中，而且有特殊含义；gl_Position 表示顶点的位置，gl_PointSize 表示点的尺寸。



在看代码的时候你可能会有疑问，好像在定义顶点着色器时的类型和JS不一样。那是因为GLSL ES是一种强类型的编程语言，也就是说，开发者必须明确指出某个变量是某种“类型”的。 

下面是这一节出现在GLSL ES代码中的几种类型：

![](https://photo.hushhw.cn/images/20171224162729559.png)

*注意：如果向某类型的变量赋一个不同类型的值。就会出错，例如，gl_PointSize 是浮点型的变量，你就必须向其赋浮点型的值。* 



在赋值给 gl_Position 时，我们添加了1.0作为第4个分量。由4个分量组成的矢量被称为齐次坐标。因为它能够提高处理三维数据的效率，所以在三维图形中被大量使用。虽然齐次坐标是四维的，但如果其最后一个分量是 1.0，那么这个齐次坐标就可以表示“前三个分量为坐标值”的那各个点。所以，当你需要用齐次坐标表示顶点坐标的时候，只要将最后一个分量赋为 1.0 就可以了。

​          





### 主程序

![](https://photo.hushhw.cn/images/20171224161103636.png)



main()函数的执行流程：

![](https://photo.hushhw.cn/images/20171224161210334.png)



这个流程和上一节的区别就是增加了“初始化着色器”和“绘图”部分。

​         

#### 初始化着色器



```javascript

//初始化着色器

    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){

        console.log('Failed to initialize shaders.');

        return ;

    }

```

​      

#### 绘制

首先我们清空绘制区域，然后我们使用 gl.drawArrays(）来进行绘制。



```javascript

gl.drawArrays(gl.POINTS, 0, 1);

```



gl.drawArrays(）是一个强大的函数，它可以用来绘制各种图形：

![](https://photo.hushhw.cn/images/20171224163102828.png)

*示例函数调用该函数时，因为我么绘制的是单独的点，所以设置第1个参数为 gl.POINTS， 设置第2个参数为0，表示从第1个顶点（虽然只有1个顶点）开始画，第3个参数 count 为1，表示在这个简单的程序中仅绘制了1个点。*

​        

## 总结

一旦顶点着色器执行完后，片元着色器就会开始执行，调用main()函数，将颜色值（红色）赋给gl_FragColor。最后，一个红色的10像素大小的点就被绘制在了（0.0，0.0，0.0，1.0）处，也就是绘制区域的中心位置。

![](https://photo.hushhw.cn/images/20171224163358200.png)

​         



下小节我们介绍坐标系统

​             



> 文章内容借鉴于：

> 《WebGL编程指南》

> http://www.cnblogs.com/mirror-pc/p/4181398.html

> http://blog.csdn.net/weixin_40282619/article/details/78030629
