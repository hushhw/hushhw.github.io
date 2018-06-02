---
title: 匈牙利算法（二分图）
date: 2018-05-16 16:25:58
tags: [算法笔记, 匈牙利算法]
categories: 学习
---



> 匈牙利算法是由匈牙利数学家Edmonds于1965年提出，因而得名。匈牙利算法是基于Hall定理中充分性证明的思想，它是部图匹配最常见的算法，该算法的核心就是寻找增广路径，它是一种用增广路径求二分图最大匹配的算法。（来自百度百科）

<!--more-->

**二分图** ：是图论中的一种特殊模型。若能将无向图G=(V,E)的顶点V划分为两个交集为空的顶点集，并且任意边的两个端点都分别属于两个集合，则称图G为一个二分图。

![img](http://p86wg7kc2.bkt.clouddn.com/892758-20160610155729418-59307900.png)

**匹配**：在图论中，一个「匹配」（matching）是一个边的集合，其中任意两条边都没有公共顶点。例如，图 3、图 4 中红色的边就是图 2 的匹配。

![img](http://ww2.sinaimg.cn/large/7cc829d3gw1f89lnvfc6pj20g8057wfd.jpg)

我们定义**匹配点**、**匹配边**、**未匹配点**、**非匹配边**，它们的含义非常显然。例如图 3 中 1、4、5、7 为匹配点，其他顶点为未匹配点；1-5、4-7为匹配边，其他边为非匹配边。



**最大匹配**：一个图所有匹配中，所含匹配边数最多的匹配，称为这个图的最大匹配。图 4 是一个最大匹配，它包含 4 条匹配边。



**完美匹配**：如果一个图的某个匹配中，所有的顶点都是匹配点，那么它就是一个完美匹配。图 4 是一个完美匹配。显然，完美匹配一定是最大匹配（完美匹配的任何一个点都已经匹配，添加一条新的匹配边一定会与已有的匹配边冲突）。但并非每个图都存在完美匹配。



基本概念讲完了。求解最大匹配问题的一个算法是**匈牙利算法**，下面讲的概念都为这个算法服务。

![img](http://ww2.sinaimg.cn/large/7cc829d3gw1f89lnzbetkj204j04u74f.jpg)

**交替路**：从一个未匹配点出发，依次经过非匹配边、匹配边、非匹配边…形成的路径叫交替路。

**增广路**：从一个未匹配点出发，走交替路，如果途径另一个未匹配点（出发的点不算），则这条交替路称为增广路（agumenting path）。例如，图 5 中的一条增广路如图 6 所示（图中的匹配点均用红色标出）：

![img](http://ww2.sinaimg.cn/mw690/7cc829d3gw1f89lo04o2wj207y01y3yi.jpg)

增广路有一个重要特点：非匹配边比匹配边多一条。因此，研究增广路的意义是**改进匹配**。只要把增广路中的匹配边和非匹配边的身份交换即可。由于中间的匹配节点不存在其他相连的匹配边，所以这样做不会破坏匹配的性质。交换后，图中的匹配边数目比原来多了 1 条。

我们可以通过不停地找增广路来增加匹配中的匹配边和匹配点。找不到增广路时，达到最大匹配（这是增广路定理）。匈牙利算法正是这么做的。



一个比较有趣且易懂的过程可以参考这篇博文：https://blog.csdn.net/dark_scope/article/details/8880547



> 过山车
>
> Time Limit: 1000/1000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)
>
> Total Submission(s): 27673    Accepted Submission(s): 11954
>
> Problem Description
>
> RPG girls今天和大家一起去游乐场玩，终于可以坐上梦寐以求的过山车了。
>
> 可是，过山车的每一排只有两个座位，而且还有条不成文的规矩，就是每个女生必须找个个男生做partner和她同坐。
>
> 但是，每个女孩都有各自的想法，举个例子把，Rabbit只愿意和XHD或PQK做partner，Grass只愿意和linle或LL做partner，
>
> PrincessSnow愿意和水域浪子或伪酷儿做partner。
>
> 考虑到经费问题，boss刘决定只让找到partner的人去坐过山车，其他的人，嘿嘿，就站在下面看着吧。
>
> 聪明的Acmer，你可以帮忙算算最多有多少对组合可以坐上过山车吗？
>
>  
>
> Input
>
> 输入数据的第一行是三个整数K , M , N，分别表示可能的组合数目，女生的人数，男生的人数。0<K<=1000
>
> 1<=N 和M<=500.接下来的K行，每行有两个数，分别表示女生Ai愿意和男生Bj做partner。最后一个0结束输入。
>
>  
>
> Output
>
> 对于每组数据，输出一个整数，表示可以坐上过山车的最多组合数。
>
>  
>
> Sample Input
>
> 6 3 3
>
> 1 1
>
> 1 2
>
> 1 3
>
> 2 1
>
> 2 3
>
> 3 1
>
> 0
>
>  
>
> Sample Output
>
> 3
>
>  
>
> Author
>
> PrincessSnow
>
>  
>
> Source
>
> RPG专场练习赛
>
>  
>
> Recommend
>
> lcy   |   We have carefully selected several similar problems for you:  1068 1083 2444 1281 1150 



```c++
#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int line[510][510]; //记录i和j有关系
int boy[510];
int used[510];  //用于记录是否已经被匹配
int n, m;

int Find(int x){
    int i;
    for (i = 1; i <= m; i++){   //遍历所有被选者
        if(line[x][i]==1 && used[i]==0){
            //如果x对i有好感且在一个递归选取阶段没有被选取
            used[i] = 1; //标记已被选取
            if(boy[i]==0 || Find(boy[i])){
                //如果被选者没有归属或他的归属可以调换
                boy[i] = x; //将归属定为x
                return 1;
            }
        }
    }
    return 0;
}

int main(){
    int i, k, x, y, sum;
    while(scanf("%d",&k)!=EOF && k){
        scanf("%d%d", &n, &m);
        memset(line, 0, sizeof(line));
        memset(boy, 0, sizeof(boy));
        memset(used, 0, sizeof(used));
        for (i = 0; i < k; i++){
            scanf("%d %d", &x, &y);
            line[x][y] = 1; //表示x希望与y有关系
        }
        sum = 0; //记录能组合的对数
        for (i = 1; i <= n; i++){
            memset(used, 0, sizeof(used)); //每次都要清0
            if(Find(i))
                sum++; //找到一对就记录
        }
        printf("%d\n", sum);
    }
    return 0;
}
```

