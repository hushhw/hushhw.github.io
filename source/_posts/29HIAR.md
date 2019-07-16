---
title: HIAR制作第一个简易的 AR 应用
comments: true
mathjax: true
abbrlink: 19ad55f3
date: 2018-06-20 10:51:12
tags:
  - Unity
  - AR
categories: 
  - 编程开发
  - Unity
toc: true
tocnumber: true
---

> 虚拟现实实践课程从今天开始开课，
>
> 打算用博客记录学习的过程，
>
> 因为课程结束后应该会很少制作相关应用，
>
> 所以记录系列笔记方便以后捡起来。

<!--more-->

​         

![](https://photo.hushhw.cn/timg.jpg )

​           

HiAR SDK for Unity 开发文档：http://www.hiar.com.cn/doc-v1/sdk-unity/overview/

> HiAR SDK for Unity 是 HiAR 开发平台中的一套 AR SDK，可以让开发者轻松地使用 Unity 3D 开发跨平台的 AR 应用和 AR 游戏。



### HIAR制作第一个简易的 AR 应用

因为HIAR有一套比较完整的AR SDK，所以整个制作过程并没有难度，以下为步骤（HiAR SDK for Unity 开发文档中有更加完整的过程说明）：

- 搭建开发环境

  - Unity安装下载
  - Android SDK 和 JDK安装下载





- 导入SDK

  - 下载HiAR SDK ：下载地址：http://www.hiar.com.cn/download.html
  - 导入HiAR SDK：双击 hiar_sdk_unity-x.x.x.unitypackage 文件，Unity 将加载并显示插件内容，点击 Import 开始导入。您也可以在 Unity 中，点击 Assets > Import Package > Custom Package... 来导入插件。导入完成后，您可以在 Project 窗口中看到以下内容：
    ![img](https://photo.hushhw.cn/2.jpg)
    提示：Unity 插件与一般意义上的插件存在区别，每次在新工程中使用时，都需要重新进行导入。





- 使用本地识别包

  - 创建图集、上传图片、发布图集、下载识别包：在管理后台中，选择或新建一个图集并上传您想要识别的图片。上传新的识别图片之后，系统会自动对图集进行发布操作。在下图中可以看到，mydata 图集中显示“图集发布中...”。发布完成后您可以开始下载识别图片。您也可以在图集管理界面中查看各图集的发布状态。如果您只需要下载图集中的部分图片，请先勾选需要识别的图片，然后点击“下载选中项”按钮。如果您需要下载图集的所有图片，则不勾选任何项目，直接点击“下载所有项”按钮。
  - 导入识别包：双击 mydata.unitypackage 文件，Unity 加载并显示包内容，点击 Import 开始导入。导入完成后，您可以在 `Assets/StreamingAssets/HiAR` 目录下看到刚才导入的 mydata。导入完成后，您可以在 `Assets/StreamingAssets/HiAR` 目录下看到刚才导入的 mydata。![](https://photo.hushhw.cn/TIM%E6%88%AA%E5%9B%BE20180620145352.png)ImageTarget 在场景中的尺寸时常需要调整，所以我们给 ImageTarget 添加了 Width 和 Height 两个属性，以方便这一操作。




- 创建 Hello World

  - 注册HiAR 平台账户并获取 AppKey 和 Secret：前往[HiAR 管理后台](http://portal.hiar.io/)的应用管理，点击“新建应用”按钮并按照提示要求创建一个新应用。系统会为每个应用分配唯一的 AppKey 和 Secret。进入应用管理界面，您可以在列表中查看到应用对应的 AppKey 和 Secret。
    - 新建 Unity 工程并导入 SDK：具体步骤见前一个步骤“导入SDK”
    - 创建 HiARCamera：新建的 Unity 工程中，默认会创建一个 Main Camera（如下图），请先将其删除。然后将 `Assets/HiAR-Unity/Prefabs` 目录下的 HiARCamera 拖至 Hierarchy 窗口中。在 Hierarchy 窗口中选中 HiARCamera，在其对应的 Inspector 窗口中找到 AppKey 和 Secret 选项，并填写信息。
    - 创建 ImageTarget并设置识别图片：将 `Assets/HiAR-Unity/Prefabs` 目录下的 ImageTarget 拖至 Hierarchy 窗口中。在 Hierarchy 窗口中选中 ImageTarget，在其对应的 Inspector 窗口中找到 HiAR Target Mono Behaviour (Script)，在 Data Set 选项中选择 sample。此时，编辑窗口中将显示一张”苹果“的图片，这是刚刚设置的识别图片。![img](https://photo.hushhw.cn/TIM%E6%88%AA%E5%9B%BE20180620143856.png)sample 是 SDK 中内置的本地识别包，包含两张识别图片，您可以在 Image Target 选项中进行选择。如果您希望添加自己想识别的图片，可以参考前面的导入本地识别包。

  


  - AR 制作与运行：在 Hierarchy 窗口中选中 ImageTarget，右击并在弹出的菜单中选择 3D Object > Cube，识别图片上将显示一个立方体模型。这个模型就是在识别图片上叠加的 AR 内容，您可以适当调整模型的大小以便查看。上述操作完成后，需要在 Unity 环境下运行以查看效果。在运行之前，请确保您的电脑已安装了摄像头。点击运行按钮，摄像头将启动并采集画面；将摄像头对准”苹果“图片，识别成功后将在图片上叠加显示一个立方体模型。

  ​