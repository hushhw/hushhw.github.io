---
title: Anaconda+python3+opencv3+TensorFlow的安装
tags:
  - 计算机视觉
  - OpenCV
  - tensorflow
categories:
  - 编程开发
  - 环境配置
abbrlink: 23537
date: 2018-07-16 08:44:33
toc: true
tocnumber: true
---

![图片来源官网](https://photo.hushhw.cn/TIM%E6%88%AA%E5%9B%BE20180717224539.png)

> 打算花时间入门一下计算机视觉，
>
> 做点东西出来玩一玩，顺便
>
> 考虑一下用来做毕设的可能性，
>
> 这篇用来记录环境配置。

<!--more-->



**安装环境：**Windows（64 bit）CPU

**安装版本：**Anaconda3-4.5.4-Windows-x86_64（Python3.6）

​                   Opencv 3.4.2

后面安装介绍基于此环境和版本



## Anaconda

### 为什么要装Anaconda

**你可能已经安装了 Python，那么为什么还需要 Anaconda？有以下3个原因：**

1）Anaconda 附带了一大批常用数据科学包，它附带了 conda、Python 和 150 多个科学包及其依赖项。因此你可以立即开始处理数据。

2）管理包

​	Anaconda 是在 conda（一个包管理器和环境管理器）上发展出来的。

​	在数据分析中，你会用到很多第三方的包，而conda（包管理器）可以很好的帮助你在计算机上安装和管理这	些包，包括安装、卸载和更新包。

3）管理环境

​	为什么需要管理环境呢？

​	比如你在A项目中用了 Python 2，而新的项目B老大要求使用Python 3，而同时安装两个Python版本可能会造成许多混乱和错误。这时候 conda就可以帮助你为不同的项目建立不同的运行环境。

​	还有很多项目使用的包版本不同，比如不同的pandas版本，不可能同时安装两个 Numpy 版本，你要做的应该是，为每个 Numpy 版本创建一个环境，然后项目的对应环境中工作。这时候conda就可以帮你做到。

> 上面这段摘自知乎回答：初学python者自学anaconda的正确姿势是什么？？ - 猴子的回答 - 知乎
> https://www.zhihu.com/question/58033789/answer/254673663



### 安装Anaconda

- 从官网 https://www.anaconda.com/download/ 下载对应版本，如我选择的版本为Anaconda3-4.5.4-Windows-x86_64（Python3.6），目前（2018.07.17）更新到Anaconda3-5.2.0

- 安装部分没有坑，next即可，切记将Anaconda添加到系统变量路径中，即勾选第一项，否则配置环境变量会很麻烦，能方便就方便吧。

  ![图片来源水印](https://photo.hushhw.cn/20171021092759947.png)



### 修改镜像

 - 通过 conda config 命令生成配置文件

   这里，我们使用清华的镜像：[https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/](https://link.jianshu.com/?t=https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/)

   首先，在CMD命令行输入以下两条命令：
   ```
   conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
   conda config --set show_channel_urls yes
   ```
   此时，目录 C:\Users<你的用户名> 下就会生成配置文件.condarc，内容如下：

   ```
   channels:
   https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
   defaults
      show_channel_urls: true
   ```

 - 修改配置文件

   删除上述配置文件 .condarc 中的第三行，然后保存，最终版本文件如下：

   ```
   channels:
   https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
      show_channel_urls: true
   ```

 - 查看是否生效

   通过命令 conda info 查看当前配置信息，内容如下，即修改成功，关注 channel URLs 字段内容
   ```
   >conda info
   Current conda install:

                  platform : win-32
             conda version : 4.3.22
          conda is private : False
         conda-env version : 4.3.22
          requests version : 2.12.4
              channel URLs : https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/win-32
                             https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/noarch
   ```




## OpenCV、tensorflow、notebook
这部分先用图形界面操作会比较直观，打开Anaconda Navigator，按照如图创建虚拟环境：

![](https://photo.hushhw.cn/TIM%E6%88%AA%E5%9B%BE20180717233907.png)

之后打开命令行终端，如图：

![](https://photo.hushhw.cn/TIM%E6%88%AA%E5%9B%BE20180717234645.png)

如果用命令行创建的话，打开Anaconda Prompt（或直接管理员身份运行cmd)输入conda create -n tensorflow即可，然后执行activate tensorflow激活环境。

![图片来源见水印](https://photo.hushhw.cn/20171021095429960.png)



这里先排一个坑：检查一下pip版本，输入pip -V

![](https://photo.hushhw.cn/pip.png)

后面在安装的时候如果出现pip版本不够的提示，请升级pip版本，报错信息可能为：

```
You are using pip version 9.0.3, however version 10.0.1 is available.
You should consider upgrading via the 'python -m pip install --upgrade pip' command.
```

升级执行：

![](https://photo.hushhw.cn/upgrade%20pip.png)



另外还有numpy的版本，可执行pip install numpy 安装



### OpenCV安装

到此镜像站下载opencv <http://www.lfd.uci.edu/~gohlke/pythonlibs/> 

选择最新windows64位的版本opencv，我下载的是**opencv_python-3.4.2-cp36-cp36m-win_amd64.whl**（win32或i386或x86指的是32位操作系统，amd64指的是64位，而不是指amd处理器） 
**将下载所得的whl文件放至anacoda3安装目录下的Scripts文件夹**（anaconda正确安装的话，此文件夹中应有pip.exe）

打开cmd或在上面打开的终端输入  **pip install D:\Anaconda\Scripts\opencv_python-3.4.2-cp36-cp36m-win_amd64.whl(文件路径)** 

![](https://photo.hushhw.cn/opencv.png)

初次安装显示Successful installed opencv-python-3.4.2即安装成功。

测试一下：

![](https://photo.hushhw.cn/opencv2.png)



### tensorflow安装

TensorFlow 有两个版本：**CPU** 版本和 **GPU** 版本。GPU 版本需要 **CUDA** 和 **cuDNN** 的支持，CPU 版本不需要。如果你要安装 GPU 版本，**请先确认你的显卡支持 CUDA**。

这里安装的tensorflow是CPU版本的，很多教程都有要求说Python 版本必须是3.5，实际上我们现在安装TensorFlow 从 1.2 开始支持 Python 3.6，之前的官方是不支持的。
安装过程和上面一样，执行代码**pip install –upgrade tensorflow** 

![](https://photo.hushhw.cn/tensorflow.png)

我这里都安装过了结果如上。



### notebook安装及helloworld测试

在Anaconda Navigator的home页面把虚拟环境切换到tensorflow，点击notebook的按钮安装，安装成功后会变成Lunch如下图：

![](https://photo.hushhw.cn/notebook.png)

点击Lunch在浏览器中运行notebook，如下图新建一个文件helloword.ipynb

![](https://photo.hushhw.cn/notebook2.png)

输入如下代码运行，测试环境：

![](https://photo.hushhw.cn/helloopencv.png)





> 本篇博客整理参考自：（感谢大佬们带入坑）
>
> https://blog.csdn.net/qq_28818465/article/details/78441006
>
> https://blog.csdn.net/qq_41185868/article/details/80469489
>
> https://www.jianshu.com/p/042fd657e2d4