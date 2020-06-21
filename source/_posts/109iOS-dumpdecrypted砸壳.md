---
title: iOS 砸壳总结
comments: true
mathjax: true
toc: true
tocnumber: false
music: false
image: false
date: 2020-01-16 10:15:09
tags:
  - iOS逆向
  - 移动安全
categories:
  - 移动安全
  - iOS
description:'本文总结iOS中应用逆向砸壳的一些方法，包括dumpdecrypted砸壳方法和支持版本更高的frida-ios-dump 砸壳方法。'
---



## dumpdecrypted 砸壳



### 1. 应用场景

应用上传 appstore 后，苹果会对应用的代码部分进行加密，当应用运行的时候才会动态解密，所以市面上的应用即使我们可以拿到 ipa 包也无法对二进制程序进行分析，这时可以使用 dumpdecrypted 时dump 内存中解密后的代码。



### 2. 环境配置

|    手机    | 越狱设备（iOS11以下越狱比较好做） |
| :--------: | --------------------------------- |
| Cydia 依赖 | 安装 cycript                      |
|   PC 端    | 正常mac环境 + ssh client          |
| PC 端依赖  | Classdump下载 + xcode             |



### 3. 砸壳步骤

1. 打开一个 mac 终端窗口用于生成 `dumpdecrypted.dylib` 动态库文件（砸壳的锤子）

   1. 终端命令：git clone https://github.com/stefanesser/dumpdecrypted.git
   2. cd dumpdecrypted 文件目录下执行命令 `make` 既可。

2. ssh 连接手机

   1. 方法一：iOS 8 和 iOS 9 的越狱设备在手机上安装 OpenSSH，在 Wifi 设置中当前连接 Wi-Fi 获取到 IP 地址，如：10.28.173.46。再打开一个 mac 终端窗口用于连接手机，输入：ssh root@192.168.2.202，回车后输入”yes"，再回车输入密码"qwert"（默认密码为“alpine”）。
   2. 方法二：通过 USB 登录。打开一个 mac 终端安装 libimobiledevice，输入：brew install libimobiledevice，安装完成后使用里面提供的工具 iproxy 把本地端口 2222 映射到设备的 TCP 端口 22，执行命令：iproxy 2222 22，当看到 waiting for connection 时，另开一个 Mac 终端窗口，执行 ssh root@localhost -p 2222 来连接手机，后面同样输入密码等操作。

3. 查找要反编译的 app 的路径，在连接到手机的 mac 终端窗口进行下面操作：

   1. ps -e 获取手机中当前运行的进程

   2. 抓取手机上运行的 APP 进程：

      1. 直接执行 ps -A | grep mobile 命令，可自动抓取手机上运行的 APP进程
      2. 或者知道应用的名称，直接执行 ps -e | grep PostalSavingsBankOfChina （这里以邮政银行为例）来抓取该应用进程。若不知道应用名称，可以在所有进程中找到带有 `bundle` 路径的进程，该进程就是我们正在打开的应用，路径最后即该应用的名称。

   3. 使用 cycript 找出反编译 APP 的 Documents 目录路径：

      ```  
      cycript -p PostalSavingsBankOfChina 
      cy# directory = NSHomeDirectory()
      ```

      这样就得到了 Data 目录，在后面加上 /Documents 即可。

   4. 拷贝 dumpdecrypted.dylib 到 iPhone 该应用的 Documents 文件夹下：

      ```
      scp /users/bupt/test1127/dumpdecrypted/dumpdecrypted.dylib root@10.28.173.46:/var/mobile/Containers/Data/Application/BD1E0C3F-6C65-4A2B-B881-2BBA9E3B3594/Documents
      ```

   5. 砸壳，打开连接到 iPhone 的终端窗口，cd 到 Data 路径的 Document 目录前面放 dumpdecrypted.dylib 文件夹下，执行命令：

      ```
      DYLD_INSERT_LIBRARIES=dumpdecrypted.dylib /var/containers/Bundle/Application/AB511F0D-D3D4-46A6-86BD-DFB017F07A87/PostalSavingsBankOfChina.app/PostalSavingsBankOfChina
      ```

      砸壳成功后，用 ls 命令查看 PostalSavingsBankOfChina.decrypted 文件即我们要破解的文件。

   6. 拷贝生成的 decryption 文件到电脑

     ```
     scp -r root@10.28.173.46:/var/mobile/Containers/Data/Application/BD1E0C3F-6C65-4A2B-B881-2BBA9E3B3594/Documents/PostalSavingsBankOfChina.decrypted /Users/bupt/Desktop/PostalSavingsBankOfChina
     ```

     
   
## frida-ios-dump 砸壳使用总结

   该工具基于 frida 提供的强大功能通过注入 js 实现内存 dump 然后通过 python 自动拷贝到电脑生成 ipa 文件。

   

### 1. 越狱手机配置

   1、打开`cydia`添加源：http://build.frida.re 并在搜索中下载安装`frida`。

   2、安装完成后在`Mac`端执行`frida-ps -U`查看是否可以工作。

   

### 2. Mac 配置

   安装 `frida`：

   ```
   sudo pip install frida –-upgrade –-ignore-installed six
   ```

   克隆项目[frida-ios-dump](https://github.com/AloneMonkey/frida-ios-dump)：

   ```
   git clone https://github.com/AloneMonkey/frida-ios-dump
   ```

   cd 到 `frida-ios-dump` 文件夹下，安装脚本依赖环境，执行：

   ```
   sudo pip install -r requirements.txt --upgrade
   ```

   修改 `dump.py` 配置：

   ```python
   User = 'root'
   Password = 'qwert' #我们修改了ssh默认密码，故需要修改
   Host = 'localhost'
   Port = 2222
   ```

   

### 3. 使用

   默认采用 USB 方式连接 ssh，将`22`映射到电脑上的`2222端口`：

   ```
   iproxy 2222 22
   ```

   到 frida-ios-dump 文件夹下执行`dump.py -l`，查看安装的应用的名字和bundle id：

   ```
   python dump.py -l
   ```

   执行`dump.py 应用名或包名`，即可砸壳生成 ipa 文件在当前目录下。例如：

   ```
   python dump.py 个人所得税
   ```

   ```
   python dump.py cn.gov.tax.its
   ```

   生成的 ipa 文件需解压后打开包内容查看同名文件，该文件仅为砸壳成功的 arm64 位。