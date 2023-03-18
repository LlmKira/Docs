# Docker

该教程的实时环境是 BlipServer MoeGoe Openaibot 部署在不同服务器上。

首先，你需要预先安装好 `docker` 和 `docker-compose`:

````shell
sudo apt  install docker.io -y
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod a+x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/dc
dc -v
````

## BlipServer 图片理解 组件

````shell
git clone https://github.com/aiastia-dockerhub/BlipServer
cd BlipServer
````

### 编辑 config.toml

```toml
device = "cuda" #or cpu
``` 

保存后执行下面的命令

```shell
dc up -d
```

## MoeGoe Docker 组件

````shell
git clone https://github.com/aiastia-dockerhub/MoeGoe 
cd MoeGoe
````

然后在 model 下放模型 （自己去下载）像这样

````
model
|---- somemodel.pth
|---- somemodel.pth.json ( == config.json)
|---- info.json
````

## Openaibot 主体 安装

````shell
git clone https://github.com/aiastia-dockerhub/Openaibot.git
cd Openaibot
````

- 配置

按教程在 Config 下配置完毕。

- 构建

如果 BlipServer 和 Openaibot 没有部署在同一台服务器。

````shell
rm docker-compose.yml 
cp docker-compose.yml.bak docker-compose.yml
````


如果 BlipServer 和 Openaibot 部署在同一台服务器。

```shell
nano docker-compose.yml
# ctrl + _ :28 
```

修改 docker-compose.yml L28 行BlipServer的文件位置绝对路径。同时 BlipServer 那一步 **不需要** `dc up -v`
如果执行了请停止那个docker就行。

```yaml
- /home/ubuntu/BlipServer/:/app
```

`dc up -d` ，搞定。

### 独立使用 Redis

如果你想独立使用 `redis` 数据服务器，可以删掉`docker-compose.yml.bak`

````yaml
    depends_on:
      - redis
````

````yaml
  redis:
    image: redis:latest
    volumes:
      - ./redis:/data
    ports:
      - 6379:6379
    depends_on:
      - BlipServer
    networks:
      - app-tier
````
