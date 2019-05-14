---
title: Markdown中Latex数学公式基本语法
comments: true
mathjax: true
abbrlink: 10c8125f
date: 2018-05-18 14:56:04
tags:
  - markdown
categories: learn
toc: true
tocnumber: true
---

> 因为不经常要用到Latex数学公式，
>
> 每次要用到的时候语法都忘记了，
>
> 所以特别自己做了一次整理。

<!--more-->



### 公式排版

分为两种排版： 
 - 行内公式：用\\或者$包裹公式

 - 独立公式：用$$包裹公式

  例如: 
  `\sum_{i=0}^{n}i^2 ` 表示     $  \sum_{i=0}^{n}i^2 $
  `\sum_{i=0}^{n}i^2` 表示
$$
\sum_{i=0}^{n}i^2
$$
`"\boxed"`命令给公式加一个方框 
`E = mc^2` =>
$$
E = mc^2
$$




`\boxed{E=mc^2} $$`

$$
\boxed{E=mc^2}
$$



### 上下标和根号

用^来表示上标， 用_来表示下标，根号用\sqrt表示，上下标如果多余一个字符或符号，需要用{}括起来。 
\sqrt[开方次数，默认为2]{开方公式}， 例如 
` \sum_{i=1}^n a_i` => $\sum_{i=1}^n a_i$

`f(x) = x^{x^x}` => $f(x) = x^{x^x}$

`x_{ij}^2\quad \sqrt{x}\quad \sqrt[3]{x}` => 

$$
x_{ij}^2\quad \sqrt{x}\quad \sqrt[3]{x}
$$
其中\quad表示添加空格



### 分数

分数用\frac表示，字号工具环境设置，\dfrac命令把字号设置为独立公式中的大小，\tfrac则把字号设置为行间公式中的大小。 
`\frac{1}{2}  \quad \dfrac{1}{2}` = > $ \frac{1}{2} \quad \dfrac{1}{2} $

`\frac{1}{2} \tfrac{1}{2}` =>
$$
\frac{1}{2} \quad \tfrac{1}{2}
$$

### 运算符

\+ - * / = 直接输入，特殊运算则用以下特殊命令 

`\pm\`=> $ \pm\ $

`\times\`=> $ \times\ $

`\div\`=> $ \div\ $

`\cdot\`=> $ \cdot\ $

`\cap\`=> $ \cap\ $

`\cup\`=> $ \cup\ $

`\geq\`=> $ \geq\ $

`\leq\`=> $ \leq\ $

`\neq\`=> $ \neq\ $

`\approx\`=> $ \approx\ $

`\equiv\`=> $ \equiv\ $



和、积、极限、积分等运算符用\sum, \prod, \lim, \int,这些公式在行内公式被压缩，以适应行高，可以通过\limits和\nolimits命令显示制动是否压缩。 

`\sum\`=> $ \sum\ $

`\prod\`=> $ \prod\ $

`\lim\`=> $ \lim\ $

`\int\`=> $ \int\ $
$$
\sum\; \prod\; \lim\; \int\;
$$

​	

### 箭头

`\leftarrow ` => $ \leftarrow $　　　　 　		 `\rightarrow ` 表示$ \rightarrow $

`\leftrightarrow `表示　$ \leftrightarrow $　　　	 `\Leftarrow`表示$\Leftarrow$

`\Rightarrow` 表示$\Rightarrow$   				 `\Leftrightarrow`表示$ \Leftrightarrow$

`\longleftarrow`表示 $ \longleftarrow $			 `\longleftarrow`表示$ \longleftarrow $

`\longleftrightarrow`表示$ \longleftrightarrow $		 `\Longleftarrow`表示$ \Longleftarrow $

`\Longrightarrow`表示$\Longrightarrow$			 `\Longleftrightarrow`表示$\Longleftrightarrow$

`\xleftarrow和\xrightarrow`可根据内容自动调整

```
 \xleftarrow{x+y+z} \quad \xrightarrow[x<y]{x+y+z}
```

结果如下:
$$
 \xleftarrow{x+y+z} \quad \xrightarrow[x<y]{x+y+z}
$$


### 省略号

省略号用 `\dots \cdots \vdots \ddots`表示 ，`\dots和\cdots`的纵向位置不同，前者一般用于有下标的序列

`x_1, x_2, \dots, x_n\quad 1,2,\cdots,n\quad \vdots\quad \ddots`

结果如下：
$$
x_1, x_2, \dots, x_n\quad 1,2,\cdots,n\quad \vdots\quad \ddots
$$


### 多行公式

#### 长公式

无需对齐可使用`multline`，需要对齐使用`split`，用`\\和&`来分行和设置对齐的位置

```
\begin{multline}
	x = a+b+c+ \\
   		 d+e+f+g
  \end{multline}
```

$$
\begin{multline}
	x = a+b+c+ \\
   		 d+e+f+g
  \end{multline}
$$

```
\begin{split}
x = {} & a + b + c +{}\\
	&d + e + f + g
\end{split}
```

$$
\begin{split}
x = {} & a + b + c +{}\\
	&d + e + f + g
\end{split}
$$



#### 公式组

不需要对齐的公式组用`gather`，需要对齐使用`align`:

```
\begin{gather}
a = b+c+d\\
x=y+z
\end{gather}
```

$$
\begin{gather}
a = b+c+d\\
x=y+z
\end{gather}
$$



```
\begin{align}
a &=b+c+d \\
x &=y+z
\end{align}
```

$$
\begin{align}
a &=b+c+d \\
x &=y+z
\end{align}
$$

#### 分支公式

分段函数通常用cases

```
y=\begin{cases}
-x,\quad x\leq 0\\
x, \quad x>0
\end{cases}
```

$$
y=\begin{cases}
-x,\quad x\leq 0\\
x, \quad x>0
\end{cases}
$$

​          

### 更新（2019. 3. 3）

**常用希腊字母**

|   小写命令   | 小写显示 |
| :------: | :--: |
|  \alpha  |  α   |
|  \beta   |  β   |
|  \gamma  |  γ   |
|  \theta  |  θ   |
|  \delta  |  δ   |
| \epsilon |  ϵ   |
|  \zeta   |  ζ   |
|   \eta   |  η   |
|  \iota   |  ι   |
|  \kappa  |  κ   |
| \lambda  |  λ   |
|   \mu    |  μ   |
|   \nu    |  ν   |
|   \pi    |  π   |
|   \rho   |  ρ   |
|  \sigma  |  σ   |
|   \tau   |  τ   |
|   \phi   |  ϕ   |
|  \omega  |  ω   |

**Tips **
如果使用大写的希腊字母，把命令的首字母变成大写即可，例如 \Gamma 输出的是 $\Gamma$ 。 

如果使用斜体大写希腊字母，再在大写希腊字母的 LaTeX 命令前加上 var ，例如 `\varGamma` 生成 $\varGamma$ 。 