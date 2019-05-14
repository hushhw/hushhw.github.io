---
title: Set(STL)用法与心得
comments: true
mathjax: true
toc: true
music: false
image: false
tags:
  - STL
  - C/C++
categories: learn
description: "std::set 是一种包含已排序对象的关联容器，含有 Key 类型对象的已排序集。用比较函数 Compare进行排序。搜索、移除和插入拥有对数复杂度，set通常以红黑树实现。"
abbrlink: f5dd410d
date: 2019-02-25 15:08:05
tocnumber: true
---



STL总结系列：

- 『[优先队列（priority_queue）用法与心得](https://hushhw.cn/posts/learn/179.html)』
- 『[Map(STL)用法与心得](https://hushhw.cn/posts/learn/38f87fc0.html)』
- 『[Vector(STL)用法与心得](https://hushhw.cn/posts/learn/d20d34ce.html)』

​         

### Set简介

`std::set` 是一种包含已排序对象的关联容器，含有 `Key` 类型对象的已排序集。用比较函数 Compare进行排序。搜索、移除和插入拥有对数复杂度。 `set`通常以红黑树实现（C++ `STL`中的关联容器：`map`，`set`，`multiset`，`multimap`内部的数据结构为红黑树）。

`set`/`multiset`会根据待定的排序准则，自动将元素排序。两者不同在于前者不允许元素重复，而后者允许。

1) 不能直接改变元素值，因为那样会打乱原本正确的顺序，要改变元素值必须先删除旧元素，则插入新元素；

2) 不提供直接存取元素的任何操作函数，只能通过迭代器进行间接存取，而且从迭代器角度来看，元素值是常数；

3) 元素比较动作只能用于型别相同的容器(即元素和排序准则必须相同)；





### 成员函数简介与常用代码写法

#### 头文件与声明

```c++
#include <set>
```

使用set需要上面这个头文件。

```c++
set<int> v;		//创建一个int类型的set容器
set<int>::iterator it;     //创建一个他对应的迭代器

int myints[] = {75,23,65,42,13,13};
set<int> myset (myints,myints+6); //另外一种直接读入数据
```

​       

#### 插入元素

```c++
int A[10]={9,5,8,6,4,2,3,7,0,1};
	for(int i=0;i<10;i++){
        v.insert(A[i]); //在v的尾部循环插入元素
    }
```

​        

#### 查找元素及删除元素

使用`find()`来查找某个元素，返回给定值的迭代器，如果没找到则返回end()。

使用`erase()`来删除某个元素，set中的删除操作是不进行任何的错误检查的，比如迭代器的是否合法等等，所以用的时候自己一定要注意。

```c++
it=v.find(9);
v.erase (it); //输出 0 1 2 3 4 5 6 7 8
v.erase (v.find(0)); //输出1 2 3 4 5 6 7 8
```

​         

#### lower_bound/upper_bound

`lower_bound` 返回指向首个**不小于**给定键的元素的迭代器

`upper_bound` 返回指向首个**大于**给定键的元素的迭代器

```c++
set<int>::iterator itlower, itupper;
itlower = v.lower_bound(3); //3
itupper = v.upper_bound(6); //7
v.erase(itlower, itupper);
for (it = v.begin(); it != v.end(); it++){
    cout << *it << " "; //输出为 1 2 7 8，删除了3——6
}
cout << endl;
```

​         



#### 返回某个值元素的个数count()

只可能为0或1，所以可以用来判断一个元素是否存在

```c++
for(int i=0;i<10; i++){
	cout << i;
	if (v.count(i)>0) //返回某个值元素的个数
		cout << " is an element of v.\n";
	else 
		cout << " is not an element of v.\n";
}
```

​              

#### 完整代码

```c++
#include <iostream>
#include <set>
#include <iterator>		//迭代器
#include <algorithm>
using namespace std;

int main(){
    /* --------------1.set的创建------------------ */
	set<int> v;		//创建一个int类型的set容器
    set<int>::iterator it;     //创建一个他对应的迭代器

	/* -----2.插入元素------ */
	int A[10]={9,5,8,6,4,2,3,7,0,1};
	for(int i=0;i<10;i++){
        v.insert(A[i]);
    }

	/* ----------3.find()查找元素及erase()删除元素----------- */
	it=v.find(9);
    v.erase (it); //输出 0 1 2 3 4 5 6 7 8
    v.erase (v.find(0)); //输出1 2 3 4 5 6 7 8

	/* ----4.返回某个值元素的个数---- */
    for(int i=0;i<10; i++){
        cout << i;
        if (v.count(i)>0) //返回某个值元素的个数
            cout << " is an element of v.\n";
        else 
            cout << " is not an element of v.\n";
    }

	
	/* ----5.lower_bound/upper_bound---- */
	//lower_bound 返回指向首个不小于给定键的元素的迭代器
    //upper_bound 返回指向首个大于给定键的元素的迭代器
    set<int>::iterator itlower, itupper;
    itlower = v.lower_bound(3); //3
    itupper = v.upper_bound(6); //7
    v.erase(itlower, itupper);
    for (it = v.begin(); it != v.end(); it++){
        cout << *it << " "; //输出为 1 2 7 8，删除了3——6
    }
    cout << endl;
    
    system("pause");
    return 0;
}
```

​          

### Set 改变排序顺序

```c++
struct classcomp {
	bool operator() (const int& lhs, const int& rhs) const{
        return lhs > rhs;
    }
};

set<int, classcomp> f;
set<int, classcomp>::iterator fit;

int main(){
  	int A[10]={9,5,8,6,4,2,3,7,0,1};
    for(int i=0;i<10;i++){
        f.insert(A[i]);
    }
    cout << "reverse set: ";
    for (fit = f.begin(); fit != f.end(); fit++){
        cout << *fit<<" ";
    }
    cout << endl; //输出 9 8 7 6 5 4 3 2 1 0
  	return 0;
}
```

下面这段代码结构体排序按照 x 从小到大排序，x 相同则按照 y 从大到小排序

```c++
struct Node{
  int x,y;
};
struct classcomp{
  bool operator()(const Node &a, const Node &b) const{
    if(a.x != b.x) return a.x<b.x;
    else return a.y>b.y;
  }
};

set<Node, classcomp> st;
set<Node, classcomp>::iterator sit;
multiset<Node, classcomp> mt;
multiset<Node, classcomp> mit;
```

​          

### 基本操作函数汇总

|        函数         | 用法                  |
| :---------------: | :------------------ |
|    **begin**()    | 返回指向容器第一个元素的迭代器     |
|    **clear**()    | 删除所有元素              |
|    **empty**()    | 检查容器是否为空            |
|     **end**()     | 返回指向容器尾端的迭代器        |
|    **erase**()    | 删除一个元素              |
|   **insert**()    | 插入元素                |
|  **max_size**()   | 返回可以容纳的最大元素个数       |
|   **rbegin**()    | 返回指向容器最后元素的逆向迭代器    |
|    **rend**()     | 返回指向前端的逆向迭代器        |
|    **size**()     | 返回容纳的元素数            |
|    **swap**()     | 交换内容                |
|    **find**()     | 寻找带有特定键的元素          |
|    **count**()    | 返回匹配特定键的元素数量        |
| **lower_bound**() | 返回指向首个不小于给定键的元素的迭代器 |
| **upper_bound**() | 返回指向首个大于给定键的元素的迭代器  |
| **equal_range**() | 返回匹配特定键的元素范围        |





> 本文参考自：
>
> https://zh.cppreference.com/w/cpp/container/set
>

