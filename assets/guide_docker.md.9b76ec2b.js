import{_ as s,c as a,o as n,a as p}from"./app.e487291a.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/docker.md","lastUpdated":1675829192000}'),e={name:"guide/docker.md"},l=p(`<p>ARM 和AMD docker 的 Openaibot wiki!</p><p>该教程是 按 BlipServer MoeGoe Openaibot 部署在不同服务器上的</p><p>安装好 docker 和 docker-compose</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">sudo apt  install docker.io -y</span></span>
<span class="line"><span style="color:#A6ACCD;">curl -L &quot;https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)&quot; -o /usr/local/bin/docker-compose</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod a+x /usr/local/bin/docker-compose</span></span>
<span class="line"><span style="color:#A6ACCD;">ln -s /usr/local/bin/docker-compose /usr/bin/dc</span></span>
<span class="line"><span style="color:#A6ACCD;">dc -v</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>如果 你需要 BlipServer</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git clone https://github.com/aiastia-dockerhub/BlipServer</span></span>
<span class="line"><span style="color:#A6ACCD;">cd BlipServer</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后 编辑 config.toml</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">device = &quot;cuda&quot; #or cpu</span></span>
<span class="line"><span style="color:#A6ACCD;">没gpu 改 cpu </span></span>
<span class="line"><span style="color:#A6ACCD;">然后 保存后</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">dc up -d</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>如果你需要 MoeGoe</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git clone https://github.com/aiastia-dockerhub/MoeGoe </span></span>
<span class="line"><span style="color:#A6ACCD;">cd MoeGoe</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后在 model 下放模型 （自己去下载）像这样</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">model</span></span>
<span class="line"><span style="color:#A6ACCD;">|---- somemodel.pth</span></span>
<span class="line"><span style="color:#A6ACCD;">|---- somemodel.pth.json (== config.json)</span></span>
<span class="line"><span style="color:#A6ACCD;">|---- info.json</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>正式安装 Openaibot</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git clone https://github.com/aiastia-dockerhub/Openaibot.git</span></span>
<span class="line"><span style="color:#A6ACCD;">cd Openaibot</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后按 教程 在Config下配置好几个文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">删除 docker-compose.yml </span></span>
<span class="line"><span style="color:#A6ACCD;">然后 修改 docker-compose.yml.bak 文件名为docker-compose.yml</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">如果  BlipServer 和Openaibot和这个部署同一台服务器 就不用这一步 </span></span>
<span class="line"><span style="color:#A6ACCD;">但是要修改  docker-compose.yml  28 行</span></span>
<span class="line"><span style="color:#A6ACCD;">\`- /home/ubuntu/BlipServer/:/app\` 中BlipServer的文件位置绝对路径</span></span>
<span class="line"><span style="color:#A6ACCD;"> 同时 BlipServer那一步 \`不\`需要dc up -v  如果执行了 就 停止那个docker 就行 </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>dc up -d 搞定</p><p>如果你有自己的redis的服务器 可以删掉docker-compose.yml.bak这个</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">    depends_on:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - redis</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">  redis:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: redis:latest</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - ./redis:/data</span></span>
<span class="line"><span style="color:#A6ACCD;">    ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - 6379:6379</span></span>
<span class="line"><span style="color:#A6ACCD;">    depends_on:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - BlipServer</span></span>
<span class="line"><span style="color:#A6ACCD;">    networks:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - app-tier</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,21),o=[l];function c(t,i,r,C,d,A){return n(),a("div",null,o)}const m=s(e,[["render",c]]);export{u as __pageData,m as default};
