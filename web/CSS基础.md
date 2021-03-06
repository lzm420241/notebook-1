## CSS 基础

_上次修改时间: 2015-08-20_

---

## 目录：


- [选择器](#选择器)
- [CSS 边框](#css-边框)
- [CSS 背景](#css-背景)
- [CSS3 渐变](#css3-渐变)
- [CSS transform](#css-transform)
- [CSS 过渡](#css-过渡)
- [CSS 动画](#css-动画)
- [flex 布局](#flex-布局)
- [响应式布局](#响应式布局)

---


## 选择器

选择器可以分为 5 大类：

+ 1. 基本选择器
+ 2. 层次选择器
+ 3. 伪类选择器
+ 4. 伪元素

### 1. 基本选择器

#### 类选择器

```html
<div class='info warning'></div>
```
上面这个元素有两个类，如果我们希望选择同时具有这两个类的元素，这个时候可以使用多类选择器，写法如下：

```css
.info.warning{
    color:red;
}
```
只需要将两个类名连起来即可

#### 属性选择器

根据单个属性来选择：

选择所有具有 class 属性的 h1 标签

```css
h1[class]{
}
```

根据多个属性来进行选择：

选择同时具有 href 和 class 属性的 a 标签

```css
a[href][class]{   
}
```

根据属性的值来选择：

选择所有类型为 text 的 input 标签：

```css
input[type='text']{
}
```

根据部分属性值来选择：

关于下面的内容约定如下：**E 代表任意html元素，attr代表元素的属性，val代表属性的值**

+ `E[attr]`:选择具有该属性的元素，如 `img[alt]` 选择设置了 alt 的 img 元素，也可以写成 `[type]` 选择所有具有 type 属性的元素。
+ `E[attr=val]`:选择属性值等于val的元素，如 `input[type=text]` 选择所以输入类型为 text 的 input 元素
+ `E[attr|=val]`:选择属性开头单词等于 val 的元素
+ `E[attr*=val]`:选择属性中含有 val 的元素,如 `a[href*=github]` 选择所有url中含有 github 的 a 元素
+ `E[attr~=val]`:选择属性列表中含有 val 的元素，比如class属性，其中可能含有好几个类名，`div[class~=content]` 会匹配 `<div class='content side'>...</div>`
+ `E[attr^=val]`:选择属性开头是 val 的元素
+ `E[attr$=val]`:选择属性以 val 结尾的元素

注意：乍一看好像 `E[attr^=val]` 和 `E[attr|=val]` 是一样的，其实不然，后者需要属性值开头的单词与 val 匹配，而前者只需要前面的字符串与 val 一致即可 ,比如

```html
<img alt='csspseudo' src='pseudo.jpg' />
```

```css
img[alt|=css]{}
img[alt^=css]{}
```

这里只有后者匹配，前者不会匹配。但是,如果把 alt 改为 alt='css-pseudo' 那么后者就也可以匹配了，注意前面提到的 `E[attr|=val]` 要求开头单词匹配。

### 2. 层次选择器

+ `p>a`  子元素选择器，选择所有为 p 元素的第一代后代的 a 元素
+ `p+a`  相邻兄弟选择器，选择紧跟在 p 元素的 a 元素
+ `p~span`  选择 p 元素之后的所有 span 元素
+ `div p`  后代选择器，选择器之间用空格分隔，选择 div 的所有后代 p 元素

### 3. 伪类选择器

伪类选择器可以分为 6 类：

+ 动态伪类选择器
+ 目标伪类选择器
+ 语言伪类选择器
+ UI状态伪类选择器
+ 结构伪类选择器
+ 否定伪类选择器

#### 动态伪类选择器

+ `a:link`：匹配定义了 `href` 属性的 a 标签
+ `a:visited`：匹配点击过的 a 标签
+ `E:active`：匹配正被激活的元素，比如正在点击的连接或者按钮
+ `E:hover`
+ `E:focus`

关于以上属性有一个 LoVe/HAte 的规则，至于为什么，可以参看[这里](https://github.com/wy-ei/notebook/blob/master/css/2015-12-19-why-love-hate.md)

#### 目标伪类选择器

+ `:target`：匹配有着和 URL 中的 hash 相同的 id 的元素

```html
<a href="#part-1">see part 1</a>
<p id="part-1">part 1</p>
```

```css
p{
    display: none;
}
p:target{
    display: block;
}
```

当点击了标签之后，url 中的锚点就变成了 part-1 这就和 p 标签的 id 匹配了。此时该 p 标签被匹配。

#### 语言伪类选择器

语言伪类选择器是通过标签的 lang 属性来进行匹配的

```css
E:lang(language){}
```

可以使用该属性来匹配不同语言的元素

#### UI状态伪类选择器

+ `E:checked`
+ `E:enabled`
+ `E:disabled`

以上几个以及 `E:focus` 多用于表单

#### 结构伪类选择器

+ `:first-child`
+ `:last-child`
+ `:root`
+ `:nth-child(n)`
+ `:nth-last-child(n)`
+ `:nth-of-type(n)`
+ `:nth-last-of-type(n)`
+ `:first-of-type`
+ `:last-of-type`
+ `:only-child`
+ `:only-of-type`
+ `:empty`：选择没有子元素的元素

#### 否定伪类选择器

+ `:not()`

```css
a:not([href^=https]){
    color: red;
}
```

匹配所有地址不是 https 的 a 标签。

更多伪类可以参见这里：[Pseudo-classes MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

### 4. 伪元素

CSS3 中对伪元素进行了调整，使用双冒号开头 `::` ，目的是为了和伪类区分开来。


+ `::after`
+ `::before`
+ `::first-letter`：用来选择文本块的第一个字母，对于行内元素该选择器不起作用，需要修改 `display` 使其成为块状结构才有效
+ `::first-line`：用来匹配文本块的第一行文本
+ `::selection`：用来匹配被选中的文本，该伪元素仅接受 `background` 和 `color` 两个属性


更多伪元素可以参见这里 [Pseudo-elements MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/pseudo-elements)

---

## CSS 边框

设置边框使用下面的三个属性

+ border-width
+ border-color
+ border-style

也可以分开设置

+ border-top-style
+ border-left-style
+ ...


使用简写方式的时候，给出四个值遵循上，右，下，左的次序，给出两个则是上下，左右，给出三个，则是上，左右，下。

border-style:

+ dotted:点
+ dashed:虚线
+ solid:实线
+ ...


### border-image

border-image 是以下几个部分的简写形式

#### border-imgae-source

设置边框的图片来源`border-image-source:url(border.png);`

#### border-image-slice

这部分是重点，border-image 是如何将图片应用到边框上的呢？

```
　　d
 +-----+-----+-----+
 |     |     |     |
 |     |     |     | a   
 +-----+-----+-----+
 |     |     |     |
 |     |     |     |
 +-----+-----+-----+
 |     |     |     |
c|     |     |     |
 +-----+-----+-----+
                b
```

如上，将一个图片纵横分为９块，然后使用这９个分割而来的小图片给边框运用图片，图片的左上角就对应边框的左上角，依次类推。

border-image-slice 的语法如下：

```
border-image-slice:<number|percentage>{1,4} [fill] 下面进行解释
```

第一部分参数是一个数字或者百分比，数字则表示像素数，百分比则是相对则是相对与待切分的图片来说的。{1,4} 则是说，可以给出１－４个数字或百分比，这个和 margin 与 padding 一个道理。而这四个数就决定了切分的位置。top,right,buttom,left 也就代表示意图中的a,b,c,d四个值的大小了，而这４个数也就唯一确定了切分方式。最后是一个可选参数是 fill　，如果加上这个参数表示保留中间部分。

#### border-image-width

```
border-image-width:<number|percentage|auto> {1,4}
```

用来设置图片的宽度，如果不设置则和 `border-width` 一样。


#### border-image-repeat

+ stretch:拉伸
+ repeat：重复
+ round:平铺

```
border-image-repeat:<repeat|round|stretch> {1,2}
```

需要注意的是这个属性只接受两个参数，所以他的上下是一样的，左右是一样的。


###  border-radius

```
border-radius:20px 10px 20px 20px / 5px 5px 10px 10px;
```
`/`前面设置四个角的水平方向圆角半径，后面四个设置垂直方向圆角半径。　简写方式可以为　`border-radius:5px`

当 border 和　border-radius 一起应用的时候，内部圆弧的半径就是 radius 的半径减去 border 的半径。


### box-shadow

```
box-shadow:[inset] <x-offset> <y-offset> <blur-radius> <spread-radius> <color>
```

其中[inset]为可选参数，加上该参数表示阴影在内部。


`box-shadow` 并不会影响元素的布局。

边框在内阴影之上，内阴影在背景图片之上，背景图片在背景颜色之上，背景颜色在外阴影之上。


---


## CSS 背景

CSS 背景主要包括下面几个属性：

+ background-color
+ background-image
+ background-repeat:背景图片的重复方式
  + repeat
  + repeat-x
  + repeat-y
  + no-repeat
+ background-attachment：背景图片是固定还是滚动
  + scroll
  + fixed
+ background-position：背景图片的位置
  + left top
  + 0 0
  + 200px 100px
  + center center
  + 0% 0%

当 `background-position` 的取值是百分数的时候，这里的百分数的参考量并不是容器的大小，而是容器大小减去背景图片的大小。

另外 background-position 还可以向下面这样，设置相对某个参考点的偏移。这里 `left|right`  和 `bottom|top` 都需要存在，否则不起作用。

```css
background-position: left 10px top 15px;   /* 10px, 15px */
background-position: left      top     ;   /*  0px,  0px */
background-position:      10px     15px;   /* 10px, 15px */
background-position: left          15px;   /*  0px, 15px */
background-position:      10px top     ;   /* 10px,  0px */
background-position: left      top 15px;   /*  0px, 15px */
background-position: left 10px top     ;   /* 10px,  0px */
```

连起来使用：

```css
bakcground:color image repeat attachment position
```


+ background-origin：指定绘制背景图片的起点。（联想盒子模型）
  + padding-box：背景图片起始于padding区域的左上角
  + border-box：起始于border区域左上角
  + content-box：起始于内容区域左上角

`background-origin` 属性用来设置 `background-position` 属性的参考点，默认情况下参考点是 padding 区域的左上角，而 `background-origin` 的出现可以允许修改这个参考点。


+ background-clip：指定背景图片的裁剪范围。
  + padding-box：位于 padding-box 外的背景都被裁掉
  + border-box：位于 border-box 外的背景都被裁掉
  + content-box：背景图片和背景颜色只能存在于 content 区域。



+ background-size：指定背景图片的大小
  + auto：图片的原始大小
  + 100px：指定宽高都为100px
  + 50%：指定宽高为容器宽高的50%，这个容器是 border，padding 还是 content 区域就要根据 background-origin 来决定了。
  + cover：不按比例伸缩图片，使得图片铺满整个容器
  + contain：保持图片的宽高比例，将图片缩放到合适比例使得容器能完全容纳下图片。

有时候需要添加多个背景图片，这个时候可以使用`,`将多组属性分开，举例如下：

```css
background-image: url(https://avatars3.githubusercontent.com/u/7794103?v=3&s=460),url(https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3415372198,2864505025&fm=58);
background-size: 50%,50%;
background-position: left top,top right;
background-repeat: no-repeat;
```

也可以一句话搞定：

```css
background: url(pic2.jpg) top left / 50% no-repeat,url(pic1.jpg) top right /50% no-repeat;
```

至于格式嘛，就是下面这样：

```css
background:image position /size repeat attachment clip origin
```

---

## CSS3 渐变

- [线性渐变](#线性渐变)
- [径向渐变](#径向渐变)
- [重复线性渐变](#重复线性渐变)
- [重复径向渐变](#重复径向渐变)
- [多个渐变叠加](#多个渐变叠加)

渐变用于创建用于创建两种或者多种颜色之间渐变的效果，渐变可以用于背景图片，图片边框等需要用到图片的地方。CSS3 中有两种类型的渐变，分别是线性渐变和径向渐变。

### 线性渐变

线性渐变的基本语法如下：

```css
linear-gradient([<angle> | to <side-or-corner>]?, <color-stop>, <color-stop>)
```

举例如下：

```css
button{
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  outline: 0;
  background-image: linear-gradient(to top, #999, #ccc);
}
```

以上代码会有从下至上的从 `#999` 至 `#ccc` 的渐变。对于 `to top` 同样可以换成 `0deg` 。而 `180deg` 则和 `to bottom` 等价，你可以想象时钟的指针，`0deg` 就是指向正上方，而 `180deg` 是指向正下方，其他角度也就能想象出来了。

当然还可以指定线性渐变的范围，比如从 0%~30% 由红渐变至黄，30%~100% 由黄渐变至蓝，那么可以采用下面这样的下方的写法：

```css
background-image: linear-gradient(90deg, red 0%, yellow 30%, blue 100%);
```

这里的百分数同样可以改写为具体的数值。

### 径向渐变

径向渐变的基本语法如下：

```
radial-gradient([<shape> || <size>] [at <position>]?,  <color-stop>, <color-stop>)
```

其中 shape 可以是 `circle` 和 `ellipse`，默认情况下为 `ellipse`。

size 则用来规定径向渐变的半径，如果 shape 为 `circle` 则只能是一个值，如果是 `ellipse` 可以是两个值，用于确定横轴和纵轴， 这个值还可以选择使用一些预设值，这些值都是代表一个角或者一条边，size 则是渐变中心距离该位置的长度：

+ farthest-side : 渐变中心距离最远的边的距离作为渐变半径
+ farthest-corner：最远的顶点
+ closest-side：最近的边
+ closest-corner：最近的顶点

position 用来确定渐变的中心点，包含两个值（横轴和纵轴），取值可以是如 `center`, `left`, `right`, `top`, `bottom` 这样的关键字，也可以是 `10px` 这样的具体数值，还可以是 `40%` 这样的百分比。

举例如下：

```css
background-image: radial-gradient(circle closest-side at 20% 30%, #fff 0%, #999 50%, #333 100%);
```

### 重复线性渐变

利用重复线性渐变，可以实现类似于作业本条纹的效果。代码如下：

```css
.paper{
  width: 300px;
  height: 200px;
  border: 1px solid #999;
  background-color: #fff;
  background-image: repeating-linear-gradient(180deg, #fff 0, #fff 19px, #333 19px, #333 20px);
}
```

<div align="center"><img src="https://cloud.githubusercontent.com/assets/7794103/17829500/428a3fb2-66e3-11e6-9a65-a29c0b70d414.png" 作业本纸张效果="" /></div>


### 重复径向渐变

利用重复径向渐变可以实现水波纹的效果:

```css
.pipple{
  width: 300px;
  height: 200px;
  border: 1px solid #999;
  background-color: #fff;
  background-image: repeating-radial-gradient(circle,#fff 0, #fff 19px, #333 19px, #333 20px);
}
```


<div align="center"><img src="https://cloud.githubusercontent.com/assets/7794103/17829534/21cc1c18-66e4-11e6-8c9b-297c6439b5a4.png" 波纹效果="" /></div>


### 多个渐变叠加

是否可以在一个背景图上应用多个渐变呢？是可以的，例如下面的例子，利用渐变做出来了个玩意儿（它不是五环）。

<div align="center"><img src="https://cloud.githubusercontent.com/assets/7794103/17829625/710fd9ce-66e7-11e6-8113-376cc2822115.png" image="" /></div>

代码：

```css
div{
  width: 250px;
  height: 120px;
  border: 1px solid #999;
  background-color: #fff;
  background-image: radial-gradient(circle 30px at center,transparent 0%, transparent 80%, #0085c7 81%, #0085c7 99%, transparent 100%),
    radial-gradient(circle 30px at center,transparent 0%, transparent 80%, #000 81%, #000 99%, transparent 100%),
    radial-gradient(circle 30px at center,transparent 0%, transparent 80%, #df0024 81%, #df0024 99%, transparent 100%),
    radial-gradient(circle 30px at center,transparent 0%, transparent 80%, #f4c300 81%, #f4c300 99%, transparent 100%),
    radial-gradient(circle 30px at center,transparent 0%, transparent 80%, #009f3d 81%, #009f3d 99%, transparent 100%);
  background-position: 31px 14px, 95px 14px, 159px 14px, 63px 46px, 127px 46px;
  background-size: 60px 60px;
  background-repeat: no-repeat;
}
```

基本的思路是限定背景区域的大小为边长为 60px 的正方形，然后在这个正方形上绘制圆圈，这样实际上等同于给元素应用了多幅背景图片，且多幅背景图目前是叠加在一起的。需要使用 `background-position` 来重新安排背景图片的位置，使他们彼此错开。为了让五个圈的组合整体位于中心，给 `background-position` 的 x 和 y 都添加了一个偏移量 `31px 和 14px`。


---

## CSS transform

- [transform-origin](#transform-origin)
- [transform-style](#transform-style)
- [perspective](#perspective)
- [perspective-origin](#perspective-origin)
- [backface-visibility](#backface-visibility)
- [transform-function](#transform-function)

### transform-origin

`transform-origin` 属性用来改变元素的变形中心点，默认情况下元素旋转或者缩放等等形变都是以元素的中心为参照点的，该属性可以允许修改这一特性。具体的使用方法如下：

```css
/*指定形变中心为元素的左上角*/
transform-origin: top left;

/*指定形变中心为元素的中心点（横轴 50% 和 纵轴 50% 处）*/
transform-origin: center;
transform-origin: center center;
transform-origin: 50% 50%;
```

同样是顺时针旋转 90 度，看下面图你就明白 `transform-origin` 了。

<div align="center"><img src="https://cloud.githubusercontent.com/assets/7794103/17830394/a4c79314-66fc-11e6-8949-817316812e64.png" alt="transform-origin"  /></div>

### transform-style

该属性指定元素是在 3D 空间展现或是在 2D 空间展示。一共有两个可选值。

- preserve-3d：指定元素在 3D 空间展示
- flat：元素会在 2D 空间展示，本该在 3D 空间展示的内容会投影到 2D 平面上

<div align="center"><img src="https://cloud.githubusercontent.com/assets/7794103/17830570/db9e5fb2-6701-11e6-9b15-6446889a4dac.png" alt="transform-style"  /></div>

### perspective

该属性用于设置观察者距离元素的位置。下图中分别设置 perspective 为 8000px 和 1000px ，两幅图就像是观察者站在 8000px 和 1000px 远处看到的场景一样。

<div align="center"><img src="https://cloud.githubusercontent.com/assets/7794103/17830612/fa38fe68-6702-11e6-8590-ac2a12a60f2c.png" /></div>

该属性设置在 3D 形变元素的父容器上，该父容器就像是一个一个舞台，而其中的子元素是舞台上的演员，这个 perspective 就决定了观看者距离舞台的距离。如果很近会看不到整体，如果很远，则看不到元素之间的位置关系了。

该属性还可以设置在子元素上面，当你想突出某个子元素的时候，可以在它上面设置该属性，用来改写默认值（父元素上的 perspective）。

### perspective-origin

该属性用于决定观看着在舞台前方的位置。该属性的默认值为 `center center`，分别表示横轴和纵轴的位置。

```css
/*在正前方观察，等同于 center center 或者 50% 50%*/
perspective-origin: center;

/*在左上角观察，等同于 0 0*/
perspective-origin: left top;

/*在右下角观察，等同于 100% 100%*/
perspective-origin: left top;
```

### backface-visibility

当元素经过旋转，其背面呈现在视图中的时候，该属性用来决定元素的背面是否可见。该属性有两个可选值：`visible` 和 `hidden`。

<div align="center"><img src="https://cloud.githubusercontent.com/assets/7794103/17830710/6927f524-6706-11e6-868f-f61125a330f3.png" alt="backface-visibility"  /></div>

### transform-function

3D 变换的 X,Y,Z 轴如同所示：

<div align="center"><img src="../images/17-4-21/58142497-file_1492770011210_12ce8.png" /></div>

`transform` 可取值很多，参数如下：

```css
/* Keyword values */
transform: none;

/* Function values */
transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
transform: translate(12px, 50%);
transform: translateX(2em);
transform: translateY(3in);
transform: scale(2, 0.5);
transform: scaleX(2);
transform: scaleY(0.5);
transform: rotate(0.5turn);
transform: skew(30deg, 20deg);
transform: skewX(30deg);
transform: skewY(1.07rad);
transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
transform: translate3d(12px, 50%, 3em);
transform: translateZ(2px);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleZ(0.3);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: perspective(17px);

/* Multiple function values */
transform: translateX(10px) rotate(10deg) translateY(5px);

/* Global values */
transform: inherit;
transform: initial;
transform: unset;
```

#### translate, translateX, translateY, translate3d

这几个属性用来移动元素，translate 接受两个参数，分别是 dx 和 dy。translate3d 接受三个参数，分别是 dx, dy 和 dz。translateX, translateY 则仅仅分别接受 dx, dy 作为参数。

#### rotate, rotateX, rotateY, rotate3d

这几个属性用来旋转元素，参数形式同 translate，单位为 deg （角度）。

#### scale, scaleX, scaleY, scale3d

这几个属性用来缩放元素，参数形式同 translate，取值是数值，没有单位。当取值为正，且小于 1 的时候元素在其纬度上缩小，当却只大于 1 的时候元素在其纬度上放大。当取值为负的时候，元素先进行翻转然后再进行缩放。

#### skew, skewX, skewY

以上三个属性用来倾斜元素。

#### matrix

transform 属性还可以是一个 matrix，具体的语法是 `transform: matrix(a, b, c, d, e, f);`

这里的 a, b, c, d, e, f 分别代表是什么呢？

```
| x'| = |a, c, e|   |x| = [ax + cy + e]
| y'| = |b ,d, f| * |y| = [bx + dy + f]
| 1 | = |0 ,0, 1|   |1| = [     1     ]
```

其中 `x'` 和 `y'` 是 x 和 y 变形过后的结果，而 a, b, c, d, e, f 就正是决定了 x 和 y 如何 变化为 `x'` 和 `y'`


---

## CSS 过渡

`transition` 用于将元素从一种状态平滑地过渡到另外一种状态。基本语法如下：

```css
transition: [<property>] || [<duration>] || [<timing-function>] || [<delay>];
```

比如鼠标移动到某个元素上 1 秒后将元素在 500 毫秒内将其 width 线性地变为 200px，可以这样写：

```css
div{
  width: 100px;
  height: 100px;
  background-color: #333;
  transition: width 500ms linear 1s;
}

div:hover{
  width: 200px;
}
```

如果指定了过渡属性，那么就只会对指定的属性进行过渡。如果希望所有可过渡的属性都能在变化后平滑地过渡，那么可以不指定 property 或者指定为 all 。

对于 time-function， 浏览器内预设了一些，如 ease, linear, ease-in, ease-out, ease-in-out ，可以使用这些预设的过渡函数，也可以使用三次贝塞尔函数或者 steps 函数来自定义过渡函数。

三次贝塞尔函数就不再说了，steps 函数是将过渡过程划分为几个均匀的阶段，其具体语法为 `steps(n, [start|end])`, 其中 n 决定了整个渐变被分为几个阶段，第二个参数可以是 start 或 end，start 表示阶跃发生在开始阶段，而 end 表示阶跃发生在结束阶段。

```css
div{
  width: 100px;
  height: 100px;
  background-color: #333;
  transition: width 1s steps(1, end);
}

div:hover{
  width: 200px;
}
```

这里 `steps(1, end)` 表示整个过渡就一次跳跃，使用了 end ，具体的效果就是鼠标移动到元素上 1 秒的时候，元素的宽度变为了 200px, 动画结束，整个过渡用时 1 秒。如果使用 `steps(1, start)` ，实际效果就是鼠标移动到元素上后元素的宽度立刻变为 200px ,这个时候过渡过程还没有结束，在 1 秒后过渡才算结束，整个过程也用时 1 秒。

另外还有 `step-start` 和 `step-end` 两个过渡函数，它们实际上就是第二个参数固定的 steps 函数而已。

多个过渡效果可以使用逗号隔开，如: `transition: width 1s steps(1, end), height 500ms linear;`

---

## CSS 动画

- [keyframes](#keyframes)
- [animation](#animation)

transition 仅仅是让元素在初始状态和结束状态之间进行过渡，虽然也是动画，但功能还是很局限，animation 引入关键帧来描述动画，并提供了更多的属性来控制动画，来看看如何使用 animation 吧。

### keyframes

前面提到 animation 是利用关键帧来描述动画的，所以首先需要定义关键帧，定义关键帧需要使用到 keyframes ，它的用法很简单，形如下面这样：

```css
@keyframes rotating {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
```

其中 from 和 to 可以替换为 0% 和 100%， 它们表示初始状态和结束状态。还可以添加更多帧信息，像这样：

```css
@keyframes bounce {
  0% {
    transform: scale3d(.3, .3, .3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(.9, .9, .9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(.97, .97, .97);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
}
```

### animation

定义个 keyframes 之后就可以将其运用在元素上了，这就用到了 animation 属性。

```css
div {
    animation: bounce 2s linear infinite;
}
```

该属性的语法如下：

```
animation: <name> | <duration> | <timing-function> | <delay> |
   <iteration-count> | <direction> | <fill-mode> | <play-state>;
```
该属性可以分为 8 个部分，其中每一部分都有单独的属性，就像 transition 一样，有 transition-duration 等等。animation 属性中至少有 <name>, <duration>, <timing-function> 这三个的值明确，动画才会执行。


#### animation-name

指定要运用的 keyframes， 该属性要对应一个 keyframes 的名字。

#### animation-duration

表示该动画持续的时间，该值不可或缺。

#### animation-timing-function

一个描述过渡过程的函数，同 transition-timing-function。

#### animation-delay

表示动画开始执行前要延时的时间。

#### animation-direction

指定动画执行的方向，有如下几个可选值：

+ normal：动画向前播放，这是默认属性。
+ reverse：动画反向播放。
+ alternate：动画正向运行。到了终点后会再返回来。带时间功能的函数也反向，比如 ease-in 在反向时成为 ease-out，在动画执行偶数次时正向运行，奇数次时反向运行。
+ alternate-reverse：动画反向播放。同 alternate，到了终点后会返回来。

#### animation-iteration-count

指定动画的播放次数，可以取任意正数，不一定是正整数，比如取值为　1.5 会完成一个整周期和一个半周期的动画。另外也可以取 infinite 这个特殊值让动画无限次执行。

#### animation-play-state

该属性用于控制动画的播放与停止播放，可以 `running` 和 `paused` 两个值，可以修改这个属性来让动画停止或开始播放。

#### animation-fill-mode

这个属性用来决定动画开始执行前和执行结束这两个时刻的一些动作。可以取得值有下面几个：

+ none：这是默认值，动画按常规执行。
+ forwards：动画执行完成后，运用动画的元素保持动画最后一帧的样式。
+ bakcwards：动画在 delay 开始阶段就应用第一帧画面。在动画没有设置 delay 的时候该值可能看不出什么效果，但假如动画的第一帧是让元素背景色变为黑色，且动画有 1 秒的延时，那么元素会在运用了动画后立刻运用第一帧动画，改变背景色为黑色。假如没有设 bakcwards 这个值，那么元素会在 1 秒后才运用第一帧动画的样式。
+ both：同时执行 forwards 和 backwards 的动作。

_写到这里动画的使用是彻底清楚了_

---

## flex 布局

- [容器的属性](#容器的属性)
- [项目的属性](#项目的属性)

```html
<div class="container">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
</div>
```

<div align="center"><img src="https://mdn.mozillademos.org/files/3739/flex_terms.png"  /></div>

flex容器存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）

### 容器的属性

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

#### flex-direction

决定了主轴的方向，可选值：

- row
- row-reverse
- column
- column-reverse

#### flex-wrap

当容器内的元素的宽度或者高度之和大于容器的宽度或高度的时候，这个属性决定容器类元素是否折行，以及如何折行。

有三个值可选：

- nowrap：不折行，容器内的弹性子元素的宽度或者高度会被压缩，以至于容器能够容纳所有子元素
- wrap：折行，放不下的元素折行在下面（flex-direction:row）或者右面（flex-direction:column）显示
- wrap-reverse：折行，放不下的元素折行在上面（flex-direction:row）或者左面（flex-direction:column）显示

#### flex-flow

这个属性是 flex-direction 和 flex-flow 的简写形式。写法形如：`flex-flow:row wrap`

#### justify-content

定义了子元素在主轴上的对齐方式，可选值为：

- flex-start
- flex-end
- center
- space-between：两端对其
- space-around：每个项目两侧具有同样的间隔

#### align-items

定义了子元素在交叉轴上的对齐方式，可选值为：
- flex-start
- flex-end
- center
- baseline:以文字的基线对齐
- stretch:如果元素的高度或者宽度为 auto 将占满整个容器的高度（flex-direction:row）或者宽度（flex-direction:column）

#### align-content

定义了多根轴线的对齐方式，可选值为：

- flex-start
- flex-end
- center
- space-between
- space-around
- stretch

当存在多根轴线的时候，这个属性才生效，且设置了这个属性以后，align-items 将不起作用

### 项目的属性
- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

#### order

定义项目的排列顺序。数值越小，排列越靠前，默认为0

#### flex-grow

定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

如果一个弹性元素其宽度为200px，其中包含两个元素，两个元素的宽度都是 50px 且 flex-grow 都是 1，那么这两个元素将平分余下的 100px ，所以结果是两个元素的实际宽度都是 100px。

#### flex-shrink

属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

如果一个弹性元素其宽度为200px，其中包含两个元素，两个元素的宽度都是 200px 且 flex-shrink 都是 1。因为两个元素一共超出了父元素 200px，所以这两个元素将缩小 100px ，所以结果是两个元素的实际宽度都是 100px。

如果其中一个元素的  flex-shrink 是 0 另外一个是 1，那么  flex-shrink 为 1 的元素将独自减小 200px。

#### flex-basis

取值同 width 属性，可以是具体的像素值，也可以是百分比，还可以是 auto ，默认是 auto。用于定义元素占据主轴的宽度。width 也可以描述元素的宽度，但如果同时设置了 width 和 flex-basis 那么 flex-basis 会覆盖 width 属性。

#### flex

flex-grow, flex-shrink 和 flex-basis 的简写形式，写法形如：`flex:1 1 auto`

#### align-self

允许单个项目与其他项目有不同的对其方式，可以覆盖 align-items 属性。可选值如下：

- auto
- flex-start
- flex-end
- center
- baseline
- stretch

---

## 响应式布局

- [媒体类型](#媒体类型)
- [媒体查询](#媒体查询)
- [meat 标签](#meat-标签)

媒体查询常常用在响应式布局上，响应式布局中，常常需要对不同尺寸的页面运用不同的样式，这个时候就需要借助于媒体查询了。说到媒体查询又不得不引入媒体类型。

### 媒体类型

早在 CSS2.0 的时候就有了媒体类型这个东西，使用它可以对不同的显示设备加载不同的样式表，常用的媒体类型有下面几种：

+ screen：代表一般的屏幕显示设备
+ print：表示打印机或者打印预览页面
+ all：代表所有类型

媒体类型的使用方法如下：

#### 通过 link 标签使用

```html
<link rel='stylesheet' type='text/css' src='screen.css' media='screen' />
<link rel='stylesheet' type='text/css' src='print.css' media='print' />
```

以上 html 代码中，通过 link 标签的 `media` 属性取值为 `screen` 或 `print` 来在不同的显示环境下加载不同的样式表。


#### 通过 `@import` 指令使用

除了使用 link 标签外，还可以使用在 css 的 `@import` 中使用媒体类型

```html
<style type='text/css'>
    @import url(print.css) print;
</style>
```

以上代码是说当前显示模式是打印机那么就加载 print.css 这个样式表，否则不加载。

### 媒体查询

使用媒体类型能够对不同的显示环境运用不同的样式表，但是还不能做到当页面呈现不同宽度时运用不同的样式这样的需求。但这确实是响应式设计的不可或缺的，于是媒体查询应运而生。

必须现在希望当页面的尺寸小于 320px 的时候将 body 的字体设置为 12px，那么使用媒体查询可以这么做：

```css
@media screen and (max-width:320px){
	body{
        font-size: 12px;
    }
}
```

媒体查询使用到 `@media` 这样的一个指令，它的具体语法为：

```css
@media 媒体类型 and (媒体特性) {
    样式
}
```

`and` 的意思是，不单单要满足媒体类型 ，还要满足括号里的媒体特性，两者都满足的时候才运用花括号里面的样式。

还可以使用多个 and 来连接多中媒体特性，比如当页面尺寸介于 320px 和 460px 之间时运用样式，可以这么写：

```css
@media all and (min-width: 320px) and (max-width: 460px){
    /*样式*/
}
```

#### 媒体特性

其中可以作为媒体特性的属性有：

+ width：浏览器可视宽度，接受前缀（min/max），就是说可以使用 min-width 和 max-width。
+ height：浏览器可视高度，接受前缀（min/max）。
+ device-width：设备屏幕的宽度，接受前缀（min/max）。
+ device-height：设备屏幕的高度，接受前缀（min/max）。
+ orientation：检测设备目前处于横向还是纵向状态，可取值为：portrait 和 landscape。
+ aspect-ratio：检测可视区域宽高比，接受前缀（min/max）。
+ device-aspect-ratio：检测设备的宽高比，接受前缀（min/max）。
+ color：检测设备显示一个颜色需要用到的 bit 数，接受前缀（min/max）。
+ color-index：检查设备颜色索引表中的颜色数量，他的值不能是负数，接受前缀（min/max）。
+ monochrome：检测单色楨缓冲区域中的每个像素的位数，接受前缀（min/max）。
+ resolution：检测屏幕或打印机的分辨率，接受前缀（min/max）。(例如：min-resolution:300dpi 或 min-resolution:118dpcm)。
+ grid：检测输出的设备是网格的还是位图设备，取值可以为 0 或 1，如果是基于网格的其值为 1 ，否则为 0。
+ scan：仅仅作用用 meida-type  为 tv 的时候。

关于媒体的性的更详细的说明，可以参看：[Media Queries](https://www.w3.org/TR/css3-mediaqueries/#media1)。


#### not 和 only

其实在 `@media` 指令后面还可以跟另外两个关键字，not 和 only。

not 用来多条件进行取反，也就是选择所有不满足 not 后面设置的条件的情况。

```css
@media not print and (max-width:1200px){

}
```

only 大多时候可以省略，它的意思是仅仅当满足后面条件时候才运用样式。但不加 only 也是这个效果。

```css
@media only print and (max-width:1200px){

}
```

only 的存在更多时候可能是为了处理旧版本的浏览器，因为以上使用 `@media` 指令写的条件，也是可以使用 link 标签的 media 属性来设置的，比如：

```html
<link rel="stylesheet" href="screen.css" media="screen and (max-width: 1000px)">
```

以上 link 标签会在满足媒体查询条件的时候才加载样式表 `screen.css`。但是早期还不支持媒体查询只支持媒体类型的浏览器，会忽略掉 screen 后面的条件，当媒体类型是 `screen` 的时候就加载了样式表，这显然不是期望的效果。如今向下面这样写：


```html
<link rel="stylesheet" href="screen.css" media="only screen and (max-width: 1000px)">
```

对于那些支持媒体类型不支持媒体查询的设备，会认为媒体类型为 only ，当然了这不满足任何一种设备，该条件也就被忽略了。

### meat 标签

当在移动设备上面使用响应式布局的时候，常常发现媒体查询没有其作用，只是呈现了一个全局缩小的页面。这是因为这些移动设备有一个虚拟的可视空间，这个空间实际上要比屏幕大很多。为了能让媒体查询在这些设备正常工作，就需要添加一个特殊的 meta 标签。

```
<meta name='viewport' content='' />
```

其中 content 字段可以取如下值：

+ width：视口的宽度，取值为一个数值或字符串"width-device"
+ height：视口的高度
+ initial-scale：初始的缩放比例
+ minimun-scale：最小允许的缩放比例
+ maximun-scale：最大允许的缩放比例
+ user-scalable：是否允许用户对视口进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许


```html
<meat name='viewport' content='width=device-width,initial-scale=1.0' />
```

以上代码表示宽度为设备的宽度，初始缩放比例为 1 （也就是不缩放），且不允许用户缩放视口大小。
