import{_ as a,c as e,o as n,a as s}from"./app.f541f39d.js";const C=JSON.parse('{"title":"Order","description":"","frontmatter":{},"headers":[{"level":2,"title":"Chat command","slug":"chat-command","link":"#chat-command","children":[]},{"level":2,"title":"Task command","slug":"task-command","link":"#task-command","children":[]},{"level":2,"title":"Tool command","slug":"tool-command","link":"#tool-command","children":[]},{"level":2,"title":"Bind command","slug":"bind-command","link":"#bind-command","children":[]},{"level":2,"title":"Unbind command","slug":"unbind-command","link":"#unbind-command","children":[]},{"level":2,"title":"Clear command","slug":"clear-command","link":"#clear-command","children":[]},{"level":2,"title":"Rset_endpoint command","slug":"rset-endpoint-command","link":"#rset-endpoint-command","children":[]},{"level":2,"title":"Rset_key command","slug":"rset-key-command","link":"#rset-key-command","children":[]},{"level":2,"title":"Clear_rset command","slug":"clear-rset-command","link":"#clear-rset-command","children":[]},{"level":2,"title":"Auth Command","slug":"auth-command","link":"#auth-command","children":[]}],"relativePath":"en/guide/command.md","lastUpdated":1697360886000}'),l={name:"en/guide/command.md"},t=s(`<h1 id="order" tabindex="-1">Order <a class="header-anchor" href="#order" aria-hidden="true">#</a></h1><h2 id="chat-command" tabindex="-1">Chat command <a class="header-anchor" href="#chat-command" aria-hidden="true">#</a></h2><p>After using the <code>/chat</code> command, you can have a conversation with the assistant. Depending on the settings, the plug-in may not be enabled (enabled by default).</p><h4 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/chat Hi, how are you?</span></span>
<span class="line"><span style="color:#A6ACCD;">/chat What is the weather like today?</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="task-command" tabindex="-1">Task command <a class="header-anchor" href="#task-command" aria-hidden="true">#</a></h2><p>The <code>/task</code> command is used to create a dialog that specifies that function call is enabled.</p><h4 id="example-1" tabindex="-1">Example <a class="header-anchor" href="#example-1" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/task Hi, how are you?</span></span>
<span class="line"><span style="color:#A6ACCD;">/task What is the weather like today?</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="tool-command" tabindex="-1">Tool command <a class="header-anchor" href="#tool-command" aria-hidden="true">#</a></h2><p>The <code>/tool</code> command is used to list the available tools.</p><h4 id="example-2" tabindex="-1">Example <a class="header-anchor" href="#example-2" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/tool</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="bind-command" tabindex="-1">Bind command <a class="header-anchor" href="#bind-command" aria-hidden="true">#</a></h2><p>The <code>/bind</code> command is used to bind optional platforms to the assistant.</p><h4 id="example-3" tabindex="-1">Example <a class="header-anchor" href="#example-3" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/bind https://rss.exp.com/atom/1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="unbind-command" tabindex="-1">Unbind command <a class="header-anchor" href="#unbind-command" aria-hidden="true">#</a></h2><p>The <code>/unbind</code> command is used to unbind a bound optional platform from the assistant.</p><h4 id="example-4" tabindex="-1">Example <a class="header-anchor" href="#example-4" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/unbindxxx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="clear-command" tabindex="-1">Clear command <a class="header-anchor" href="#clear-command" aria-hidden="true">#</a></h2><p>The <code>/clear</code> command is used to delete your own records.</p><h4 id="example-5" tabindex="-1">Example <a class="header-anchor" href="#example-5" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/clear</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="rset-endpoint-command" tabindex="-1">Rset_endpoint command <a class="header-anchor" href="#rset-endpoint-command" aria-hidden="true">#</a></h2><p>The <code>/rset_endpoint</code> command is used to customize the backend.</p><h4 id="example-6" tabindex="-1">Example <a class="header-anchor" href="#example-6" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/rset_endpoint http://custom-endpoint.com</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="rset-key-command" tabindex="-1">Rset_key command <a class="header-anchor" href="#rset-key-command" aria-hidden="true">#</a></h2><p>The <code>/rset_key</code> command is used to set the OpenAI key.</p><h4 id="example-7" tabindex="-1">Example <a class="header-anchor" href="#example-7" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/rset_key YOUR-OPENAI-API-KEY</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="clear-rset-command" tabindex="-1">Clear_rset command <a class="header-anchor" href="#clear-rset-command" aria-hidden="true">#</a></h2><p>The <code>/clear_rset</code> command is used to erase custom settings.</p><h4 id="example-8" tabindex="-1">Example <a class="header-anchor" href="#example-8" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/clear_rset</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="auth-command" tabindex="-1">Auth Command <a class="header-anchor" href="#auth-command" aria-hidden="true">#</a></h2><p>The <code>/auth</code> command is used for authentication.</p><h4 id="example-9" tabindex="-1">Example <a class="header-anchor" href="#example-9" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/auth reloader_task_uuid</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,41),d=[t];function o(c,i,r,p,h,m){return n(),e("div",null,d)}const b=a(l,[["render",o]]);export{C as __pageData,b as default};