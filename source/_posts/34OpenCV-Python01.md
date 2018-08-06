---
title: Python-OpenCV学习笔记——图片读取、展示和写入
date: 2018-07-18 22:49:54
tags: [计算机视觉, OpenCV]
categories: [学习, 计算机视觉]
---



{% qnimg xiaoanphoto.jpg title:图片来自微博@小安 %}

把环境搭建之后，就开始记录学习笔记了，

这是本系列第一篇，

内容都非常基础，只是整理给自己，

基础的东西很久不用就会忘记的。

<!--more-->

​        



### 引入OpenCV

读取图像首先要导入OpenCV包，方法为：

```python
import cv2
```



### 调用API

#### 1. 读取图片

读取图片使用`cv2.imread()` ，可以按照不同的模式读取，一般最常用到的是读取单通道灰度图，或者直接默认读取多通道。

> Python: retval = cv.imread(filename, [flags])
>
> 简单理解，第一个参数为图片名称，第二个是读取图片的格式，主要有以下参数
>
> - cv2.IMREAD_COLOR：彩色模式，可用数字1代表
> - cv2.IMREA_GRAYSCALE：灰度图，即数字0
> - cv2.IMREAD_UNCHANGED

```python
img = cv2.imread('image0.jpg', 1)
```

这里读取图片实际上经历了四个步骤：

- 文件的读取

- 封装格式的解析（如jpg、png格式，都是文件封装格式）

  这里我们一般把文件分成两部分来看待，`文件头`和`文件数据`，不同的jpg、png有不同的文件头和文件数据。这里描述的文件数据不是图片的原始数据，而是图片被压缩编码后的数据，大部分的文件头则描述的是数据部分的解码信息以及附加信息，解码器可以根据这些附加信息把数据还原成原始数据。

- 数据解码

- 数据加载





#### 2. 创建窗体

使用imshow()常见一个窗体展示图片，第一个参数为窗体名称，第二个是展示内容

> Python: None = cv.imshow(winname, mat)

这里创建一个叫"image"的窗体来展示上面的img

```
cv2.imshow('image', img)
```



#### 3. 图片写入

保存图像很简单，直接用cv2.imwrite即可。

cv2.imwrite("images.jpg", img)

第一个参数是保存的路径及文件名，第二个是图片数据（图像矩阵）。



### 暂停程序

最后要加`cv2.waitKey(0)` 来把程序暂停，如果不添最后一句程序会是一闪而过。

cv2.waitKey()函数等待键盘响应，键盘按下之后退出，一般里面的参数都是0，也接受键盘的输入。

下面就做一个简单判断，来执行关闭窗口或保存图片并关闭窗口。

```python
k = cv2.waitKey(0) & 0xFF #64位的电脑需要加 &0xFF
if k == 27: # ESC键
    cv2.destroyAllWindows()
elif k == ord('s'):
    cv2.imwrite('images.jpg',img)
    cv2.destroyAllWindows()
```



完整代码：

```python
import cv2

img = cv2.imread('image0.jpg',1)
cv2.imshow('image',img)
k = cv2.waitKey(0) & 0xFF #64位的电脑需要加 &0xFF
if k == 27: # ESC键
    cv2.destroyAllWindows()
elif k == ord('s'):
    cv2.imwrite('images.jpg',img)
    cv2.destroyAllWindows()
```



> 本文整理自：
>
> 《OpenCV文档》
>
> 《OpenCV+TensorFlow 入门人工智能图像处理》系列课程视频
>
> https://blog.csdn.net/poi7777/article/details/39700163