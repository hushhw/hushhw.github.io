---
title: Unity导出导出 Android 工程、应用
tags:
  - Unity
categories:
  - 编程开发
  - Unity
abbrlink: 36070
date: 2018-06-21 08:30:12
toc: true
tocnumber: true
---

> 虚拟现实实践课程第一天下午又开始了麻烦的配置环境，
>
> 又回到了被Android环境支配的恐惧，
>
> 但是这一次并不是不熟悉JDK、SDK的一些本地环境配置，
>
> 而是因为之前Cocos环境配置的JDK（前段时间装eclipse升级了）、SDK版本太低了，
>
> 全班找不到几个可以用的高于23的SDK版本，所以都在升级。

<!--more-->

​         

![](https://photo.hushhw.cn/sdk.jpg)

## Step 1. 设置 Android SDK 和 JDK 路径

在 Unity 中，点击 Edit > Preferences…，在弹出的 Unity Preferences 对话框中点击 External Tools 选项，将 Android SDK 和 JDK 路径分别设置为已安装 SDK 的根目录。

![](https://photo.hushhw.cn/images/doc_unity_build_android_1.png)

------



## Step 2. 选择平台

在 Unity 中，点击 File > Build Settings…，在弹出的 Build Settings 对话框中选择 Android 平台，并点击 Switch Platform，点击 Add Current 将当前工程添加到 Scene In Build 窗口中(请确保已被勾选)。

![](https://photo.hushhw.cn/images/doc_unity_build_android_2.png)

------

## Step 3. 应用设置

在 Build Settings 对话框中点击 Player Settings…，在 Inspector 窗口中找到 Settings for Android，点击 Resolution and Presentation 选项，将 Default Orientation 设置为 Landscape Left。

![](https://photo.hushhw.cn/images/doc_unity_build_android_3.png)

注意：生成的 Android 应用暂时不支持 Auto Rotation，另外有的手机由于手机自身系统原因不支持 Portrait Upside Down 模式。

点击 Other Settings 选项，取消勾选 Auto Graphics API，然后在 Graphics API 处删除多余选项，仅保留 OpenGLES2。

![](https://photo.hushhw.cn/images/othersettings1.png)

然后，在 Bundle Identifier 中填写应用的 apk 包名，并将 Minimum API Level 设置为 Android 4.0 或更高版本。

![](https://photo.hushhw.cn/images/othersettings2.png)

------

## Step 4. 生成 Android 应用

完成上述操作后，在 Build Settings 对话框中点击 Build ，保存 apk 并开始生成应用。在此过程中，可能会要求您更新 Android SDK 和 JDK ，请按照提示进行更新。

![](https://photo.hushhw.cn/images/doc_unity_build_android_5.png)

导出成功后可以看到 apk 文件。

![](https://photo.hushhw.cn/images/doc_unity_build_android_6.png)



------

## Step 5. 导出 Android 工程

如果您希望将当前工程导出为 Android 工程文件，则需要在 Step 4 中，勾选 Build Settings 对话框中的 Google Android Project，然后点击 Export。

![](https://photo.hushhw.cn/images/sdk-unity02.jpg)

导出的工程文件如下图所示：

![](https://photo.hushhw.cn/images/sdk-unity01.jpg)

