ARM 和AMD docker 的 Openaibot wiki!

该教程是 按 BlipServer MoeGoe  Openaibot  部署在不同服务器上的

安装好 docker 和 docker-compose
````
sudo apt  install docker.io -y
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod a+x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/dc
dc -v
````
如果 你需要 BlipServer
````
git clone https://github.com/aiastia-dockerhub/BlipServer
cd BlipServer
````
然后 编辑 config.toml 
````
device = "cuda" #or cpu
没gpu 改 cpu 
然后 保存后
````
````
dc up -d
````
如果你需要 MoeGoe 
````
git clone https://github.com/aiastia-dockerhub/MoeGoe 
cd MoeGoe
````
然后在 model 下放模型 （自己去下载）像这样
````
model
|---- somemodel.pth
|---- somemodel.pth.json (== config.json)
|---- info.json
````

正式安装 Openaibot 
````
git clone https://github.com/aiastia-dockerhub/Openaibot.git
cd Openaibot
````
然后按 教程 在Config下配置好几个文件

````
删除 docker-compose.yml 
然后 修改 docker-compose.yml.bak 文件名为docker-compose.yml

如果  BlipServer 和Openaibot和这个部署同一台服务器 就不用这一步 
但是要修改  docker-compose.yml  28 行
`- /home/ubuntu/BlipServer/:/app` 中BlipServer的文件位置绝对路径
 同时 BlipServer那一步 `不`需要dc up -v  如果执行了 就 停止那个docker 就行 
````
dc up -d
搞定

如果你有自己的redis的服务器 可以删掉docker-compose.yml.bak这个
````
    depends_on:
      - redis
````
````
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
