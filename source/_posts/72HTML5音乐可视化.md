---
title: HTML5音频API Web Audio - 分析音频资源
comments: true
mathjax: true
toc: true
tocnumber: true
music: false
image: false
abbrlink: 26f946b3
date: 2019-03-08 09:43:59
tags:
  - HTML5
  - 音乐可视化
categories: learn
description: '在 AudioContext 音频上下文中，把音频文件转成 buffer 格式存为 AudioBufferSourceNode ，前面是直接链接给 GainNode 控制音量，现在我们要分析音乐的一些特性，所以要改成先链接给 AnalyserNode ，最后到达 destination 输出音乐。这里形成了一个音频通道，每个模块通过 connect 方法链接并传送音频。<br>本文就从 AnalyserNode 开始介绍。'
---



前面有认真介绍 [Web Audio Api](https://hushhw.cn/posts/learn/908137cb.html) 的相关知识，本文得先回顾前面的脉络结构后再往后走。

开局一张图，再次祭出老师的 PPT：

![imooc](https://qn.hushhw.cn/images/Snipaste_2019-03-06_20-33-24.png)



在 **AudioContext** 音频上下文中，把音频文件转成 **buffer** 格式存为 **AudioBufferSourceNode** ，前面是直接链接给 **GainNode** 控制音量，现在我们要分析音乐的一些特性，所以要改成先链接给 **AnalyserNode** ，最后到达 **destination** 输出音乐。这里形成了一个音频通道，每个模块通过 **connect** 方法链接并传送音频。

本文就从 **AnalyserNode** 开始介绍。

​              

## AnalyserNode

**AnalyserNode** 赋予了节点可以提供实时频率及时间域分析的信息，它使一个 **AudioNode** 通过音频流不做修改的从输入到输出，但允许你获取生成的数据，处理它并创建音频可视化。

**AnalyzerNode** 只有一个输入和输出，即使未连接输出它也会工作。

{% qnimg WebAudioFFT.png %}

首先创建方法见上一篇中 **AudioContext** 中的方法来创建：

```javascript
var analyser = ac.createAnalyser();
```

### 属性

1. **AnalyserNode.fftSize** ：设置 FFT（FFT 是离散傅里叶变换的快速算法，用于将一个信号变换到频域）值的大小，用于分析得到频域，必须是从 32 ~ 32768 范围内的 2 的非零幂，默认为2048。
2. **AnalyserNode.frequencyBinCount** ：值固定为 **fftSize** 值的一半，该属性通常用于可视化的数据值的数量。
3. **AnalyserNode.smoothingTimeConstant** ：是一个双精度浮点型(double)的值，表示最后一个分析帧的平均常数。它基本上是当前缓冲区和 AnalyserNode 处理的最后一个缓冲区之间的平均值，并导致在值变化时随着时间推移得到一个更平滑的集合。默认值为 0.8，值的范围必须在  0 ~ 1 之间。

### 方法

**AnalyserNode.getByteFrequencyData()** ：将当前频率数据（数量是 **frequencyBinCount**）复制到 Uint8Array（无符号字节数组）中。

​               

具体实现代码：

```javascript
var analyser = ac.createAnalyser();
analyser.fftSize = 512;
analyser.connect(gainNode);

function visualizer(){
    var arr = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(arr);
    console.log(arr); 
}
```

这里可以打印出分析到的音频开始播放的第一时刻的数据，要想实时的打印出数据，需要用到 **requestAnimationFrame** 去反复收集当前音频的频率数据，具体可以参看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 官网对该方法的介绍。

```javascript
function visualizer(){
    var arr = new Uint8Array(analyser.frequencyBinCount);
    requestAnimationFrame = window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame;
    function v(){
        analyser.getByteFrequencyData(arr);
        console.log(arr);
        requestAnimationFrame(v);
    }
    requestAnimationFrame(v);
}
```

这样我们就拿到了实时音频的频率数据，下面我们就利用这些数据来实现音乐的可视化。

​            

> 参考：
>
> [Web API 接口参考](https://developer.mozilla.org/zh-CN/docs/Web/API)
>
> [HTML5音乐可视化视频课程](https://www.imooc.com/learn/299)

