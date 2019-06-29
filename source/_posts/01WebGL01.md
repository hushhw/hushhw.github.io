---
title: 《WebGL编程指南》学习笔记——1.WebGL概述
tags:
  - WebGL
categories: learn
abbrlink: 18614
date: 2017-12-21 14:55:24
comments: true
mathjax: true
toc: true
tocnumber: true
music: false
image: false
description: 'WebGL 是一项用来在网页上绘制和渲染复杂三维图形（3D 图形），并允许用户与之交互的技术。随着个人计算机和浏览器的性能越来越强，我们能够在 Web 上创建越来越精美、越来越复杂的3D图形。'
---
>  **此系列用来记录我学习《WebGL编程指南》这本书后的心得，重点内容和总结**



## WebGL概述



WebGL 是一项用来在网页上绘制和渲染复杂三维图形（3D 图形），并允许用户与之交互的技术。随着个人计算机和浏览器的性能越来越强，我们能够在 Web 上创建越来越精美、越来越复杂的3D图形。http://webglsamples.org/ 这个网址展示了Google发布的一些示例 WebGL 程序，在惊叹美轮美奂的效果的同时，我们发现发布和运行也变得非常简单。

从传统意义上来说，为了显示三维图形，开发者需要使用 C 或 C++ 语言，辅以专门的计算机图形库，如 OpenGL 或 Direct3D 来开发一个独立的应用程序，现在有了 WebGL 我们只需要向已经熟悉的 HTML 和 JS 中添加一些额外的三维图形学的代码，就可以在网页上显示三维图形了。

WebGL 是内嵌在浏览器中的，你不必安装插件和库就可以直接使用它。而且，因为它是基于浏览器的，你可以在多种平台上运行 WebGL 程序，而且使用起来有诸多便利点：

 - 你只需要一个**文本编辑器**和一个**浏览器**，就可以开始编写三维图形程序了。

 - 你可以使用通用的 Web 技术发布三维图形程序，展示给你的朋友和其他开发者

 - 你可以充分利用浏览器的功能

 - 互联网上有大量现成的资料，它们可以帮助你学习 WebGL ，编写三维程序等。


​              

## WebGL起源

在个人计算机上使用最广泛的两种三维图形渲染技术是 **Direct3D** 和 **OpenGL**。

Direct3D 是微软 DirectX 技术的一部分，是一套由微软控制的编程接口 API ，主要用在 Windows 平台。 

OpenGL 由于其开发和免费的特性，在多种平台上都有广泛的使用。Windows 对 OpenGL 也提供了良好的支持，开发者也可以用它来代替 Direct3D。

OpenGL 最初由 SGI 开发，并在 1992 年发布为开源标准。多年以来，OpenGL 发展了数个版本，并对三维图形开发，软件产品开发，甚至电影制作产生了深远影响。 

虽然 WebGL 根植于 OpenGL ，但它实际上是从 OpenGL 的一个特殊版本 OpenGL ES 中派生出来的，后者专用于嵌入式计算机、智能手机、家用游戏机等设备。OpenGL ES 于 2003 - 2004 年被首次提出，并在 2007 年（ES 2.0）和 2012 年（ES 3.0）进行了两次升级，**WebGL 是基于 OpenGL ES 2.0 的**。

下图显示了OpenGL、OpenGL ES 1.1/2.0/3.0和WebGL的关系。 

![](https://photo.hushhw.cn/images/Snipaste_2019-03-05_09-37-29.png)



从 2.0 版本开始，OpenGL 支持了一项非常重要的特性，即**可编程着色器方法**。该特性被 OpenGL ES 2.0 继承，并成为了 WebGL 1.0 标准的核心部分。

着色器使用一种类似于 C 的编程语言实现了精美的视觉效果，编写着色器的语言又称为**着色器语言**。WebGL 基于OpenGL ES 2.0，使用 GLSL ES 语言编写着色器。

虽然 WebGL 强大到令人惊叹，但使用这项技术进行开发却异常简单：只需要一个文本编辑器（Notepad 或 TextEdit）和一个浏览器（Chrome）即可，并且不需要去搭建开发环境，因为 WebGL 是内嵌在浏览器中的。

下图显示了WebGL程序的结构：

![](https://photo.hushhw.cn/images/Snipaste_2019-03-05_09-37-53.png)

由于 GLSL ES 通常是以字符串的形式在 JavaScript 中编写的，所以虽然 WebGL 网页更加复杂，但它仍然保持着与传统的动态网页相同的结构：只用到HTML文件和JavaScript文件。

　　

> 文章内容借鉴于： 			
> 《WebGL编程指南》
>  https://www.cnblogs.com/mirror-pc/p/4178897.html

