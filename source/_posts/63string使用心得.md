---
title: C/C++ String类用法与心得
comments: true
mathjax: true
toc: true
tocnumber: true
music: false
image: false
tags:
  - C/C++
categories: learn
description: String是以char作为模板参数的模板类实例，把字符串的内存管理责任由string负责而不是由编程者负责，大大减轻了C语言风格的字符串的麻烦
abbrlink: f58b376e
date: 2019-02-26 09:14:43
---



### String类简介

`String`是以`char`作为模板参数的模板类实例，把字符串的内存管理责任由`string`负责而不是由编程者负责，大大减轻了C语言风格的字符串的麻烦。[^1]

`String`的特色：

* 提供了大量的字符操作函数。
* 可与C语言风格字符串双向转换。[^2]


​        


### 成员函数简介与常用代码写法

#### 头文件与声明

```c++
#include <string>
```

注意这里不是string.h string.h是C字符串头文件

```c++
string str; //声明一个空字符串
string str("hello C++"); //直接赋值
string s(str); //拷贝构造函数，生成str的复制品
```

​       

#### 输入输出操作

```c++
cin>>str; //读入有效字符直到遇到空格
getline(cin, str); //读取字符直到遇到换行
getline(cin, str, 'a'); //直到遇到'a'结束，其中任何字符包括'\n'都可以读入
cout<<str<<endl;
```

​       

#### 字符串赋值操作

`string &operator=(const string &s);`把字符串s赋给当前字符串
`string &assign(const char *s);`用c类型字符串s赋值
`string &assign(const char *s,int n);`用c字符串s开始的n个字符赋值
`string &assign(const string &s);`把字符串s赋给当前字符串
`string &assign(int n,char c);`用n个字符c赋值给当前字符串
`string &assign(const string &s,int start,int n);`把字符串s中从start开始的n个字符赋给当前字符串
`string &assign(const_iterator first,const_itertor last);`把first和last迭代器之间的部分赋给字符串

举例：[^3]

```c++
// string::assign
#include <iostream>
#include <string>

int main ()
{
  std::string str;
  std::string base="The quick brown fox jumps over a lazy dog.";

  // used in the same order as described above:

  str.assign(base);
  std::cout << str << '\n';

  str.assign(base,10,9);
  std::cout << str << '\n';         // "brown fox"

  str.assign("pangrams are cool",7);
  std::cout << str << '\n';         // "pangram"

  str.assign("c-string");
  std::cout << str << '\n';         // "c-string"

  str.assign(10,'*');
  std::cout << str << '\n';         // "**********"

  str.assign<int>(10,0x2D);
  std::cout << str << '\n';         // "----------"

  str.assign(base.begin()+16,base.end()-12);
  std::cout << str << '\n';         // "fox jumps over"

  return 0;
}

/*
Output:
The quick brown fox jumps over a lazy dog.
brown fox
pangram
c-string
**********
----------
fox jumps over
*/
```

​          

#### 在尾部添加字符

`string &operator+=(const string &s);` 把字符串s连接到当前字符串的结尾 
`string &append(const char *s); `把c类型字符串s连接到当前字符串结尾
`string &append(const char *s,int n);`把c类型字符串s的前n个字符连接到当前字符串结尾
`string &append(const string &s); `同operator+=()
`string &append(const string &s,int pos,int n);`把字符串s中从pos开始的n个字符连接到当前字符串的结尾
`string &append(int n,char c); `在当前字符串结尾添加n个字符c
`string &append(const_iterator first,const_iterator last);`把迭代器first和last之间的部分连接到当前字符串的结尾

下面为举例：[^3]

```c++
// appending to string
#include <iostream>
#include <string>

int main ()
{
  std::string str;
  std::string str2="Writing ";
  std::string str3="print 10 and then 5 more";

  // used in the same order as described above:
  str.append(str2);                       // "Writing "
  str.append(str3,6,3);                   // "10 "
  str.append("dots are cool",5);          // "dots "
  str.append("here: ");                   // "here: "
  str.append(10u,'.');                    // ".........."
  str.append(str3.begin()+8,str3.end());  // " and then 5 more"
  str.append<int>(5,0x2E);                // "....."

  std::cout << str << '\n';
  return 0;
}

//Output: Writing 10 dots here: .......... and then 5 more.....
```

另外string还可以用`push_back()`来添加单个字符

```c++
s.push_back('a');//这个函数只能增加单个字符
```



​        

#### String类的插入函数

`string &insert(int p0, const char *s);`在p0位置插入字符串s
`string &insert(int p0, const char *s, int n);`在p0位置插入字符串s的前n个字符
`string &insert(int p0,const string &s);`在p0位置插入字符串s
`string &insert(int p0,const string &s, int pos, int n);`在p0位置插入字符串s中pos开始的n个字符
`string &insert(int p0, int n, char c);`此函数在p0处插入n个字符c
`iterator insert(iterator it, char c);`在it处插入字符c，返回插入后迭代器的位置
`void insert(iterator it, const_iterator first, const_iterator last);`在it处插入`[first，last)`之间的字符
`void insert(iterator it, int n, char c);`在it处插入n个字符c

举例如下：[^3]

```c++
// inserting into a string
#include <iostream>
#include <string>

int main ()
{
  std::string str="to be question";
  std::string str2="the ";
  std::string str3="or not to be";
  std::string::iterator it;

  // used in the same order as described above:
  str.insert(6,str2);                 // to be (the )question
  str.insert(6,str3,3,4);             // to be (not )the question
  str.insert(10,"that is cool",8);    // to be not (that is )the question
  str.insert(10,"to be ");            // to be not (to be )that is the question
  str.insert(15,1,':');               // to be not to be(:) that is the question
  it = str.insert(str.begin()+5,','); // to be(,) not to be: that is the question
  str.insert (str.end(),3,'.');       // to be, not to be: that is the question(...)
  str.insert (it+2,str3.begin(),str3.begin()+3); // (or )

  std::cout << str << '\n';
  return 0;
}

//Output: to be, or not to be: that is the question...
```

​         

#### String类的删除函数

`iterator erase(iterator first, iterator last);`删除`[first，last)`之间的所有字符，返回删除后迭代器的位置
`iterator erase(iterator it);`删除it指向的字符，返回删除后迭代器的位置
`string &erase(int pos = 0, int n);`删除pos开始的n个字符，返回修改后的字符串

举例：[^3]

```c++
// string::erase
#include <iostream>
#include <string>

int main ()
{
  std::string str ("This is an example sentence.");
  std::cout << str << '\n';
                                           // "This is an example sentence."
  str.erase (10,8);                        //            ^^^^^^^^
  std::cout << str << '\n';
                                           // "This is an sentence."
  str.erase (str.begin()+9);               //           ^
  std::cout << str << '\n';
                                           // "This is a sentence."
  str.erase (str.begin()+5, str.end()-9);  //       ^^^^^
  std::cout << str << '\n';
                                           // "This sentence."
  return 0;
}

/*
Output:
This is an example sentence.
This is an sentence.
This is a sentence.
This sentence.
*/
```

​         

#### String类的替换函数

`string &replace(int p0, int n0,const char *s);`删除从p0开始的n0个字符，然后在p0处插入串s
`string &replace(int p0, int n0,const char *s, int n);`删除p0开始的n0个字符，然后在p0处插入字符串s的前n个字符
`string &replace(int p0, int n0,const string &s);`删除从p0开始的n0个字符，然后在p0处插入串s
`string &replace(int p0, int n0,const string &s, int pos, int n);`删除p0开始的n0个字符，然后在p0处插入串s中从pos开始的n个字符
`string &replace(int p0, int n0,int n, char c);`删除p0开始的n0个字符，然后在p0处插入n个字符c
`string &replace(iterator first0, iterator last0,const char *s);`把[first0，last0)之间的部分替换为字符串s
`string &replace(iterator first0, iterator last0,const char *s, int n);`把[first0，last0)之间的部分替换为s的前n个字符
`string &replace(iterator first0, iterator last0,const string &s);`把[first0，last0)之间的部分替换为串s
`string &replace(iterator first0, iterator last0,int n, char c);`把[first0，last0)之间的部分替换为n个字符c
`string &replace(iterator first0, iterator last0,const_iterator first, const_iterator last);`把[first0，last0)之间的部分替换成[first，last）之间的字符串

```c++
// replacing in a string
#include <iostream>
#include <string>

int main ()
{
  std::string base="this is a test string.";
  std::string str2="n example";
  std::string str3="sample phrase";
  std::string str4="useful.";

  // replace signatures used in the same order as described above:

  // Using positions: 0123456789*123456789*12345
  std::string str=base; // "this is a test string."
  str.replace(9,5,str2); // "this is an example string." (1)
  str.replace(19,6,str3,7,6); // "this is an example phrase." (2)
  str.replace(8,10,"just a"); // "this is just a phrase."     (3)
  str.replace(8,6,"a shorty",7); // "this is a short phrase."    (4)
  str.replace(22,1,3,'!'); // "this is a short phrase!!!"  (5)

  // Using iterators: 0123456789*123456789*
  str.replace(str.begin(),str.end()-3,str3); // "sample phrase!!!"      (1)
  str.replace(str.begin(),str.begin()+6,"replace"); // "replace phrase!!!"     (3)
  str.replace(str.begin()+8,str.begin()+14,"is coolness",7); // "replace is cool!!!" (4)
  str.replace(str.begin()+12,str.end()-4,4,'o'); // "replace is cooool!!!" (5)
  str.replace(str.begin()+11,str.end(),str4.begin(),str4.end());// "replace is useful." (6)
  std::cout << str << '\n';
  return 0;
}

//Output: replace is useful.
```

​          

#### String的子串

`string substr(int pos = 0, int n) const;`返回pos开始的n个字符组成的字符串

```c++
string hello = s.substr(9, 5); //hello
s.substr(); //返回s全部内容
s.substr(11); //返回索引11往后的子串
```

​        

#### String类的查找函数

`int find(char c, int pos = 0) const;`从pos开始查找字符c在当前字符串的位置
`int find(const char *s, int pos = 0) const;`从pos开始查找字符串s在当前串中的位置
`int find(const char *s, int pos, int n) const;`从pos开始查找字符串s中前n个字符在当前串中的位置
`int find(const string &s, int pos = 0) const;`从pos开始查找字符串s在当前串中的位置

除了`find()`外，还有

`rfind()`：从pos开始从后向前查找字符串s在当前串中的位置

`find_first_of()`从pos开始查找当前串中第一个出现的串位置

`find_first_not_of()`从当前串中查找第一个不在串s中的字符出现的位置

`find_last_of()`和`find_last_not_of()`从后向前找

更多的情况下，我们可以直接把函数和npos进行比较：

```c++
if(s.find(hello) != string::npos){
  cout<<"'hello' found at:"<<s.find(hello)<<endl;
}
```


​              

#### 完整代码

```c++
#include <iostream>
#include <string>
using namespace std;

int main(){
    /* --------------1.string声明创建------------------ */
    string str("hello C++");
    string sh(" C++");
    string s;

    /* --------------2.字符串赋值操作------------------ */
    s = s.assign(str);
    s = s.assign(5, 'x'); //把5个x赋给字符串
    s = s.assign(str, 6, 3);
    cout << str << endl
         << s << endl;
    s = s.assign("hello STL", 0, 6);
    cout << s << endl<<endl;

    /* --------------3.在尾部添加字符------------------ */
    //+=,append(),push_back()
    s += str;
    s.append(sh);
    s.append(str, 5, 4);
    s.append("hello STL", 5, 4);
    s.append(5, 'x');
    s.push_back('a');
    cout << s << endl<<endl;

    /* --------------4.insert()------------------ */
    s.insert(0, "hello ");
    s.insert(0, str, 0, 6);
    s.insert(0, "that is cool",8);
    s.insert(7, 1, ':');
    cout << s << endl<<endl;

    /* --------------5.erase()------------------ */
    s.erase(9, 18); //删除三个"hello "
    cout << s << endl<<endl;

    /* --------------6.replace()------------------ */
    s.replace(15, 3, str, 0, 5);
    s.replace(25, 3, "C++ Primer Plus", 4, 11);
    cout << s << endl<<endl;

    /* --------------7.子串substr()------------------ */
    string hello = s.substr(9, 5);
    cout << hello << endl<< endl;

    /* --------------8.查找------------------ */
    if(s.find(hello) != string::npos){
        cout<<"'hello' found at:"<<s.find(hello)<<endl;
    }

    system("pause");
    return 0;
}
```



### 基本操作函数汇总

|           函数            | 用法            |
| :---------------------: | :------------ |
|       **begin**()       | 返回指向起始的迭代器    |
|       **clear**()       | 删除所有字符        |
|       **empty**()       | 检查字符串是否为空     |
|        **end**()        | 返回指向尾端的迭代器    |
|       **erase**()       | 删除字符          |
|      **insert**()       | 插入字符          |
|     **max_size**()      | 返回可以容纳的最大字符个数 |
|      **rbegin**()       | 返回指向起始的逆向迭代器  |
|       **rend**()        | 返回指向末尾的逆向迭代器  |
|       **size**()        | 返回容纳的字符数      |
|       **swap**()        | 交换内容          |
|       **find**()        | 寻找带有特定键的元素    |
|     **push_back**()     | 后附字符到结尾       |
|     **pop_back**()      | 移除末尾字符        |
|      **append**()       | 后附字符到结尾       |
|     **operator+=**      | 后附字符到结尾       |
|      **compare**()      | 比较两个字符串       |
|      **replace**()      | 替换字符串的指定部分    |
|      **substr**()       | 返回子串          |
|       **copy**()        | 复制字符          |
|      **resize**()       | 更改存储的字符数      |
|       **find**()        | 在字符串中查找字符     |
|       **rfind**()       | 寻找子串的最后一次出现   |
|   **find_first_of**()   | 寻找子串的第一次出现    |
| **find_first_not_of**() | 寻找子串的第一次缺失    |
|   **find_last_of**()    | 寻找子串的最后一次出现   |
| **find_last_not_of**()  | 寻找子串的最后一次缺失   |
|        **npos**         | 特殊值           |

​               

[^1]: [wiki](https://zh.wikipedia.org/wiki/String_(C%2B%2B%E6%A0%87%E5%87%86%E5%BA%93))
[^2]: [mropengate](https://mropengate.blogspot.com/2015/07/cc-string-stl.html)
[^3]: [cplusplus](http://www.cplusplus.com/reference/string/string)





