# Docker

The live environment for this tutorial is BlipServer MoeGoe Openaibot deployed on different servers.

First, you need to have `docker` and `docker-compose` pre-installed

````shell
sudo apt install docker.io -y
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker- compose
chmod a+x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/dc
dc -v
````

## BlipServer Image Understanding Component

````shell
git clone https://github.com/aiastia-dockerhub/BlipServer
cd BlipServer
````

### Edit config.toml

```toml
device = "cuda" #or cpu
``` 

Save and execute the following command

```shell
dc up -d
```

## MoeGoe Docker component

````shell
git clone https://github.com/aiastia-dockerhub/MoeGoe 
cd MoeGoe
````

Then put the model under model (download it yourself) like this

````
model
|---- somemodel.pth
|---- somemodel.pth.json ( == config.json)
|---- info.json
````

## Openaibot main body installation

````shell
git clone https://github.com/aiastia-dockerhub/Openaibot.git
cd Openaibot
````

- Configuration

Follow the tutorial to complete the configuration under Config.

- Build

If BlipServer and Openaibot are not deployed on the same server.

````shell
rm docker-compose.yml 
cp docker-compose.yml.bak docker-compose.yml
````

If BlipServer and Openaibot are deployed on the same server.

```shell
nano docker-compose.yml
# ctrl + _ :28 
```

Modify the absolute path to the BlipServer file location on line L28 of docker-compose.yml. Also the BlipServer step *
*not needed** `dc up -v`
Just stop that docker if it is executed.

```yaml

- /home/ubuntu/BlipServer/:/app

```

``dc up -d``, done.

### Using Redis standalone

If you want to use the `redis` data server standalone, you can delete the `docker-compose.yml.bak`

````yaml
    depends_on:
      - redis
````

````yaml
  redis:
    image: redis:latest
    volumes:
      - . /redis:/data
    ports:
      - 6379:6379
    depends_on:
      - BlipServer
    networks:
      - app-tier
````