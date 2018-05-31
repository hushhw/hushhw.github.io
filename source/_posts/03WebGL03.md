---
title: 《WebGL编程指南》学习笔记——3.在Canvas中使用WebGL
date: 2017-12-24 00:08:21
tags: [WebGL]
categories: 学习
---
* 上一节学习了使用< canvas >元素绘制二维图形，这一节里面我们在< canvas >中使用WebGL







这一小节中我们通过个实例来讲解在< canvas >中使用WebGL

此系列我编写的源码都可以在我的github下载到：https://github.com/hushhw/WebGL-Programming-Guide/tree/master/01HelloCanvas



## HelloCanvas.html

```

<!DOCTYPE html>

<html lang="en">

<head>

	<meta charset="utf-8" />

	<title>Clear canvas</title>

</head>



<body onload="main()">

	<canvas id="webgl" width="400" height="400">

		Please use the browser supporting "canvas"

	</canvas>



	<script src="../lib/webgl-utils.js"></script>

	<script src="../lib/webgl-debug.js"></script>

	<script src="../lib/cuon-utils.js"></script>

	<script src="HelloCanvas.js"></script>

</body>

</html>

```

在HelloCanvas.html文件中比较简单，需要注意的是需要引入一些其他的文件来支持webgl，文件下载可以到https://github.com/hushhw/WebGL-Programming-Guide/tree/master/lib自行下载。



## HelloCanvas.js

```

//HelloCanvas.js

function main(){

	//获取<canvas>元素

	var canvas = document.getElementById('webgl');



	//获取WebGl绘图上下文

	var gl = getWebGLContext(canvas);

	if(!gl)

	{

		console.log('Failed to get the rendering context for WebGL');

		return;

	}



	//指定清空<canvas>的颜色

	gl.clearColor(1.0, 0.0, 0.0, 1.0);



	//清空<canvas>

	gl.clear(gl.COLOR_BUFFER_BIT);

}

```

回顾一下上一篇提到的绘制二维图形的三个步骤：



 - 获取 < canvas > 元素 

 - 获取绘图上下文 

 - 设置 < canvas >颜色

 - 清空< canvas >



在main()函数中，我们通过id找到< canvas >标签，这里跟绘制2d图形的步骤是一模一样的。





### 获取绘图上下文



在绘制2d图形的时候，我们是通过调用canvas的getContext方法，传入“2d”参数来获取2d图形的回绘图上下文的。



这里需要解释一下，通常来说，我们应该使用canvas.getContext()函数来获取绘图上下文（就像之前那样）。但是在获取WebGL绘图上下文时，canvas.getContext()函数接收的参数，在不同浏览器中会不同（虽然大部分浏览器都接收字符串“expeimental-webgl”或“webgl”，但并非所有浏览器都这样），所以我们使用getWebGLContext(canvas)来隐藏不同浏览器之间的差异。



getWebGLContext(canvas, opt_debug)函数位于cuon-utils.js文件中。

getWebGLContext(canvas, opt_debug)函数的功能是：获取WebGL绘图上下文；如果开启了debug属性，遇到错误时将在控制台显示错误消息。以下是该函数的具体说明：

![图片来源www.cnblogs.com/mirror-pc/p/4181398.html](http://images.cnitblog.com/blog/332382/201412/232358247656436.png)

 



### 设置 < canvas >颜色



在获取到绘图上下文以后，我们就可以绘制图形了，并且可以绘制3d图形了；这也说明，WebGL已经调用成功，我们现在可以使用WebGL函数了。

　　

我们将上下文放到名为gl的变量中。有了这个上下文，我们就可以设置颜色来清除< canvas >标签指定的绘图区了。在之前绘制2d图形时，我们在绘制之前就指定了绘图颜色。在WebGL中，是相似的，清空绘图区之前也需要指定颜色。



gl.clearColor(RGBA)函数通过传入RGBA格式的颜色参数指定颜色。我们在代码中指定了黑色，也可以随意指定其他颜色。在绘制2d图形时，RGBA每个分量的取值范围是0-255之间；但是在WebGL中，每个分量的取值范围是0-1，这和OpenGL保持了一致。一旦指定了颜色，这个颜色就会驻存在WebGL系统中，直到你重新指定新的颜色。在这之前，你可以无数次的使用该颜色进行清除绘图区而无须重新指定。



### 清空< canvas >



最后调用这个函数，用之前指定的背景色清空（用背景色填充，擦除已经绘制的内容）绘图区域。

　　

清除绘图区我们使用 gl.clear(gl.COLOR_BUFFER_BIT)函数；你可能觉得很奇怪，参数不应该是表示绘图区的< canvas >吗？这是由于gl.Clear()函数继承自OpenGL，它基于多基本缓冲区模型，比二维绘图上下文要复杂得多。清空绘图区，实际上是在清空颜色缓冲区（通过指定的颜色去擦除已经绘制的内容），传递gl.COLOR_BUFFER_BIT参数就是在告诉WebGL清空颜色缓冲区。

　　

如果在使用该函数之前我们没有指定任何颜色，那么默认会以RGBA(0,0,0,0)作为清除颜色，这个颜色是全透明的，替换出来的结果就是什么颜色都没有，显示为浏览器本身的颜色。

  

下小节我们正式开始学习如何使用WebGL绘制基本图形





> 文章内容借鉴于：

> 《WebGL编程指南》

> http://www.cnblogs.com/mirror-pc/p/4181398.html

> http://blog.csdn.net/weixin_40282619/article/details/78030629



