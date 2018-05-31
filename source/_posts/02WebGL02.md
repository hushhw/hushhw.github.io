---
title: 《WebGL编程指南》学习笔记——2.使用canvas元素
date: 2017-12-21 15:06:40
tags: [WebGL]
categories: 学习
---
上一节初步认识了WebGL，这一小节我们来开始学习使用< canvas >元素绘制二维图形





WebGL采用HTML5中新引入的< canvas >元素，它定义了网页上的绘图区域，如果没有WebGL，JS只能在< canvas >上绘制二维图形，有了WebGL，就可以在上面绘制三维图形了。



<!--more-->

## 认识< canvas >标签



HTML5出现以前，如果你想在网页上显示图像，只能使用HTML提供的原生方案<img>标签。用这个标签显示图像虽然简单，但只能显示静态的图片，不能进行实时绘制和渲染。因为，后来出现了一些第三方解决方案，如Flash Player等。

​        

HTML5的出现改变了一切，它引入了< canvas >标签，允许JS动态地绘制图形。



艺术家们将画布（canvas译为”画布”）作为绘画的地方，类似地，< canvas >标签定义了网页上的绘图区域。有了< canvas >，你就可以使用JS绘制任何你想画的东西。< canvas >提供一些简单的会凸函数，用来描绘点、线、矩形、圆等。



## 使用< canvas >标签



为了在< canvas >上绘制二维图形，需经过以下几个步骤：



 - **创建< canvas >标签，指定绘图范围。**

 - **利用JavaScript获取到< canvas >标签。**

 - **向该标签请求二维图形的“绘图上下文”。**

 - **使用绘图上下文调用相应的绘图函数，绘制二维图形。**





## HelloCanvas2d实例



下面是HelloCanvas2d实例，我们利用< canvas >画个矩形，并用红色填充

此系列我编写的源码都可以在我的github下载到：https://github.com/hushhw/WebGL-Programming-Guide/tree/master/00HelloCanvas2d

```

<!DOCTYPE html>

<html lang="en">

<head>

	<meta charset="utf-8" />

	<title>Clear canvas</title>

</head>



<body onload="main()">

	<canvas id="mycanvas" width="400" height="400">

		Please use the browser supporting "canvas"

	</canvas>

	<script src="HelloCanvas2d.js"></script>

</body>

</html>



```



```

//HelloCanvas2d.js

function main() {

	//获取<canvas>标签

	var canvas = document.getElementById("mycanvas");

	//如果没找到<canvas>标签，则输出错误信息

	if (!canvas) {

		console.log('Failed to retrieve the <canvas> element.');

		return;

	}



	//要在<canvas>上绘制图像，须先获取绘图上下文，“2d”代表我们要绘制二维图形。

	var ctx = canvas.getContext("2d");



	//fillstyle：设置或返回用于填充绘画的颜色、渐变或模式；这里我们设置填充颜色为红色。

	ctx.fillStyle = "red";

	/*

	 使用填充颜色填充矩形。

	 fillRect(x,y,width,height)

	 x    矩形左上角的 x 坐标

	 y    矩形左上角的 y 坐标

	 width        矩形的宽度

	 height   矩形的高度

	 */

	ctx.fillRect(120, 10, 150, 150);

}

```



### 获取< canvas >元素

```

	//获取<canvas>标签

		var canvas = document.getElementById("mycanvas");

		//如果没找到<canvas>标签，则输出错误信息

		if (!canvas) {

			console.log('Failed to retrieve the <canvas> element.');

			return;

		}

```



在HTML文件中通过JS程序获取< canvas >元素。可以使用document.getElementById 的函数来获取。这个方法只有一个参数，就是HTML文件中< canvas >标签的 id 属性

　　



### 通过元素来获取二维图形的绘图上下文



```

//要在<canvas>上绘制图像，须先获取绘图上下文，“2d”代表我们要绘制二维图形。

	var ctx = canvas.getContext("2d");

```



< canvas >元素可以同时支持二维图形和三维图形，它不直接提供绘图方法，而是提供一种叫**上下文**的机制来绘图。

　　

在上述代码中，canvas.getContext() 方法的参数制订了上下文的类型（二维或三维）。如果你想要绘制二维图形，就必须指定为2d（区分大小写）。

　　

　　

### 绘制二维图形



```

//fillstyle：设置或返回用于填充绘画的颜色、渐变或模式；这里我们设置填充颜色为红色。

	ctx.fillStyle = "red";

	/*

	 使用填充颜色填充矩形。

	 fillRect(x,y,width,height)

	 x    矩形左上角的 x 坐标

	 y    矩形左上角的 y 坐标

	 width        矩形的宽度

	 height   矩形的高度

	 */

	ctx.fillRect(120, 10, 150, 150);

```



　　< canvas >的坐标系横轴为x轴（正方向朝右），纵轴为y轴（正方向朝下）。原点（0，0）在左上方。fillRect方法中设置的x，y指的是从< canvas >坐标的开始算，右移x像素，下移y像素的位置，就是矩形左上角的位置。如图所示：

　　![这里写图片描述](http://img.blog.csdn.net/20171216202917965?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHVzaGh3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)







下小节我们正式开始学习如何在< canvas >中使用WebGL



> 文章内容借鉴于： 

> 《WebGL编程指南》

>  http://www.cnblogs.com/mirror-pc/p/4179062.html

> http://blog.csdn.net/weixin_40282619/article/details/78019085