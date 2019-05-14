---
title: Python-OpenCV学习笔记——图片写入及图片质量
tags:
  - 计算机视觉
  - OpenCV
  - Python
categories:
  - learn
abbrlink: 20751
date: 2018-07-20 22:46:32
toc: true
tocnumber: true
---

> 本篇是OpenCV学习系列第二篇，
>
> 主要是imwrite()函数写入图片及修改不同的图片质量

<!-- more -->

​        

{% qnimg kite.jpg title:"photo by hushhw" %}

​           



图片写入在第一篇已经涉及到了，具体代码实现是：

```
C++: bool imwrite(const string& filename, InputArray img, const vector<int>& params=vector<int>() )

python: cv2.imwrite(filename, img, [params])
```

前面只涉及到第一个参数是保存的路径及文件名，第二个是图片数据（图像矩阵）。其中，`imwrite()`有个可选的第三个参数`[params]`，默认为空：

- 对于JPEG格式压缩的图片，可以设置图片质量参数`[cv2.IMWRITE_JPEG_QUALITY, num]`，该参数的范围是`0`到`100`，数字越大质量越好，默认的大小为95，该压缩是有损压缩，以牺牲图片质量为代价。

  ​	在默认情况下图片显示为`cv2.imwrite(images.jpg, img, [cv2.IMWRITE_JPEG_QUALITY])`：

  {% qnimg image_jpeg_quality_95.jpg %}

  ​	但是把参数设置为5的时候，图片被严重压缩`cv2.imwrite(images.jpg, img, [cv2.IMWRITE_JPEG_QUALITY])`：

  {% qnimg image_jpeg_quality_5.jpg %}

- 对于PNG格式压缩的图片，可以设置图片质量参数`[cv2.IMWRITE_PNG_COMPRESSION]`，该参数的范围是`0`到`9`，其值越大，压缩尺寸越小，压缩时间越长，默认值为3，该压缩是无损的。

- 对于PPM，PGM或PBM格式的图片，这个参数表示一个二进制格式标志`[CV_IMWRITE_PXM_BINARY]`，取值为0或1，而默认值为1。



​       



> 本文整理自：
>
> 《OpenCV文档》
>
> 《OpenCV+TensorFlow 入门人工智能图像处理》系列课程视频

