---
title: Map(STL)用法与心得
comments: true
mathjax: true
toc: true
tocnumber: true
tags:
  - STL
  - C/C++
categories: C++
abbrlink: 38f87fc0
date: 2019-01-29 14:03:22
image: 'hqdefault.jpg'
description: "Map是STL的一个关联容器，它提供一对一（其中第一个可以称为关键字，每个关键字只能在map中出现一次，第二个可能称为该关键字的值）的数据处理能力，由于这个特性，它完成有可能在我们处理一对一数据的时候，在编程上提供快速通道。<br>这里说下map内部数据的组织，map内部自建一颗红黑树(一 种非严格意义上的平衡二叉树)，这颗树具有对数据自动排序的功能，所以在map内部所有的数据都是有序的，后边我们会见识到有序的好处。"
---



STL总结系列：

* 『[优先队列（priority_queue）用法与心得](https://wiki.hushhw.cn/posts/179.html)』


​         


### Map简介

map是STL的一种关联式容器，他提供一对一的Hash映射功能：

* 第一个称为关键字（key），每个关键字只能在map中出现一次。
* 第二个称为该关键字的值（value）。

Map的键值对应主要用于资料一对一映射（一对一）的情况，比如一个班级中，每个学生的学号跟他的姓名就存在着一对一映射的关系。

map内部自建一棵红黑树，这棵树具有对数据自动排序的功能，所以在map内部所有的数据都是有序的，也基于此，不能直接改变元素的key，因为这会破坏正确次序，要修改元素的key，必须先移除该key的元素，然后插入拥有新的key/value的元素，任何两个元素没有相同的key值。

- map：红黑树（查询，插入，删除都是 $O(logn)$ ）
- unordered_map：hash结构，C ++ 11标准函式库。
- unordered_set：hash结构，但值本身即是key。
- hash_map：hash结构，非标准函式库。


​          


### 成员函数简介与常用代码写法

#### 头文件与声明

```c++
#include <map>
```

使用map需要上面这个头文件。

其次，一个map的声明格式为：

```C++
map<string, string> mapStudent;
```

其中key/value的类型可以是任意你需要的类型。

​       

####插入

```c++
//用insert函数插入pair数据
    mapStudent.insert(pair<string, string>("r000", "student_zero"));

    //用insert函数插入value_type数据
    mapStudent.insert(map<string, string>::value_type("r001", "student_one"));

    //用数组方式插入数据
    mapStudent [ "r123" ] =  "student_first" ;
    mapStudent [ "r456" ] =  "student_second" ;
```

以上三种用法，虽然都可以实现数据的插入，但是它们是有区别的，当然了第一种和第二种在效果上是完成一样的，用insert函数插入数据，在数据的 插入上涉及到集合的唯一性这个概念，即当map中有这个关键字时，insert操作是插入数据不了的，但是用数组方式就不同了，它可以覆盖以前该关键字对应的值。

​            

#### map的大小

```c++
int size = mapStudent.size();
```



#### map的遍历

```c++
//应用前向迭代器
map<int, string>::iterator iter;
    for(iter = mapStudent.begin(); iter != mapStudent.end(); iter++)
       cout<<iter->first<<' '<<iter->second<<endl;  
}  

//应用反相迭代器
map<int, string>::reverse_iterator iter_r;  
    for(iter_r = mapStudent.rbegin(); iter_r != mapStudent.rend(); iter_r++)
        cout<<iter_r->first<<"  "<<iter_r->second<<endl;  
}  

//数组，用于类型可以很方便数字遍历
```

​          

#### 查找并获取map中的元素

用find函数来定位数据出现位置，它返回的一个迭代器，当数据出现时，它返回数据所在位置的迭代器，如果map中没有要查找的数据，它返回的迭代器等于end函数返回的迭代器。

查找map中是否包含某个关键字条目用find()方法，传入的参数是要查找的key，在这里需要提到的是**begin()**和**end()**两个成员，分别代表map对象中第一个条目和最后一个条目，这两个数据的类型是iterator。

```c++
iter = mapStudent.find("r123");

if(iter != mapStudent.end())
       cout<<"Find, the value is"<<iter->second<<endl;
else
   cout<<"Do not Find"<<endl;
```

​          

#### 从map中删除元素

移除某个map中某个条目用erase（）

该成员方法的定义如下：

* iterator erase（iterator it);//通过一个条目对象删除
* iterator erase（iterator first，iterator last）//删除一个范围
* size_type erase(const Key&key);//通过关键字删除

```c++
//迭代器删除
iter = mapStudent.find("r123");
mapStudent.erase(iter);

//用关键字删除
int n = mapStudent.erase("r123");//如果删除了會返回1，否則返回0

//用迭代器范围删除 : 把整個map清空
mapStudent.erase(mapStudent.begin(), mapStudent.end());
//等同於mapStudent.clear()
```

​          

#### 完整代码

```c++
#include <iostream>
#include <map>
#include <iterator>		//迭代器
using namespace std;

int main(){
    /* --------------1.map的声明及迭代器声明------------------ */
    map<string, string> mapStudent;
    map<string, string>::iterator iter;
    map<string, string>::reverse_iterator iter_r;


    /* --------------2.map插入数据------------------ */
    //用insert函数插入pair数据
    mapStudent.insert(pair<string, string>("r000", "student_zero"));

    //用insert函数插入value_type数据
    mapStudent.insert(map<string, string>::value_type("r001", "student_one"));

    //用数组方式插入数据
    mapStudent [ "r123" ] =  "student_first" ;
    mapStudent [ "r456" ] =  "student_second" ;

    /* --------------3.map的大小------------------ */
    int nsize = mapStudent.size();

    /* --------------4.map的遍历------------------ */
    //traversal
    for(iter = mapStudent.begin(); iter != mapStudent.end(); iter++)
                cout<<iter->first<<" "<<iter->second<<endl;
    for(iter_r = mapStudent.rbegin(); iter_r != mapStudent.rend(); iter_r++)
                cout<<iter_r->first<<" "<<iter_r->second<<endl;

    /* --------------5.map的查找------------------ */
    iter = mapStudent.find("r123");

    if(iter != mapStudent.end())
       cout<<"Find, the value is "<<iter->second<<endl;
    else
       cout<<"Do not Find"<<endl;
    
    /* --------------6.map删除元素------------------ */
    //迭代器删除
    iter = mapStudent.find("r123");
    mapStudent.erase(iter);

    //用关键字删除
    int n = mapStudent.erase("r123");//如果删除了會返回1，否則返回0

    //用迭代器范围删除 : 把整個map清空
    mapStudent.erase(mapStudent.begin(), mapStudent.end());
    //等同於mapStudent.clear()

    return 0;
}
```



### 基本操作函数汇总

|         函数          | 用法                |
| :-----------------: | :---------------- |
|     **begin**()     | 返回指向map头部的迭代器     |
|     **clear**()     | 删除所有元素            |
|     **count**()     | 返回指定元素出现的次数       |
|     **empty**()     | 如果map为空则返回true    |
|      **end**()      | 返回指向map末尾的迭代器     |
|  **equal_range**()  | 返回特殊条目的迭代器对       |
|     **erase**()     | 删除一个元素            |
|     **find**()      | 查找一个元素            |
| **get_allocator**() | 返回map的配置器         |
|    **insert**()     | 插入元素              |
|   **key_comp**()    | 返回比较元素key的函数      |
|  **lower_bound**()  | 返回键值>=给定元素的第一个位置  |
|   **max_size**()    | 返回可以容纳的最大元素个数     |
|    **rbegin**()     | 返回一个指向map尾部的逆向迭代器 |
|     **rend**()      | 返回一个指向map头部的逆向迭代器 |
|     **size**()      | 返回map中元素的个数       |
|     **swap**()      | 交换两个map           |
|  **upper_bound**()  | 返回键值>给定元素的第一个位置   |
|  **value_comp**()   | 返回比较元素value的函数    |



> 本文参考自：
>
> https://www.cnblogs.com/fnlingnzb-learner/p/5833051.html
>
> http://mropengate.blogspot.com/2015/12/cc-map-stl.html
>
> http://www.cplusplus.com/reference/map/map/key_comp/



