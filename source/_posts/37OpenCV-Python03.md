---
title: Python-OpenCV学习笔记——像素读取和写入
date: 2018-07-31 16:22:57
tags: [计算机视觉, OpenCV]
categories: [学习, 计算机视觉]
---



### 获取三维矩阵[i, j]处的元素

读取某一点的像素值，image中是一个矩阵结构，所以使用img[100, 100]来读取（100，100）位置的像素，返回会以一个元组存在，使用一个三元组来存储，其顺序为BGR。

```python
img = cv2.imread('image0.jpg', 1)
(b,g,r) = img[100, 100]
print ("位置(100,100)处的像素 - 红:%d,绿:%d,蓝:%d" %(r,g,b)) #显示像素值

img[100,100] = (100,150,200) #更改位置(100,100)处的像素
(b,g,r) = img[100, 100]
print ("位置(100,100)处的像素 - 红:%d,绿:%d,蓝:%d" %(r,g,b)) #显示更改后的像素值
```

其输出结果为

```python
位置(100,100)处的像素 - 红:30,绿:86,蓝:181
位置(100,100)处的像素 - 红:200,绿:150,蓝:100
```





### 获取三维矩阵的子矩阵

newImage = img[i:j, m:n]，可以获取第i行到第j行与第m列到第n列的交叉部分

```python
corner = img[0:100,0:100]#读取像素块
cv2.imshow("Corner",corner)#显示读取的像素块
```

显示结果为：

{% qnimg images_zijuchen.png %}



### Demo

下面实现一个修改像素块颜色的demo

第一种方法可以通过上面第一种方法从某一点开始用for循环对区域内进行像素值改变，完整代码：

```python
import cv2
img = cv2.imread('image0.jpg', 1)

for i in range(1,100):
    for j in range(1,100):
        img[i, j] = (0,255,0) #green 像素值的写入
cv2.imshow('image_xiangsu', img)
cv2.waitKey(0)
```

第二种方法可以用上面第二种方法直接得到像素块，直接修改像素值，完整代码：

```python
import cv2
img = cv2.imread('image0.jpg', 1)

img[0:100, 0:100] = (0, 255, 0)
cv2.imshow('image_xiangsu', img)
cv2.waitKey(0)
```

显示结果一样：

{% qnimg images_xiangsu.png %}

​       

> 本文整理自：
>
> 《OpenCV文档》
>
> 《OpenCV+TensorFlow 入门人工智能图像处理》系列课程视频

