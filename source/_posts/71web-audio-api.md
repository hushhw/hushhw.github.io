---
title: HTML5音频API Web Audio
comments: true
mathjax: true
toc: true
tocnumber: true
music: false
image: false
abbrlink: 908137cb
date: 2019-03-07 15:01:34
tags:
  - HTML5
  - 音乐可视化
categories: 
  - 编程开发
  - Web
  - HTML5
description: '因为毕业设计要做音乐可视化的相关项目，所以必须要弄清楚 HTML 5 的音频 API —— Web Audio。

初看官方文档时发现音频处理模块太多了，只能一边用一边学，所以先去跟着慕课网上的课程『HTML5音乐可视化 』走，慢慢研究这里面的架构。'
---



因为毕业设计要做音乐可视化的相关项目，所以必须要弄清楚 HTML 5 的音频 API —— Web Audio。

初看官方文档时发现音频处理模块太多了，只能一边用一边学，所以先去跟着慕课网上的课程『[HTML5音乐可视化](https://www.imooc.com/video/5972) 』走，慢慢研究这里面的架构。

下图是老师画的『Web Audio API 关系图』：

![imooc](https://photo.hushhw.cn/images/Snipaste_2019-03-06_20-33-24.png)

本篇文章就基于这张图来了解 Web Audio API。

​           

## ajax 请求获取音频资源数据

使用 **ajax** 请求获取音频资源数据时使用 **XMLHttpRequest** (XHR) 对象可以与服务器交互。使用前先调用其构造函数来初始化一个 **XMLHttpRequest** 对象。

```javascript
var xhr = new XMLHttpRequest();
```

这里再介绍几个用到的`属性`和`方法`：

### 属性

**XMLHttpRequest.responseType** ：是一个枚举类型的属性，返回响应数据的类型。它允许我们手动的设置返回数据的类型。如果我们将它设置为一个空字符串，它将使用默认的"text"类型。这里我们返回的类型为 `arraybuffer` ，是一个包含二进制数据的 JavaScript **ArrayBuffer**（ ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区）。

**XMLHttpRequest.response** ：返回 ArrayBuffer、Blob、Document、DOMString，具体是哪种类型取决于**XMLHttpRequest.responseType** 值。

### 方法

**XMLHttpRequest.abort()** ：如果请求已经被发送,则立刻中止请求。

```javascript
function load(url){
    xhr.abort();
    xhr.open("GET", url); 
    xhr.responseType = "arraybuffer";
    xhr.onload = function(){
        console.log(xhr.response);
        },function(err){
            console.log(err);
        });
    }
    xhr.send();
}
```

​           

## AudioContext

**AudioContext** 是一个音频上下文，所有的音频在这个音频上下文中处理。就好像 webGL 中最开始要定义一个『绘图上下文』，然后使用绘图上下文调用相应的绘图函数。

简单声明：

```javascript
var audioCtx = new AudioContext;
```

跨浏览器的方式：

```javascript
var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
```

**AudioContext** 音频上下文提供了很多属性和方法，用于创建各种音频源和音频处理模块等，这里只介绍一部分用到的。

### 属性

**AudioContext.destination** ：返回 **[AudioDestinationNode](#AudioDestinationNode)** 对象，表示当前 **AudioContext** 中所有节点的最终节点，一般表示音频渲染设备。

**AudioContext.currentTime** ：以双精度浮点型数字返回硬件调用的秒数，**AudioContext** 一创建就从0开始走，无法停掉、暂停或者重置。

### 方法

1. **AudioContext.createBufferSource()** ：创建一个 **[AudioBufferSourceNode](#AudioBufferSourceNode)** 对象，他可以通过 **AudioBuffer** 对象来播放和处理包含在内的音频数据。


2. **AudioContext.createGain()** ：创建一个 **[GainNode](#GainNode)**,它可以控制音频的总音量。


3. **AudioContext.createAnalyser()** ：创建一个 **AnalyserNode**，它可以用来显示音频时间和频率的数据。


4. **AudioContext.decodeAudioData(audioData, function(decodedData)** ：异步解码音频文件中的 **ArrayBuffer**，这里的 **ArrayBuffer** 通过前面的 **XMLHttpRequest** 获得。

​           

## AudioBufferSourceNode

表示内存中的一段音频资源，其音频数据存在于 **AudioBuffer** 对象中。可以通过上面提到的 **AudioContext.createBufferSource()** 来创建：

```javascript
var bufferSource = ac.createBufferSource(); 
```

### 属性

1. **AudioBufferSourceNode.buffer** ：是一个 **AudioBuffer** 对象，表示要播放的音频资源数据，前面通过 **decodeAudioData()** 方法将 **ArrayBuffer** 进行异步解码，当成功解码PCM Data后通过回调返回，将返回的结果即赋值给这里的 **buffer** 。
   1. 子属性 **duration** 表示该音频资源的时长（秒）
2. **AudioBufferSourceNode.loop** ：是否循环播放，默认 false

### 事件

**AudioBufferSourceNode.onended** ：可绑定音频播放完毕时调用的事件处理程序

### 方法

1. **start/noteOn([when], [offset], [duration])** ：开始播放音频。
   1. when = ac.currentTime ，表示何时开始播放；
   2. offset = 0 ，表示从音频的第几秒开始播放；
   3. duration = buffer.duration-offset ，表示播放几秒。
2. **stop/noteOff([when])** ：结束播放音频
   1. when = ac.currentTime ，表示何时结束播放。



前面代码汇总：

```javascript
var xhr = new XMLHttpRequest();
var ac = new (window.AudioContext||window.webitAudioContext)(); 

function load(url){
    xhr.open("GET", url); 
    xhr.responseType = "arraybuffer"; 
    xhr.onload = function(){
        ac.decodeAudioData(xhr.response, function(buffer){ 
            if(n != count) return;
            var bufferSource = ac.createBufferSource(); 
            bufferSource.buffer = buffer; 
            bufferSource[bufferSource.start?"start":"noteOn"](0);
        },function(err){
            console.log(err);
        });
    }
    xhr.send();
}
```

​           

## GainNode

**GainNode** 接口表示音量变更，通过前面提到的 **AudioContext.createGain()** 进行创建：

```javascript
var gainNode = ac[ac.createGain?"createGain":"createGainNode"]();
```

根据前面的关系图，需要把 **AudioBufferSourceNode** 连接到 **GainNode** ：

```javascript
bufferSource.connect(gainNode);
```

下面是控制音量的代码：

```javascript
function changeVolume(percent){
    gainNode.gain.value = percent * percent;
}

$("#volume")[0].onchange = function(){
    changeVolume(this.value/this.max);
}
$("#volume")[0].onchange();
```

​           

## AudioDestinationNode

前面提到的 **AudioContext.destination** ，返回 **AudioDestinationNode** 对象，表示当前 audio context 中所有节点的最终节点，一般表示音频渲染设备。

根据关系图，最终要连接给 **destination** 才可以实现音乐的播放。

​          

## 总结

至此，思路就很清晰了，按照关系图一步一步走下来，在 **AudioContext** 音频上下文中，把音频文件转成 **buffer** 格式存为 **AudioBufferSourceNode** ，链接给 **GainNode** 控制音量，最后到达 **destination** 输出音乐。这里形成了一个音频通道，每个模块通过 **connect** 方法链接并传送音频。

```javascript
var xhr = new XMLHttpRequest();
var ac = new (window.AudioContext||window.webitAudioContext)(); 
var gainNode = ac[ac.createGain?"createGain":"createGainNode"]();
gainNode.connect(ac.destination);

var source = null;
var count = 0;

function load(url){
    var n = ++count;
    source && source[source.stop ? "stop" : "noteOff"]();
    xhr.abort(); 
    xhr.open("GET", url); 
    xhr.responseType = "arraybuffer"; 
    xhr.onload = function(){
        if(n != count) return;
        ac.decodeAudioData(xhr.response, function(buffer){ 
            if(n != count) return;
            var bufferSource = ac.createBufferSource(); 
            bufferSource.buffer = buffer; 
            bufferSource.connect(gainNode);
            bufferSource[bufferSource.start?"start":"noteOn"](0);
            
            source = bufferSource;
        },function(err){
            console.log(err);
        });
    }
    xhr.send();
}

function changeVolume(percent){
    gainNode.gain.value = percent * percent;
}

$("#volume")[0].onchange = function(){
    changeVolume(this.value/this.max);
}
$("#volume")[0].onchange();
```

中间省略了 **analyserNode** 留在后面写可视化的时候再展开。

​       

 >参考：
 >
 >[Web API 接口参考](https://developer.mozilla.org/zh-CN/docs/Web/API)
 >
 >[HTML5音乐可视化视频课程](https://www.imooc.com/learn/299)









