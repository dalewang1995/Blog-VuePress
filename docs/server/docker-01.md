## docker入门篇-部署静态页面

### 什么是docker

>Docker 最初是 dotCloud 公司创始人 Solomon Hykes 在法国期间发起的一个公司内部项目，它是基于 dotCloud 公司多年云服务技术的一次革新，并于 2013 年 3 月以 Apache 2.0 授权协议开源，主要项目代码在 GitHub 上进行维护。Docker 项目后来还加入了 Linux 基金会，并成立推动开放容器联盟（OCI）。

>Docker 使用 Google 公司的 Go 语言 开发实现，基于 Linux 内核的 cgroup，namespace，以及 AUFS 类的 Union FS 等技术，对进程进行封装隔离，属于操作系统层面的虚拟化技术。由于隔离的进程独立于宿主和其它隔离的进程，因此称其为容器。最初实现是基于 LXC，从 0.7 版本后开始去除 LXC，转而使用自行开发的 libcontainer，从 1.11 开始，进一步演进使用 runC 和 containerd。

>Docker 在容器的基础上，进行了进一步的封装，从文件系统、网络互联到进程隔离等等，极大的简化了容器的创建和维护。使得 Docker 技术比虚拟机技术更为轻便、快捷。


### docker与前端应用的结合

前端应用使用docker可以带来哪些优势呢？

1. 环境一致性

比如前端应用需要部署在多台虚拟机上，那么配置多台虚拟机就需要人为操作，增加修改配置，比如node版本升级，都需要一台一台进行，十分浪费时间，而且容易出错。但是使用docker技术，只需要配置一份镜像就可以，十分方便。

2. 方便迁移

Docker 确保了运行环境的一致性，使得应用的迁移更加容易。可以很轻易将在一个平台上运行的应用，迁移到另一个平台上，而不用担心运行环境的变化导致应用无法正常运行。比如接到任务说下周要加一个分区，或者客户要求部署私有云，可以很放心的说镜像拿走，而不用担心环境问题。

3. 快速部署、回滚

得益于 Docker 使用的分层存储和镜像技术，使得扩展镜像变得非常简单。可以预先把程序需要的依赖，静态资源等在构建过程中添加到镜像，在需要的时候启动该容器实现快速部署、回滚、止血。比如当出现线上事故需要回滚时，传统做法是触发某些自动化工具去拉代码装依赖打包最后部署，一旦某个环节出了问题，譬如网络被墙了导致依赖拉不下来，构建失败等等，将会导致更验证的问题。

### docker安装

`macOS`

`brew cask install docker`

安装好之后，会出现在mac的应用中，打开docker应用，遇到下载慢的问题可以把homebrew包地址修改为国内镜像（中科大镜像等）

其他系统安装 https://yeasy.gitbooks.io/docker_practice/install/


### 使用docker部署前端应用

####打包前端出dist

vue小项目举例，使用官方cli3快速生成项目

` vue create docker-vue ` 

这里使用yarn打包和启动项目，

` cd docker-vue ` 

` yarn run build ` 

打包出dist文件夹，方便一会打包进docker镜像

#### 制作docker镜像

使用docker官方的nginx镜像

` docker pull nginx:1.14 `

查看已安装镜像

` docker image ls `


#### 修改nginx配置文件

在当前目录（docker-vue）下创建nginx配置文件 `nginx.conf`
配置文件代码如下：

```conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    server {
        listen 80 default_server;
        server_name _;

        location  / {
        root /usr/share/nginx/html;
        index  index.html ;
        try_files $uri $uri/ /index.html;
        }
    }

}



```

#### Dockerfile文件修改

在当前目录（docker-vue）下，创建Dockerfile文件，Dockerfile 是一个文本文件，其内包含了一条条的 指令(Instruction)，每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。

```
FROM nginx:1.14
LABEL maintainer "dale_na@163.com"
ADD ./dist/ /usr/share/nginx/html
ADD nginx.conf /etc/nginx/
EXPOSE 80

```

#### 构建自定义镜像


` docker build -t dale_docker . ` 

`--tag, -t: 镜像的名字及标签`


#### 启动自定义镜像

`docker run -d -p 8080:80 dale_docker `

`-d: 后台运行容器，并返回容器ID`

`-p: 指定端口映射，格式为：主机(宿主)端口:容器端口`



如果以上配置都操作正确的话，此时打开本地浏览器，输入
http://localhost:8080/ 就会看到刚刚自己新建的vue项目！

#### 其他docker排查错误的命令

1. 查看当前所有docker进程 `docker ps -a`
2. 查看容器状态，-f实时刷新 `docker logs -f 容器id`
3. 删除容器 `docker container rm 容器id`



