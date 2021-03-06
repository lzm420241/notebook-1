## 终端复用神器 —— tmux

_最后修改时间：2018-12-03_


本文为我在学习 tmux 的用法时整理，便于随时参考。


## tmux 介绍

tmux 作者对 tmux 的介绍：

> tmux is a terminal multiplexer: it enables a number of terminals to be created,
> accessed, and controlled from a single screen. tmux may be detached from a
> screen and continue running in the background, then later reattached.

tmux 是一个终端复用的工具，它可以在一个终端中打开多个会话（这里我指的会话，是一个可以敲命令行的窗口，也可以说是一个 shell 进程）。这不同于终端软件提供的分屏或者多Tab机制，tmux 是在一个终端窗口中管理多个会话。要使用 ssh 连接到服务器进行一些操作，这是软件开发者的日常，但如果在服务器需要同时进行多种操作，比如在执行一个耗时任务的同时，转去进行其它操作。这个时候有多个窗口可以使用，那就最方便不过了。一种方法是，使用终端软件打开多个 ssh 连接，这样就有多个窗口可以和服务器进行交互了，但缺点也很明显，一旦本机和服务器的连接断开了，那么多个 ssh 连接也就断掉了。


<div align="center"><img src="../images/18-12-6/tmux.jpg"  /></div>



tmux 可以在一个终端窗口下，管理多个会话，这样你只需要一个 ssh 连接，连接到服务器后，在使用 tmux 打开多个会话。而且与服务器的连接断开后，并不影响正在执行的命令。再次连接上服务器，通过 tmux 就可以继续进行之前的会话了。

## tmux 架构

为了解 tmux 的使用方法，先要了解一下 tmux 对 shell 的管理方式。tmux 中包含 session，window 和 panel 三个概念，理解这几个概念有助于理解 tmux 的用法。

tmux 采用如下逻辑结构来管理不同的 shell 进程：

```
+---------------------------------------------------------------+
|                           session                             |
|                                                               |
|  +--------------------------+   +--------------------------+  |
|  |          window 1        |   |          window 2        |  |
|  | +---------+  +---------+ |   | +---------+  +---------+ |  |
|  | |         |  |         | |   | |         |  |         | |  |
|  | |  pane 1 |  |  pane 2 | |   | |  pane 1 |  |  pane 2 | |  |
|  | |         |  |         | |   | |         |  |         | |  |
|  | +---------+  +---------+ |   | +---------+  +---------+ |  |
|  +--------------------------+   +--------------------------+  |
+---------------------------------------------------------------+

图 1. tmux 对 shell 的管理
```

当按下 `tmux` 命令后，就打开了一个全新的 session，并分配了一个 window，在这个 window 中只有一个全屏显示的 pane，每个 pane 就是一个 shell 进程。可以通过 tmux 打开创建多个 session，在每个 session 中打开多个 window，并在一个 window 中分屏显示多个 pane。

如果在服务器上进行的任务很多，那么为了便于记忆与管理，可以在不同的 session 中进行不同的任务。当然也可以在一个 session 的多个 window 中执行不同的任务。自然也可以在不同的 pane 中执行不同的任务。怎么使用完全取决于具体任务的规模。比如你同时在进行多个项目，这其中要修改数据库的配置，要写代码。那么可以给每个项目新建一个 session，然后在一个 window 中写代码，另一个 window 中新建多个 pane 来进行配置。

## tmux 常用命令

### 对 session 进行管理

在服务器上新建一个 session，然后在 session 中执行某些命令，这个命令可能很耗时，期间与服务器的连接也许会断开，通常连接断开后，在服务器上正在进行的命令也会终结掉。但是如果在 tmux 的 session 中执行任务，那么任务还会在后台执行着。当重新连接上服务器，并进入相应的 session 后，可接着之前的任务继续工作。

**启动 session**

这个时候将打开一个全新的页面，接下来需要做的就是在页面打开多个 shell。进入了 tmux session 之后，按下的一切命令也就先由 tmux 接收，然后再交由 tmux 分配给相应的 shell 来执行。为了避免按键冲突，所有 tmux 的命令都增加了一个前缀组合按键，即 `Ctrl+B` (下文简称 C-b)，即同时按下 `Ctrl` 和 `B`，这样之后的按键被视为是对 tmux 的命令，而非要在 shell 中执行的命令。

```sh
# 启动一个未命名的 session
$ tmux

# 启动一个命名 session
$ tmux new -s <session name>
```

**退出/进入 session**

进入 session 之后，敲下的命名就会先经过 tmux 处理，因此退出 session 的命名需要使用前缀组合键。

```sh
# 退出 session
C-b detach # 完整命令
C-b d # 简短命令
```

重新进入 session 也就是重新 attach 上某个 session

```sh
# 进入 session
$ tmux attach -t <session id | session name>
$ tmux a -t <session-name>
```

**查看现有 session**

使用如下命名就可以看到现存的 session，使用对应的 session id 或者 session name 便可以重新进行，或执行其他操作

```sh
$ tmux ls
```

其输出结果的一个例子如下：

```
0: 1 windows (created Thu Dec  6 12:07:14 2018) [183x44] (attached)
2: 1 windows (created Thu Dec  6 14:15:18 2018) [183x44]
test: 1 windows (created Thu Dec  6 14:14:52 2018) [183x44]  
```

解释如下：

其中冒号前面的 `0`、`1`、`test` 就是 session 的 id 或者 name。后面的 `1 windows` 则表示这个 session 中只有一个 window。第一行最后面的 `(attached)` 表示这个 session 已经挂载了，即正显示在某个终端中。

**重命名 session**

在创建 session 的时候如果不指定名称，tmux 则会给它按顺序分配一个 session id，但数字明显不好记忆，如果 session 比较多，则很容易搞混，对于创建时候未命名的 session，可以在之后修改其名称。

```sh
$ tmux rename-session -t 0 database # 将编号为 0 的 session 改名为 database
```

**关闭 session**


使用 tmux 创建的 session 在退出后不会主动关闭，即它一直在后台运行着。这可以保证在 session 的任务不中断，但有时候正是要关闭这个 session，同时关闭这个 session 中全部的 shell。

```sh
# 关闭某个 session，这里的 -t 指的是 target
$ tmux kill-session -t <session-name>

# 关闭所有的 session
$ tmux kill-server # 直接把 tmux server 给关闭了，那么所有的 session 也就同时关闭了（谨慎）
```

### 对 window 进行管理

在一个 session 中可以创建多个 window ，分多个 window 可以让我们在不同的 window 中进行不同的任务。

**新建 window**

```
$ C-b c
```

**切换 window**

```sh
C-b p # 切换前一个 window
C-b n # 切换后一个 window
C-b <number> # 切换至特定编号的 window
```

**分屏操作：**

上下分屏，采用 `C-b "` 即按下前缀组合键 `Ctrl+B` 之后输入 `"`（注意：需要同时按住 `shift` 才能输入 `"`），左右分屏采用 `C-b %`


```sh
C-b " # 纵向切分  
C-b % # 横向切分
```

**关闭 window**

```
C-b &
```


### 对 pane 进行管理

可以在一个 window 中划分多个 panel，在不同的 panel 中进行不同的子任务。在一个 panel 中的命令执行期间，可以去操作其他的 panel。

**切分**

```sh
C-b " # 纵向切分  
C-b % # 横向切分
```

**切换**

按下前缀组合键之后，使用方向键切换

```
C-b <arrow-key>
```
**关闭**

```sh
C-b x

$ exit # 或者直接使用 exit 退出 shell
```

**全屏**

有时候希望某个子窗口放大至全屏，进行某些操作，可以通过 `C-b z` 来进行切换。

**调整子窗口大小**

按下前缀组合键，然后按住 `Ctrl` 键的同时使用方向键调整子窗口大小。

```
C-b C-<arrow-key>
```

## tmux 的更多命令

下表摘自：[http://www.cnblogs.com/kevingrace/p/6496899.html](http://www.cnblogs.com/kevingrace/p/6496899.html)

<table class="table-view log-set-param">
    <tbody>
        <tr>
            <td colspan="2" align="left" valign="center" width="0">
                <div>Ctrl+b</div>
            </td>
            <td>
                <div>激活控制台；此时以下按键生效</div>
            </td>
        </tr>
        <tr>
            <td rowspan="9" align="left" valign="center" width="0">
                <div style="width: 80px">系统操作</div>
            </td>
            <td>
                <div style="width: 80px">?</div>
            </td>
            <td>
                <div>列出所有快捷键；按q返回</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>d</div>
            </td>
            <td>
                <div>脱离当前会话；这样可以暂时返回Shell界面，输入tmux attach能够重新进入之前的会话</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>D</div>
            </td>
            <td>
                <div>选择要脱离的会话；在同时开启了多个会话时使用</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>Ctrl+z</div>
            </td>
            <td>
                <div>挂起当前会话</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>r</div>
            </td>
            <td>
                <div>强制重绘未脱离的会话</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>s</div>
            </td>
            <td>
                <div>选择并切换会话；在同时开启了多个会话时使用</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>:</div>
            </td>
            <td>
                <div>进入命令行模式；此时可以输入支持的命令，例如kill-server可以关闭服务器</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>[</div>
            </td>
            <td>
                <div>进入复制模式；此时的操作与vi/emacs相同，按q/Esc退出</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>~</div>
            </td>
            <td>
                <div>列出提示信息缓存；其中包含了之前tmux返回的各种提示信息</div>
            </td>
        </tr>
        <tr>
            <td rowspan="10" align="left" valign="center" width="0">
                <div>窗口操作</div>
            </td>
            <td>
                <div>c</div>
            </td>
            <td>
                <div>创建新窗口</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>&amp;</div>
            </td>
            <td>
                <div>关闭当前窗口</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>数字键</div>
            </td>
            <td>
                <div>切换至指定窗口</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>p</div>
            </td>
            <td>
                <div>切换至上一窗口</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>n</div>
            </td>
            <td>
                <div>切换至下一窗口</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>l</div>
            </td>
            <td>
                <div>在前后两个窗口间互相切换</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>w</div>
            </td>
            <td>
                <div>通过窗口列表切换窗口</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>,</div>
            </td>
            <td>
                <div>重命名当前窗口；这样便于识别</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>.</div>
            </td>
            <td>
                <div>修改当前窗口编号；相当于窗口重新排序</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>f</div>
            </td>
            <td>
                <div>在所有窗口中查找指定文本</div>
            </td>
        </tr>
        <tr>
            <td rowspan="14" align="left" valign="center" width="0">
                <div>面板操作</div>
            </td>
            <td>
                <div>”</div>
            </td>
            <td>
                <div>将当前面板平分为上下两块</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>%</div>
            </td>
            <td>
                <div>将当前面板平分为左右两块</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>x</div>
            </td>
            <td>
                <div>关闭当前面板</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>!</div>
            </td>
            <td>
                <div>将当前面板置于新窗口；即新建一个窗口，其中仅包含当前面板</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>Ctrl+方向键</div>
            </td>
            <td>
                <div>以1个单元格为单位移动边缘以调整当前面板大小</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>Alt+方向键</div>
            </td>
            <td>
                <div>以5个单元格为单位移动边缘以调整当前面板大小</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>Space</div>
            </td>
            <td>
                <div>在预置的面板布局中循环切换；依次包括even-horizontal、even-vertical、main-horizontal、main-vertical、tiled</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>q</div>
            </td>
            <td>
                <div>显示面板编号</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>o</div>
            </td>
            <td>
                <div>在当前窗口中选择下一面板</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>方向键</div>
            </td>
            <td>
                <div>移动光标以选择面板</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>{</div>
            </td>
            <td>
                <div>向前置换当前面板</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>}</div>
            </td>
            <td>
                <div>向后置换当前面板</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>Alt+o</div>
            </td>
            <td>
                <div>逆时针旋转当前窗口的面板</div>
            </td>
        </tr>
        <tr>
            <td>
                <div>Ctrl+o</div>
            </td>
            <td>
                <div>顺时针旋转当前窗口的面板</div>
            </td>
        </tr>
    </tbody>
</table>

