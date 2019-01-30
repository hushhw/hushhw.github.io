---
title: 优先队列(priority_queue)用法及心得
comments: true
mathjax: true
toc: true
tags:
  - 算法笔记
  - STL
categories: learn
abbrlink: 179
date: 2018-04-15 10:31:54
---

>  普通的队列是一种先进先出的数据结构，元素在队列尾追加，而从队列头删除。在优先队列中，元素被赋予优先级。当访问元素时，具有最高优先级的元素最先删除。优先队列具有最高级先出 （first in, largest out）的行为特征。通常采用堆数据结构来实现。

<!--more-->

​        

## 优先队列的头文件&&声明

首先，你需要

```c++
#include <queue>
#include <functional> //如果要用到后面的greater<int>
using namespace std;
```

这两个头文件。

其次，一个优先队列声明的基本格式是： 
**priority_queue<结构类型> 队列名;** 
比如：

```c++
priority_queue <int> i;
priority_queue <double> d;
```

不过，我们最为常用的是这几种：

```c++
priority_queue <node> q;
//node是一个结构体
//结构体里重载了‘<’小于符号
priority_queue <int,vector<int>,greater<int> > q;
//不需要#include<vector>头文件
//注意后面两个“>”不要写在一起，“>>”是右移运算符
priority_queue <int,vector<int>,less<int> >q;
```

我们将在下文来讲讲这几种声明方式的不同。



## 优先队列的基本操作

与队列的基本操作如出一辙。 

以一个名为q的优先队列为例。

```
q.size();//返回q里元素个数
q.empty();//返回q是否为空，空则返回1，否则返回0
q.push(k);//在q的末尾插入k
q.pop();//删掉q的第一个元素
q.top();//返回q的第一个元素
q.back();//返回q的末尾元素
```



## 优先队列的特性

**自动排序**
怎么个排法呢？ 
在这里介绍一下：

### 默认的优先队列（非结构体结构）

```
priority_queue <int> q;
```

这样的优先队列是怎样的？让我们写程序验证一下。

```c++
#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <queue>
using namespace std;

priority_queue <int> q;

int main(){
	int a[]={10, 8, 12, 14, 6};
	for(int i=0; i<5; i++) q.push(a[i]);
	while(!q.empty()){
		printf("%d ",q.top()); //14 12 10 8 6
		q.pop();
	}
	system("pause");
	return 0;
}
```

程序大意就是在这个优先队列里依次插入10、8、12、14、6，再输出。 
结果是什么呢？ 
`14 12 10 8 6` 
也就是说，它是按从大到小排序的！



### 默认的优先队列（结构体，重载小于）

先看看这个结构体是什么。

```c++
struct node{
	int x, y;
	node(int xx, int yy){
		x=xx;
		y=yy;
	}
	bool operator < (const node & a) const{
		return x < a.x;
	}
};
```

这个node结构体有两个成员，x和y，它的小于规则是x小者小。 
再来看看验证程序：

```c++
#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <queue>
using namespace std;

struct node{
	int x, y;
	node(int xx, int yy){
		x=xx;
		y=yy;
	}
	bool operator < (const node & a) const{
		return x < a.x;
	}
};

int main(){
	priority_queue <node> q;
	q.push(node(10, 100));
	q.push(node(12,60));
	q.push(node(14,40));
	q.push(node(6,80));
	q.push(node(8,20));
	while(!q.empty()){
		printf("(%d,%d) ",q.top().x,q.top().y); //(14,40) (12,60) (10,100) (8,20) (6,80)
		q.pop();
	}
	system("pause");
	return 0;
}
```

程序大意就是插入(10,100),(12,60),(14,40),(6,20),(8,20)这五个node。 
再来看看它的输出： 
`(14,40) (12,60) (10,100) (8,20) (6,80)`

它也是按照**重载后的小于规则**，从大到小排序的。



### less和greater优先队列

还是以int为例，先来声明：

```c++
priority_queue <int,vector<int>,less<int> > p;
priority_queue <int,vector<int>,greater<int> > q;
```

话不多说，上程序和结果：

```c++
#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <functional> //因为用了greater<int>() 
#include <queue>
using namespace std;

int main()
{
	priority_queue <int,vector<int>,less<int> > p;
	priority_queue<int, vector<int>, greater<int> > q;
	int a[5]={10,12,14,6,8};

	for(int i=0;i<5;i++)
		p.push(a[i]),q.push(a[i]);

	printf("less<int>:");
	while(!p.empty())
		printf("%d ",p.top()),p.pop();  

	printf("\ngreater<int>:");
	while(!q.empty())
		printf("%d ",q.top()),q.pop();

	system("pause");
	return 0;
}
```

结果： 
`less<int>:14 12 10 8 6 greater<int>:6 8 10 12 14`

所以，我们可以知道，**less是从大到小，greater是从小到大**。

### 作个总结

为了~~装13~~方便，在平时，建议大家写：

```
priority_queue<int,vector<int>,less<int> >q;
priority_queue<int,vector<int>,greater<int> >q;12
```

平时如果用从大到小不用后面的`vector<int>,less<int>`，可能到时候要改成从小到大，你反而会搞忘怎么写`greater<int>`，反而得不偿失。



> 本文转载自：https://blog.csdn.net/c20182030/article/details/70757660