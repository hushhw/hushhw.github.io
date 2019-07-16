---
title: Vector(STL)用法与心得
comments: true
mathjax: true
toc: true
tocnumber: true
abbrlink: d20d34ce
date: 2019-01-29 14:03:34
tags:
  - STL
  - C/C++
categories: 
  - 编程开发
  - C++
description: "Vector 是C++标准程序库中的一个类，可视为会自动扩展容量的数组，以循序(Sequential)的方式维护变量集合。vector的特色有支持随机存取，在集合尾端增删元素很快，但是在集合中间增删元素比较费时。vector是C++标准程序库中的众多容器（container）之一。 vector以模板(泛型)方式实现，可以保存任意类型的变量，包括用户自定义的数据类型，例如：它可以是放置整数（int）类型的 vector、也可以是放置字符串（string）类型的 vector、或者放置用户自定类别（user-defined class）的 vector。"
---



STL总结系列：

* 『[优先队列（priority_queue）用法与心得](https://wiki.hushhw.cn/posts/179.html)』
* 『[Map(STL)用法与心得](https://wiki.hushhw.cn/posts/38f87fc0.html)』


​         


### Vector简介

**Vector** 是C++标准程序库中的一个类，可视为会自动扩展容量的数组，以循序(Sequential)的方式维护变量集合。vector的特色有支持随机存取，在集合尾端增删元素很快，但是在集合中间增删元素比较费时。vector是C++标准程序库中的众多容器（*container*）之一。 vector以模板(泛型)方式实现，可以保存任意类型的变量，包括用户自定义的数据类型，例如：它可以是放置整数（int）类型的 vector、也可以是放置字符串（string）类型的 vector、或者放置用户自定类别（user-defined class）的 vector。




### 成员函数简介与常用代码写法

#### 头文件与声明

```c++
#include <vetor>
```

使用vector需要上面这个头文件。

```C++
//创建一个int类型的vector容器
vector<int> v;	
//创建一个int类型的vector容器，该容器暂有10个int元素，每个元素被赋初始值为0
vector<int> v2(10);	
//创建一个int类型的vector容器，该容器有5个int元素，每个元素被赋值99
vector<int> v3(5,99);
//创建一个int类型的vector容器，该容器拷贝v2，该容器具有10个值为0的元素。
vector<int> v4(v2);	
```

​       

#### push_back(),pop_back()添加删除元素

```c++
int A[10]={9,5,8,6,4,2,3,7,0,1};
	for(int i=0;i<10;i++){
		v.push_back(A[i]);	//在v的尾部循环插入元素
	}
	v.pop_back(); //在v的尾部删除元素
```

在vector头部添加元素，无法完成，因为vector的数据结构为数组，无法在头部插入元素，否则需要整个数组前移；在vector头部删除元素，无法完成，理由同上。

​            

#### 取某位置的元素值

```c++
cout<<"在0位置的元素值为："<<v.at(0)<<endl;
cout<<"在1位置的元素值为："<<v[1]<<endl;
```



#### vector的遍历

```c++
//sort(v.begin(), v.end()); sort的时候经常用到
vector<int>::iterator vIter; //迭代器
for (vIter = v.begin(); vIter < v.end(); vIter++){
	cout << *vIter << " "; 
}
```

​          

#### 访问头部元素和尾部元素

```c++
// 返回尾部数据的引用
cout << "尾部数据的值为：" << v.back() << endl;
// 返回头部数据的引用
cout << "头部数据的值为：" << v.front() << endl;
```

​          

#### vector的大小及判空

```c++
cout << "vector中的最大容量为：" << v.max_size() << endl;
cout << "vector中的元素个数为：" << v.size() << endl;
cout << "vector是否为空：" << v.empty() << endl;
```

​          

#### 交换元素位置

```c++
swap(v[0],v[1]);
```

​        

#### 升降排序

```c++
// 对vector进行升序排序
sort(v.begin(), v.end());

// 对vector进行降序排序
reverse(v.begin(), v.end());
```

​            

#### 删除某个元素

```c++
vector<int>::iterator vItera = v.begin();
vItera = vItera + 2;
v.erase(vItera);
```

为什么要使用iterator来进行定位，因为数组如果要删除一个元素或者插入一个元素，会导致其他元素移动，所以不能直接进行删除

​       

#### 插入元素

vector插入某元素，要使用iterator来定位某个位置

```c++
vector<int>::iterator vInsert = v.begin();
vInsert = vInsert + 2;
v.insert(vInsert, 777);
```

​        

#### 完整代码

```c++
#include <iostream>
#include <vector>		//使用vector需要引用这个头文件
#include <iterator>		//迭代器
#include <algorithm>
using namespace std;

void PrintVector(vector<int> c){
	cout << "Vector中的数据为：";
	vector<int>::iterator vIter; //迭代器
	for (vIter = c.begin(); vIter < c.end(); vIter++){
		cout << *vIter << " "; 
	}
	cout << endl;
}

int main(){
	/* --------------1.vector的创建------------------ */
	//创建一个int类型的vector容器
	vector<int> v;	
	//创建一个int类型的vector容器，该容器暂有10个int元素，每个元素被赋初始值为0
	vector<int> v2(10);	
	//创建一个int类型的vector容器，该容器有5个int元素，每个元素被赋值99
	vector<int> v3(5,99);
	//创建一个int类型的vector容器，该容器拷贝v2，该容器具有10个值为0的元素。
	vector<int> v4(v2);	

	/* -----2.push_back(),pop_back()添加删除元素------ */
	int A[10]={9,5,8,6,4,2,3,7,0,1};
	for(int i=0;i<10;i++){
		v.push_back(A[i]);	//在v的尾部循环插入元素
	}
	v.pop_back(); //在v的尾部删除元素


	/* ----------3.[],at(),取某位置的元素值----------- */
	cout<<"在0位置的元素值为："<<v.at(0)<<endl;
	cout<<"在1位置的元素值为："<<v[1]<<endl;

	/* ----4.begin(),end(),指向头元素、尾元素的指针---- */
	//sort(v.begin(), v.end()); sort的时候经常用到
	vector<int>::iterator vIter; //迭代器
	for (vIter = v.begin(); vIter < v.end(); vIter++){
		cout << *vIter << " "; 
	}
	cout << endl;

	/* ----5.back(),front(),访问头部元素和尾部元素---- */
	// 返回尾部数据的引用
	cout << "尾部数据的值为：" << v.back() << endl;
	// 返回头部数据的引用
	cout << "头部数据的值为：" << v.front() << endl;

	/* -----------6.max_size()和size()------------- */
	cout << "vector中的最大容量为：" << v.max_size() << endl;
	cout << "vector中的元素个数为：" << v.size() << endl;

	/* ----------7.empty()，判断是否为空------------ */
	cout << "vector是否为空：" << v.empty() << endl;

	/* ----------8.swap(),交换两个元素位置------------ */
	swap(v[0],v[1]);
	PrintVector(v);

	/* -------------9.sort()和reverse()------------- */
	// 对vector进行升序排序
	sort(v.begin(), v.end());
	PrintVector(v);
	// 对vector进行降序排序
	reverse(v.begin(), v.end());
	PrintVector(v);

	/* ----------10.erase()：删除某个元素----------- */
	// 删除数组的某个元素,要使用iterator来定位某个位置
	vector<int>::iterator vItera = v.begin();
	vItera = vItera + 2;
	v.erase(vItera);
	PrintVector(v);

	/* ----------11.insert(): 插入元素------------ */
	// vector插入某元素，要使用iterator来定位某个位置
	vector<int>::iterator vInsert = v.begin();
	vInsert = vInsert + 2;
	v.insert(vInsert, 777);
	PrintVector(v);

	/* ---------12.clear()：清除所有元素------------*/
	// 清除所有数据
	v.clear();
	PrintVector(v);
	cout << "vector是否为空：" << v.empty() << endl;

	system("pause");
	return 0;
}
```



### 基本操作函数汇总

|       函数        | 用法                |
| :-------------: | :---------------- |
|   **begin**()   | 返回指向容器第一个元素的迭代器   |
|   **clear**()   | 删除所有元素            |
|   **empty**()   | 检查容器是否为空          |
|    **end**()    | 返回指向容器尾端的迭代器      |
|   **erase**()   | 删除一个元素            |
|  **insert**()   | 插入元素              |
| **max_size**()  | 返回可以容纳的最大元素个数     |
|  **rbegin**()   | 返回指向容器最后元素的逆向迭代器  |
|   **rend**()    | 返回指向前端的逆向迭代器      |
|   **size**()    | 返回容纳的元素数          |
|   **swap**()    | 交换内容              |
| **push_back**() | 将元素添加到容器末尾        |
| **pop_back**()  | 移除末元素             |
|  **resize**()   | 改变容器中可存储元素的个数     |
|   **front**()   | 访问第一个元素           |
|   **back**()    | 访问最后一个元素          |
|   **data**()    | 返回指向内存中数组第一个元素的指针 |
| **capacity**()  | 返回当前存储空间能够容纳的元素数  |
|  **reserve**()  | 预留存储空间            |



> 本文参考自：
>
> https://zh.wikipedia.org/wiki/Vector_(STL)
>
> https://zh.cppreference.com/w/cpp/container/vector

