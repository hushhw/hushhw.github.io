---
title: Three.js 入坑笔记
comments: true
mathjax: true
toc: true
tocnumber: false
music: false
image: false
tags:
  - ThreeJS
categories: learn
abbrlink: ae8c05d6
date: 2019-04-03 15:09:57
description: '关于一些函数的参数用一次忘一次，参考系这些东西每次都到用的时候想半天，所以还是写一篇笔记来记录，方便查阅，不至于每次都去 Google 浪费时间。'
---

> 关于一些函数的参数用一次忘一次，参考系这些东西每次都到用的时候想半天，所以还是写一篇笔记来记录，方便查阅，不至于每次都去 Google 浪费时间。



## 1. 坐标系

`three.js` 中使用的是右手坐标系，X 轴水平向右，Y 轴垂直向上，Z 轴的方向就是屏幕由里往外的方向：

![](https://qn.hushhw.cn/images/Snipaste_2019-04-03_15-37-08.png)



## 2. 照相机

### 2.1 什么是照相机？

我们使用的 `Three.js` 创建的场景是三维的，而通常情况下显示器是二维的，那么三维的场景怎么在二维的显示器上显示呢？照相机就是一个抽象，它定义了三维空间到二维屏幕投影的方式，用「照相机」这样一个类比，可以使我们直观地理解这一投影方式。

而针对`投影方式`的不同，照相机又分为`正交投影照相机`与`透视投影照相机`。我们需要为自己的程序选择合适的照相机。

### 2.2 正交投影和透视投影

举个简单的例子来说明正交投影与透视投影照相机的区别。使用`透视投影照相`机获得的结果是`类似人眼在真实世界中看到的有“近大远小”`的效果（如下图中的 (a)）；而使用`正交投影照相机`获得的结果就像我们在数学几何学课上老师教我们画的效果，对于`三维空间内平行的线`，投影到`二维空间中也一定是平行的`（如下图中的 (b)）。

![image](https://qn.hushhw.cn/images/Snipaste_2019-04-03_15-23-54.png)

一般说来，对于`制图、建模软`通常使`正交投影`，这样不会因为投影而改变物体比例；而`对于其他大多数应用`，通常使用` 透视投影`，因为这更接近人眼的观察效果。当然，照相机的选择并没有对错之分，你可以更具应用的特性，选择一个效果更佳的照相机。

### 2.3 正交投影照相机

#### 2.3.1 参数介绍

> 正交投影照相机(`Orthographic Camera`)

```
THREE.OrthographicCamera(left, right, top, bottom, near, far)
```

这六个参数分别代表正交投影照相机拍摄到的空间的六个面的位置，这六个面围成一个长方体，我们称其`视景体(Frustum)`。只有在视景体内部（下图中的灰色部分）的物体才可能显示在屏幕上，而视景体外的物体会在显示之前被裁减掉。

![image](https://qn.hushhw.cn/images/Snipaste_2019-04-03_15-25-27.png)

为了保持照相机的横竖比例，需要保证`(right - left)与(top - bottom)`的比例与`Canvas宽度与高度的比例(800/600)`一致。

`near与far`都是指到照相机位置在深度平面的位置，而照相机不应该拍摄到其后方的物体，因此这两个值应该均为`正值`。为了保证场景中的物体不会因为太近或太远而被照相机忽略，一般`near的值设置得较小`，`far的值设置得较大`，具体值视场景中物体的位置等决定。

#### 2.3.2 示例代码

下面我们通过一个具体的例子来了解正交投影照相机的设置

**基本设置**

设置照相机：

```javascript
var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
camera.poaition.set(0,0,5);
scene.add(camera);
```

在原点处创建一个边长为1的正方体，为了和透视效果做对比，这里我们使用`wireframe`而不是实心的材质，以便看到正方体后方的边：

```javascript
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), 
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    })
);
scene.add(cube);
```

* 效果图：

![](https://qn.hushhw.cn/images/Snipaste_2019-04-03_15-29-55.png)

我们看到正交投影的结果是一个正方形，后面的边与前面完全重合了，这也就是正交投影与透视投影的区别所在。

**长宽比例**

这里，我们的Canvas宽度是 800px，高度是 600px，照相机水平方向距离 4，垂直方向距离 3，因此长宽比例保持不变。为了试验长宽比例变化时的效果，我们将照相机水平方向的距离减小为 2 (right-left = 2)：

```
var camera = new THREE.OrthographicCamera(-1, 1, 1.5, -1.5, 1, 10);
```

效果图(此时水平方向的距离就被拉长了)：

![](https://qn.hushhw.cn/images/Snipaste_2019-04-03_15-31-42.png)



### 2.4 透视投影照相机

#### 2.4.1 参数介绍

> 透视投影照相机(`Perspective Camera`)

```
THREE.PerspectiveCamera(fov, aspect, near, far)
```

让我们通过一张透视照相机投影的图来了解这些参数。

![](https://qn.hushhw.cn/images/Snipaste_2019-04-03_15-39-39.png)

* 透视图中，灰色的部分是`视景体`，是可能被渲染的物体所在的区域。`fov`是视景体竖直方向上的`张角`（是角度制而非弧度制），如侧视图所示。

* `aspect`等于`width / height`，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的`横纵比例`。

* `near`和`far`分别是照相机到视景体 最近、最远的距离，均为正值，且far应大于near。

#### 2.4.2 示例代码

下面我们通过一个例子来学习透视投影照相机

**基本设置**

设置透视投影照相机，这里Canvas长`800px`，宽`600px`，所以`aspect`设为`800 / 600`：

```javascript
var camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 10);
camera.position.set(0, 0, 5);
scene.add(camera);
```

设置一个在原点处的边长为1的正方体：

```javascript
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
);
scene.add(cube);
```

效果图：

![](https://qn.hushhw.cn/images/Snipaste_2019-04-03_15-41-29.png)

对比正交透视照相机下正方形的效果，透视投影可以看到`全部的12条边`，而且有`近大远小`的效果，这也就是与正交投影的区别。

**竖直张角**

* 接下来，我们来看下`fov`的改变对渲染效果的影响。我们将原来的`45改为60`：

```javascript
var camera = new THREE.PerspectiveCamera(60, 800 / 600, 1, 10);
camera.position.set(0, 0, 5);
scene.add(camera);
```

* 效果图：

![](https://qn.hushhw.cn/images/Snipaste_2019-04-03_15-42-39.png)

为什么正方体显得更小了呢？我们从下面的侧视图来看，虽然正方体的实际大小并未改变，但是将照相机的`竖直张角`设置得`更大`时，`视景体变大了`，因而`正方体`相对于`整个视景体`的大小就`变小`了，看起来正方形就显得变小了。

![](https://qn.hushhw.cn/images/Snipaste_2019-04-03_15-43-15.png)

注意，`改变fov`并`不会`引`起画面横竖比例`的变化，而`改变aspect`则`会`改变横竖比例。



## 参考文档整理

* [TechbrooD 对 Three.js 在线文档的汉化](<https://techbrood.com/threejs/docs/>) 

* [3D 網站開發入門筆記＿Three.js 入門](<http://test.domojyun.net/MEMO/3D/threejs.html>) 



> 本文整理自
>
> 开源书籍：《Three.js 入门指南》