import{_ as s,o as a,c as n,Q as o}from"./chunks/framework.3e9aee8a.js";const u=JSON.parse('{"title":"📝 Deployment Guide","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/getting-started.md","filePath":"en/guide/getting-started.md","lastUpdated":1697970281000}'),l={name:"en/guide/getting-started.md"},e=o(`<h1 id="📝-deployment-guide" tabindex="-1">📝 Deployment Guide <a class="header-anchor" href="#📝-deployment-guide" aria-label="Permalink to &quot;📝 Deployment Guide&quot;">​</a></h1><h2 id="📦-check-system" tabindex="-1">📦 Check system <a class="header-anchor" href="#📦-check-system" aria-label="Permalink to &quot;📦 Check system&quot;">​</a></h2><p>Please confirm that your system language set is UTF8, otherwise enter <code>dpkg-reconfigure locales</code> to configure the language.</p><p>Please make sure that the memory of your server is greater than <code>1G</code>, otherwise PM2 will restart indefinitely.</p><div class="tip custom-block"><p class="custom-block-title">tip</p><p>The base operating load is approximately 600MB of memory per receiver + transmitter (one platform). Receivers and transmitters can be deployed separately, but the database must be shared.</p></div><h2 id="🥞-automatic-installation" tabindex="-1">🥞 Automatic installation <a class="header-anchor" href="#🥞-automatic-installation" aria-label="Permalink to &quot;🥞 Automatic installation&quot;">​</a></h2><p>If you are using a brand new server, you can use the following shell to try to automatically install this project.</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-sSL</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://raw.githubusercontent.com/LLMKira/Openaibot/main/deploy.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bash</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-sSL</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://raw.githubusercontent.com/LLMKira/Openaibot/main/deploy.sh</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bash</span></span></code></pre></div><h3 id="🥣-docker" tabindex="-1">🥣 Docker <a class="header-anchor" href="#🥣-docker" aria-label="Permalink to &quot;🥣 Docker&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clone</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/LlmKira/Openaibot.git</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Openaibot</span></span>
<span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-compose.yml</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">llmbot</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">up</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">llmbot</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clone</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/LlmKira/Openaibot.git</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Openaibot</span></span>
<span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-compose.yml</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">llmbot</span><span style="color:#24292E;"> </span><span style="color:#032F62;">up</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">llmbot</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you use Docker to run your robot, you may encounter missing dependencies. Sometimes we forget to package new dependencies.</p></div><h2 id="🥽-manual-installation" tabindex="-1">🥽 Manual installation <a class="header-anchor" href="#🥽-manual-installation" aria-label="Permalink to &quot;🥽 Manual installation&quot;">​</a></h2><ul><li><p>Use <code>pip uninstall llmkira</code> to uninstall the old kernel.</p></li><li><p>Make sure your Python version is 3.9 or above.</p></li><li><p>Install Docker</p></li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>To install Docker, please refer to <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" rel="noreferrer">Official Documentation</a></p><p>To install Docker Compose, please refer to <a href="https://docs.docker.com/compose/install/" target="_blank" rel="noreferrer">Official Documentation</a></p><p>Or <a href="https://krau.top/posts/install-docker-one-key" target="_blank" rel="noreferrer">blog post</a></p><p>Windows users can install <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noreferrer">Docker Desktop</a></p></div><p>At this point you can try using <a href="#🥣-docker">Docker to run the robot</a>, if you don’t want to use Docker you can continue reading.</p><h3 id="🍫-install-redis" tabindex="-1">🍫 Install Redis <a class="header-anchor" href="#🍫-install-redis" aria-label="Permalink to &quot;🍫 Install Redis&quot;">​</a></h3><p>There are two ways to install the cache database, you can choose one of them.</p><h4 id="install-via-command-line" tabindex="-1">Install via command line <a class="header-anchor" href="#install-via-command-line" aria-label="Permalink to &quot;Install via command line&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Install Redis</span></span>
<span class="line"><span style="color:#B392F0;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis.service</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Install Redis</span></span>
<span class="line"><span style="color:#6F42C1;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis.service</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span></span></code></pre></div><h4 id="install-via-docker" tabindex="-1">Install via Docker <a class="header-anchor" href="#install-via-docker" aria-label="Permalink to &quot;Install via Docker&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis:latest</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6379</span><span style="color:#9ECBFF;">:6379</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">redis:latest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis:latest</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6379</span><span style="color:#032F62;">:6379</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#032F62;">redis:latest</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">tip</p><p>It is recommended that you add a password to prevent the database from being exposed to the public network.</p></div><h3 id="🐰-install-rabbitmq" tabindex="-1">🐰 Install RabbitMQ <a class="header-anchor" href="#🐰-install-rabbitmq" aria-label="Permalink to &quot;🐰 Install RabbitMQ&quot;">​</a></h3><p>There are two ways to install the cache database, you can choose one of them.</p><h4 id="install-via-command-line-1" tabindex="-1">Install via command line <a class="header-anchor" href="#install-via-command-line-1" aria-label="Permalink to &quot;Install via command line&quot;">​</a></h4><p>To install RabbitMQ from the command line, please refer to <a href="https://www.rabbitmq.com/install-debian.html" target="_blank" rel="noreferrer">Official Documentation</a> or <a href="https://www.leeks.info/zh_CN/latest/Linux_Notes/rabbitmq/RabbitMQ.html" target="_blank" rel="noreferrer">blog post</a></p><h4 id="install-via-docker-1" tabindex="-1">Install via Docker <a class="header-anchor" href="#install-via-docker-1" aria-label="Permalink to &quot;Install via Docker&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#Install RabbitMQ</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rabbitmq:3.10-management</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5672</span><span style="color:#9ECBFF;">:5672</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15672</span><span style="color:#9ECBFF;">:15672</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">RABBITMQ_DEFAULT_USER=admin</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">RABBITMQ_DEFAULT_PASS=admin</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">--hostname</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">myRabbit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rabbitmq</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">rabbitmq:3.10-management</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ps</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-l</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#Install RabbitMQ</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rabbitmq:3.10-management</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5672</span><span style="color:#032F62;">:5672</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15672</span><span style="color:#032F62;">:15672</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">RABBITMQ_DEFAULT_USER=admin</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">RABBITMQ_DEFAULT_PASS=admin</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">--hostname</span><span style="color:#24292E;"> </span><span style="color:#032F62;">myRabbit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rabbitmq</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#032F62;">rabbitmq:3.10-management</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ps</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-l</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">tip</p><p><code>RABBITMQ_DEFAULT_USER</code> and <code>RABBITMQ_DEFAULT_PASS</code> are the default username and password of RabbitMQ, and you can modify them yourself. It is recommended that you modify it to prevent the database from being exposed to the public network.</p></div><h3 id="🛠-clone-project" tabindex="-1">🛠 Clone project <a class="header-anchor" href="#🛠-clone-project" aria-label="Permalink to &quot;🛠 Clone project&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clone</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/LlmKira/Openaibot.git</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Openaibot</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clone</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/LlmKira/Openaibot.git</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Openaibot</span></span></code></pre></div><ul><li>Configuration <code>.env</code> file</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.env.exp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.env</span></span>
<span class="line"><span style="color:#B392F0;">nano.env</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.env.exp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.env</span></span>
<span class="line"><span style="color:#6F42C1;">nano.env</span></span></code></pre></div><ul><li>⚙️ Install dependencies</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pip</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">requirements.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pip</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">requirements.txt</span></span></code></pre></div><h2 id="▶️-run" tabindex="-1">▶️ Run <a class="header-anchor" href="#▶️-run" aria-label="Permalink to &quot;▶️ Run&quot;">​</a></h2><p>It is recommended to use the PM2 panel to run the main body of the robot.</p><h3 id="pm2-hosting" tabindex="-1">PM2 Hosting <a class="header-anchor" href="#pm2-hosting" aria-label="Permalink to &quot;PM2 Hosting&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">apt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npm</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pm2</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-g</span></span>
<span class="line"><span style="color:#B392F0;">pm2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pm2.json</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">apt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npm</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pm2</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-g</span></span>
<span class="line"><span style="color:#6F42C1;">pm2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pm2.json</span></span></code></pre></div><p>Other commands</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pm2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pm2.json</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Stop</span></span>
<span class="line"><span style="color:#B392F0;">pm2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pm2.json</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Restart</span></span>
<span class="line"><span style="color:#B392F0;">pm2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pm2.json</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># View status</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pm2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pm2.json</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Stop</span></span>
<span class="line"><span style="color:#6F42C1;">pm2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pm2.json</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Restart</span></span>
<span class="line"><span style="color:#6F42C1;">pm2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pm2.json</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># View status</span></span></code></pre></div><h3 id="via-shell" tabindex="-1">Via shell <a class="header-anchor" href="#via-shell" aria-label="Permalink to &quot;Via shell&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">python3</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start_sender.py</span></span>
<span class="line"><span style="color:#B392F0;">python3</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start_receiver.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">python3</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start_sender.py</span></span>
<span class="line"><span style="color:#6F42C1;">python3</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start_receiver.py</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">Here!</p><p>When you exit the current shell, the bot also exits. You can use the <code>nohup</code> command to suspend the bot. However, we don&#39;t recommend this.</p></div><h2 id="🫙-run-configuration" tabindex="-1">🫙 Run configuration <a class="header-anchor" href="#🫙-run-configuration" aria-label="Permalink to &quot;🫙 Run configuration&quot;">​</a></h2><p>Configure the corresponding environment variables to run the corresponding robot.</p><h3 id="🥽-runtime-environment-variables" tabindex="-1">🥽 Runtime environment variables <a class="header-anchor" href="#🥽-runtime-environment-variables" aria-label="Permalink to &quot;🥽 Runtime environment variables&quot;">​</a></h3><table><thead><tr><th>variable name</th><th>value</th><th>description</th></tr></thead><tbody><tr><td><code>LLMBOT_STOP_REPLY</code></td><td>1</td><td>If value is 1, stop receiving replies</td></tr><tr><td><code>LLMBOT_LOG_OUTPUT</code></td><td>DEBUG</td><td>If the value is DEBUG, print a long debug log to the screen.</td></tr></tbody></table><h3 id="🥛-telegram" tabindex="-1">🥛 Telegram <a class="header-anchor" href="#🥛-telegram" aria-label="Permalink to &quot;🥛 Telegram&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">TELEGRAM_BOT_TOKEN</span><span style="color:#E1E4E8;"> = 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890</span></span>
<span class="line"><span style="color:#F97583;">TELEGRAM_BOT_PROXY_ADDRESS</span><span style="color:#E1E4E8;"> = socks5://127.0.0.1:7890</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">TELEGRAM_BOT_TOKEN</span><span style="color:#24292E;"> = 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890</span></span>
<span class="line"><span style="color:#D73A49;">TELEGRAM_BOT_PROXY_ADDRESS</span><span style="color:#24292E;"> = socks5://127.0.0.1:7890</span></span></code></pre></div><table><thead><tr><th>Variable name</th><th>Description</th><th>Get</th></tr></thead><tbody><tr><td><code>TELEGRAM_BOT_TOKEN</code></td><td>TelegramBot</td><td><a href="https://t.me/BotFather" target="_blank" rel="noreferrer">Telegram Bot</a></td></tr><tr><td><code>TELEGRAM_BOT_PROXY_ADDRESS</code></td><td>Aiohttp</td><td></td></tr></tbody></table><h3 id="🍖-discord" tabindex="-1">🍖 Discord <a class="header-anchor" href="#🍖-discord" aria-label="Permalink to &quot;🍖 Discord&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">DISCORD_BOT_TOKEN</span><span style="color:#E1E4E8;"> = Y0NzY0NzY0NzY0NzY0NzY0.DsYQDQ.0</span></span>
<span class="line"><span style="color:#F97583;">DISCORD_BOT_PREFIX</span><span style="color:#E1E4E8;"> = !</span></span>
<span class="line"><span style="color:#F97583;">DISCORD_BOT_PROXY_ADDRESS</span><span style="color:#E1E4E8;"> = socks5://</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">DISCORD_BOT_TOKEN</span><span style="color:#24292E;"> = Y0NzY0NzY0NzY0NzY0NzY0.DsYQDQ.0</span></span>
<span class="line"><span style="color:#D73A49;">DISCORD_BOT_PREFIX</span><span style="color:#24292E;"> = !</span></span>
<span class="line"><span style="color:#D73A49;">DISCORD_BOT_PROXY_ADDRESS</span><span style="color:#24292E;"> = socks5://</span></span></code></pre></div><p>To apply for Discord Bot, please go to <a href="https://discord.com/developers/applications" target="_blank" rel="noreferrer">Official Platform</a></p><p>Click on <code>oauth2/url-generator</code>, select the permission group <code>bot</code>, copy the link to the browser and open it, select the server where you want to add the robot, and then click <code>Authorize</code>.</p><div class="warning custom-block"><p class="custom-block-title">Here!</p><p>Discord Bot currently requires the Intent privileged image. Currently we have all privileges checked, but we will not use your data.</p><p>Since i am not clear exactly which Intents to use , if you have any idea, please submit suggestions for modification.</p><p>For details, see <a href="https://discord.com/developers/docs/topics/gateway#privileged-intents" target="_blank" rel="noreferrer">Official Documentation</a> and Blog article <a href="https://support.discord.com/hc/zh-tw/articles/360040720412#privileged-intent-whitelisting" target="_blank" rel="noreferrer">Discord</a></p></div><h3 id="🍗-slack" tabindex="-1">🍗 Slack <a class="header-anchor" href="#🍗-slack" aria-label="Permalink to &quot;🍗 Slack&quot;">​</a></h3><p>The Slack platform requires you to create the app yourself and then add it to your workspace.</p><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">SLACK_APP_TOKEN</span><span style="color:#E1E4E8;"> = xapp</span></span>
<span class="line"><span style="color:#F97583;">SLACK_BOT_TOKEN</span><span style="color:#E1E4E8;"> = xoxb</span></span>
<span class="line"><span style="color:#F97583;">SLACK_SIGNING_SECRET</span><span style="color:#E1E4E8;"> = xxxxxxx</span></span>
<span class="line"><span style="color:#F97583;">SLACK_BOT_PROXY_ADDRESS</span><span style="color:#E1E4E8;"> = http</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">SLACK_APP_TOKEN</span><span style="color:#24292E;"> = xapp</span></span>
<span class="line"><span style="color:#D73A49;">SLACK_BOT_TOKEN</span><span style="color:#24292E;"> = xoxb</span></span>
<span class="line"><span style="color:#D73A49;">SLACK_SIGNING_SECRET</span><span style="color:#24292E;"> = xxxxxxx</span></span>
<span class="line"><span style="color:#D73A49;">SLACK_BOT_PROXY_ADDRESS</span><span style="color:#24292E;"> = http</span></span></code></pre></div><p>Open <a href="https://api.slack.com/apps/" target="_blank" rel="noreferrer">Slack App Center</a> and create a new application.</p><ul><li>Configuration key</li></ul><p>Find the <code>Signing Secret</code> tab on the homepage and look for <code>SLACK_SIGNING_SECRET</code>.</p><p>Find the <code>App-Level Tokens</code> tab and look for <code>SLACK_APP_TOKEN</code>.</p><p>Open the Oauth tab and find the <code>Bot User OAuth Token</code> as <code>SLACK_BOT_TOKEN</code>.</p><ul><li>enable socket mode</li></ul><p>Turn on <code>Socket Mode</code></p><ul><li>Turn on event subscription</li></ul><p>Go to event-subscriptions and enable <code>Event Subscriptions</code> on the page , subscribe to the following events: <code>message.channels</code>, <code>message.im</code>, <code>message.groups</code>.</p><ul><li>Enable read and write permissions</li></ul><p>Go to oauth and find <code>Bot Token Scopes</code> , and select the following permissions: <code>chat:write</code>, <code>channels:read</code>, <code>commands</code>, <code>files:read</code>, <code>files:write</code>, <code>im:read</code>, <code>im:history</code>, <code>group:history </code>, <code>im:write</code>, <code>channel:write</code>, <code>channel:history</code> (There may be some additional permissions).</p><ul><li>Register all Slash commands</li></ul><p>Go to Slash Commands to register all Slash commands. See <a href="/Docs/guide/command">Command Guide</a> for the command list.</p><p>Reinstall the APP, invite your robot to the channel, and use <code>@BOT</code> to call your robot.</p><h3 id="🍔-kook" tabindex="-1">🍔 Kook <a class="header-anchor" href="#🍔-kook" aria-label="Permalink to &quot;🍔 Kook&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">KOOK_BOT_TOKEN</span><span style="color:#E1E4E8;"> = 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">KOOK_BOT_TOKEN</span><span style="color:#24292E;"> = 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890</span></span></code></pre></div><p>Go to <a href="https://developer.kookapp.cn" target="_blank" rel="noreferrer">Kook Developer Center</a> and create a new application in the upper left corner.</p><p>Get it and fill in your Kook robot Token.</p><h2 id="🍤-configure-openai-endpoint" tabindex="-1">🍤 Configure Openai endpoint <a class="header-anchor" href="#🍤-configure-openai-endpoint" aria-label="Permalink to &quot;🍤 Configure Openai endpoint&quot;">​</a></h2><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">OPENAI_API_KEY</span><span style="color:#E1E4E8;"> = sk-xxx</span></span>
<span class="line"><span style="color:#F97583;">OPENAI_API_MODEL</span><span style="color:#E1E4E8;"> = gpt-3.5-turbo-0613</span></span>
<span class="line"><span style="color:#F97583;">OPENAI_API_ENDPOINT</span><span style="color:#E1E4E8;"> = https://api.openai.com/v1</span></span>
<span class="line"><span style="color:#F97583;">OPENAI_API_ORG_ID</span><span style="color:#E1E4E8;"> = org-xxx</span></span>
<span class="line"><span style="color:#F97583;">OPENAI_API_PROXY</span><span style="color:#E1E4E8;"> = socks5://127.0.0.1:7890</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">OPENAI_API_KEY</span><span style="color:#24292E;"> = sk-xxx</span></span>
<span class="line"><span style="color:#D73A49;">OPENAI_API_MODEL</span><span style="color:#24292E;"> = gpt-3.5-turbo-0613</span></span>
<span class="line"><span style="color:#D73A49;">OPENAI_API_ENDPOINT</span><span style="color:#24292E;"> = https://api.openai.com/v1</span></span>
<span class="line"><span style="color:#D73A49;">OPENAI_API_ORG_ID</span><span style="color:#24292E;"> = org-xxx</span></span>
<span class="line"><span style="color:#D73A49;">OPENAI_API_PROXY</span><span style="color:#24292E;"> = socks5://127.0.0.1:7890</span></span></code></pre></div><p>Optional models are as follows</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">OPENAI_API_MODEL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;gpt-3.5-turbo-0301&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;gpt-3.5-turbo-0613&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;gpt-3.5-turbo&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;gpt-4-0314&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;gpt-4-0613&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;gpt-4&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">OPENAI_API_MODEL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;gpt-3.5-turbo-0301&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;gpt-3.5-turbo-0613&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;gpt-3.5-turbo&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;gpt-4-0314&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;gpt-4-0613&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;gpt-4&quot;</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Users can apply for API Key at <a href="https://beta.openai.com/" target="_blank" rel="noreferrer">Openai</a>.</p><p>User data and usage are recorded in the Redis database <code>sub:{user_id}</code>.</p>`,83),p=[e];function t(c,r,i,d,y,E){return a(),n("div",null,p)}const F=s(l,[["render",t]]);export{u as __pageData,F as default};
