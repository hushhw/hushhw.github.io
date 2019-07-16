---
title: 虚拟机 VMware 中安装 Ubuntu 操作系统
comments: true
mathjax: true
toc: true
tocnumber: false
music: false
image: 'Snipaste_2019-04-25_15-04-07.png'
tags:
  - Ubuntu
  - Linux
categories: 
  - 编程开发
  - 环境配置
  - Linux
abbrlink: 6fbc30d9
date: 2019-04-25 14:54:43
description: '大三下学期在上的「操作系统」课程的时候就想装个虚拟机来学习一下 Linux，时到现在有空折腾了才开始做这件事情，但总算是开始做了。折腾在虚拟机中安装 Ubuntu 操作系统花了我一天时间，写下这篇文章来记录这个过程，留作以后再学习排坑。'
---

> 大三下学期在上的「操作系统」课程的时候就想装个虚拟机来学习一下 Linux，时到现在有空折腾了才开始做这件事情，但总算是开始做了。
>
> 折腾在虚拟机中安装 Ubuntu 操作系统花了我一天时间，写下这篇文章来记录这个过程，留作以后再学习排坑。

![](https://photo.hushhw.cn/images/Snipaste_2019-04-25_15-04-07.png)



## 1. 安装前的准备和基本安装

### 1.1 虚拟机 **VMware** 下载

可以自行去官网下载然后找一下激活密钥，我这里存了一份找到了一个 `15.0.0` 版本可供 <i class="fa fa-download fa"></i> [百度网盘](https://pan.baidu.com/s/1QbcYGlaX_bTLqQiYN571eQ ) 下载，提取码：`t7ys` 。

### 1.2 操作系统 **Ubuntu** 下载

可到 [中科大镜像源](<http://mirrors.ustc.edu.cn/>) 下载你需要的版本，如下图所示：

![](https://photo.hushhw.cn/images/Snipaste_2019-04-25_15-26-58.png)

我选择了最新的发行版本 `19.04` 的映像文件来安装，配合 VMware 15 没有出现兼容问题，之前电脑上装的 VMware 8 版本太低，安装过程中报错。

### 1.3 电脑开启虚拟化技术

各电脑厂商可能不太一样，但基本都是进入BIOS下开启虚拟化技术，可以自行 Google 操作。

### 1.4 基本安装

有了映像文件之后，只需要按照提示一步一步操作即可安装 Ubuntu，如果有什么问题可以在网上找一下别人的安装教材看看，我在 B 站看了一位大佬做了简单的安装过程视频，视频地址：[VMware 安装Ubuntu 18.04 LTS](<https://www.bilibili.com/video/av24804060>) 。

​         

## 2. 遇到的一些问题及解决方案

以下很多操作都可以用命令行来解决问题，也可以用图形界面来操作。

### 2.1 显示屏幕太小解决办法

使用 VMware 安装的 ubuntu 虚拟机的显示屏幕太小，可以通过在 VMware 里安装「VMware Tool」插件解决。 具体操作过程可以参考这篇文章 [VMware虚拟机ubuntu显示屏幕太小解决办法](<https://blog.csdn.net/dcrmg/article/details/74090307>) 。我安装是通过 VMware 15 虚拟机安装完成，所以步骤和文章中有一些不同，但是大致是一样的原理。

### 2.2 设置语言环境

参考文章：[更改系统语言为简体中文](<https://blog.csdn.net/qq_19339041/article/details/80058575>) 

如果你在语言环境下载包的过程中非常慢，可以考虑先把下面的「设置服务器镜像源」先改了再说。

如果你发现你得 Ubuntu 似乎没有网络，那么请在 VMware 设置当前虚拟机的网络适配器，具体可以网上找一找原因。

安装完成后，建议保留旧的名称。在terminal中有中文，后期开发使用可能会有问题。

### 2.3 设置服务器镜像源

Ubuntu 中大部分软件的安装/更新都是利用 `apt` 命令，从 Ubuntu 的服务器直接安装的，Ubuntu 官方服务器在国外，为了提高软件安装更新速度，Ubuntu 提供了选择最佳服务器的功能，可以帮助我们方便的找到一个速度最快的镜像服务器。

旧版本中在系统设置中可以找到 `软件和更新` 这个选项，但是我在 `19.0.4` 这个版本中并没有找到，所以直接找到文件位置 `etc/apt/sources.list`，打开文件后选择下载源为 `其他站点`，之后点击 `选择最佳服务器` ，退出来时弹框点击`重新载入`。

### 2.4 修改时区和更新时间

参考文章：[Ubuntu 修改时区和更新时间](<https://blog.csdn.net/zhengchaooo/article/details/79500032>) 

​            

## 3. apt 终端命令

`apt` 是 `Adavanced Packaging Tool`，是 Ubuntu 下的安装包管理工具。大部分软件的安装/更新都是利用 `apt` 命令，直接在终端中输入 `apt` 即可以查阅命令的帮助信息。

常用命令：

```
# 1. 安装软件
$ sudo apt install 软件名

# 2. 卸载软件
$ sudo apt remove 软件名

# 3. 更新可用软件包列表
$ sudo apt update

# 4. 更新已安装的包
$ sudo apt upgrade
```

`apt` 安装命令并不需要记忆，如果在终端中输入的软件没有安装，系统会提示 apt 命令的使用格式。

例如 python 双版本的安装：

```
$ sudo apt install ipython
$ sudo apt install ipython3
$ sudo apt install python-pip
$ sudo apt install python3-pip
```

​            

## 4. deb 安装格式

`deb` 是 Debian Linux 的安装格式，在 ubuntu 中同样可以使用。要安装 deb 安装包，需要使用 `dpkg` 这个终端命令，格式如下：

```
sudo dpkg -i <package.deb>
```



### 4.1 谷歌浏览器

从 chrome 官网下载到 .deb 安装文件，拷贝到 ubuntu 系统中，然后到该文件夹下执行：

```
$ sudo apt install libappindicator1 libindicator7
$ sudo dpkg -i google-chrome-stable_current_amd64.deb
$ sudo apt -f install
```



### 4.2 搜狗输入法

`fcitx` 被称为小企鹅输入法，是一个以 GPL 方式发布的输入法平台，可以通过安装引擎支持多种输入法，首先安装 Fcitx 输入法框架：

```
$ sudo apt install fcitx
```

之后到搜狗输入法官网下载 Linux 版本，拷贝到 ubuntu 系统中，在对应文件夹下执行：

```
$ sudo dpkg -i sogoupinyin_2.2.0.0108_amd64.deb
$ sudo apt -f install
```

其实前面忘了装 fcitx 这里命令行会提示里让你修复安装的。

安装过后，进入设置语言安装界面，设置键盘输入系统为 fcitx，重启虚拟机后右上角就有了键盘标志。更多细节可以参考：[Ubuntu18.04下安装搜狗输入法](<https://blog.csdn.net/lupengCSDN/article/details/80279177>) 。





