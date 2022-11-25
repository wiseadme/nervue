import{_ as n,o as s,c as a,a as e}from"./app.8c8573db.js";const t={},o=e(`<h1 id="store" tabindex="-1"><a class="header-anchor" href="#store" aria-hidden="true">#</a> Store</h1><p>Прежде чем приступить к работе с хранилищем, необходимо сначала создать его, с помощью функции <code>defineStore</code>, передав ему в качестве аргумента объект с опциями, который обязательно должен включать в себя уникальное <code>id</code>, с помощью которого унифицируется доступ к данному хранилищу:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>

<span class="token keyword">const</span> useUserStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">&#39;user&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">//...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,3),c=[o];function p(r,i){return s(),a("div",null,c)}const l=n(t,[["render",p],["__file","index.html.vue"]]);export{l as default};