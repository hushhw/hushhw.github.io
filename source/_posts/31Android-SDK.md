---
title: Android-SDK下载安装及配置
tags:
  - Android
categories:
  - 环境配置
abbrlink: 43678
date: 2018-06-29 10:56:18
toc: true
tocnumber: true
---

![](https://photo.hushhw.cn/sdk01.png)

> 接着上一篇没有解决的问题继续写，
>
> SDK的安装下载其实不是什么大难题，
>
> 只是之前没有去了解，以为很难，
>
> 这篇文章会介绍具体的怎么下载使用。

<!--more-->



### **下载并安装Android SDK**

官网（可翻墙选择）：<http://developer.android.com/sdk/index.html>

不可翻墙选择：<http://www.androiddevtools.cn/>

（下面以第二种方法为例进行下载）

1、下载Android SDK Tools

先找到SDK Tools,下载最新的版本即可。选择zip的，解压缩至目标路径位置即可

 ![img](https://photo.hushhw.cn/sdk01.png)

 ![img](https://photo.hushhw.cn/sdk02.png)

2、双击“SDK Manager”，启动SDK Manager

里面具体的内容找到了一张超级厉害的图，可以看看：

![来源网络](https://photo.hushhw.cn/20161115143939558.jpg)

①、Tools的勾选图示选项下载即可。

 ![img](https://photo.hushhw.cn/20170814174701471.jpg)

②、API的任意选择一个，考虑向下兼容原则，可以下载最新的API。

③、Extras的全选

 ![img](https://photo.hushhw.cn/20170814174706871.jpg)

注：无法下载的会出现以下提示

 ![img](https://photo.hushhw.cn/20170814174715941.jpg)

**Android SDK在线更新镜像服务器：**

中国科学院开源协会镜像站地址:

IPV4/IPV6: http://mirrors.opencas.cn 端口：80

IPV4/IPV6: http://mirrors.opencas.org 端口：80

IPV4/IPV6: http://mirrors.opencas.ac.cn 端口：80

上海GDG镜像服务器地址:

http://sdk.gdgshanghai.com 端口：8000

北京化工大学镜像服务器地址:

IPv4: http://ubuntu.buct.edu.cn/ 端口：80

IPv4: http://ubuntu.buct.cn/ 端口：80

IPv6: http://ubuntu.buct6.edu.cn/ 端口：80

大连东软信息学院镜像服务器地址:

http://mirrors.neusoft.edu.cn 端口：80

使用 Android SDK Manager下载sdk时 ，打开主界面，选择「Tools」、「Options」，弹出『Android SDK Manager - Settings』窗口：

在『Android SDK Manager - Settings』窗口中，在「HTTP Proxy Server」和「HTTP Proxy Port」输入框内填入 mirrors.neusoft.edu.cn 和 80，并且选中「Force

https://…sources to be fetched using http://…」复选框。

设置完成后单击「Close」按钮关闭重新打开即可。如下图：

![img](https://photo.hushhw.cn/20150725152858881.png)

3、设置环境变量

①、新建一个系统环境变量，变量名为ANDROID_SDK_HOME，变量值为你的SDK安装路径

 ![img](https://photo.hushhw.cn/20170814174729762.jpg)

②把%ANDROID_SDK_HOME%\platform-tools;%ANDROID_SDK_HOME%\tools添加到Path环境变量中。

③检测是否配置成功。打开命令行窗口，输入adb。出现如下图所示内容则配置成功：

 ![img](https://photo.hushhw.cn/20170814174734937.jpg)

 

4、常见问题

若sdk manager.exe 打不开，多是由于缺少环境变量造成的，可以先把第三步设置环境变量先完成再去执行第二步。



> 本文整理自：
>
> https://blog.csdn.net/qq_21150865/article/details/71105640
>
> https://blog.csdn.net/love4399/article/details/77164500
>
> https://blog.csdn.net/pipisorry/article/details/20807505